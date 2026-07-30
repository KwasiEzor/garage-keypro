import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createClient } from '@supabase/supabase-js';

/**
 * Tests de sécurité — vérifient les politiques RLS du vrai projet Supabase,
 * pas une simulation. Ils tapent sur le réseau et, pour certains, écrivent
 * réellement dans `quote_requests` (nettoyé en fin de suite via la clé de
 * service, si disponible).
 *
 * Ne tourne jamais par défaut : `npm run test:security`, jamais dans
 * `npm test` ni dans la CI par défaut (voir .github/workflows/ci.yml).
 *
 * Recommandé : lancer cette suite contre une branche Supabase de
 * développement plutôt que le projet de production, pour ne jamais risquer
 * de polluer les vraies données. Voir docs/TESTS.md.
 *
 * Chaque scénario est vérifié une première fois « à la main » via
 * l'éditeur SQL (set local role anon; …) avant d'être encodé ici — les
 * commentaires renvoient à ce qui a été constaté en direct.
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const CONFIGURE = Boolean(URL && ANON_KEY);
const MARQUEUR = `__test-rls-${Date.now()}__`;
const TELEPHONE_TEST = `+000${Date.now().toString().slice(-7)}`; // jamais un vrai numéro

describe.skipIf(!CONFIGURE)('RLS — quote_requests (dépôt public)', () => {
  const anon = CONFIGURE ? createClient(URL, ANON_KEY) : null;
  const service = SERVICE_KEY ? createClient(URL, SERVICE_KEY) : null;

  afterAll(async () => {
    if (!service) {
      console.warn(
        '⚠ SUPABASE_SERVICE_ROLE_KEY absent : les lignes de test insérées dans ' +
          `quote_requests (name = "${MARQUEUR}") n'ont pas été nettoyées automatiquement.`
      );
      return;
    }
    await service.from('quote_requests').delete().eq('name', MARQUEUR);
  });

  it('refuse un dépôt sans consentement (vérifié en direct : erreur 42501)', async () => {
    const { error } = await anon.from('quote_requests').insert({
      name: MARQUEUR,
      phone: TELEPHONE_TEST,
      message: 'Test automatisé — sans consentement',
      consent: false,
    });
    expect(error).toBeTruthy();
  });

  it('refuse un dépôt dont la source n’est pas "site" (contourner le formulaire public)', async () => {
    const { error } = await anon.from('quote_requests').insert({
      name: MARQUEUR,
      phone: TELEPHONE_TEST,
      message: 'Test automatisé — mauvaise source',
      consent: true,
      source: 'whatsapp',
    });
    expect(error).toBeTruthy();
  });

  it('refuse un dépôt qui pré-assigne un statut différent de "nouvelle"', async () => {
    const { error } = await anon.from('quote_requests').insert({
      name: MARQUEUR,
      phone: TELEPHONE_TEST,
      message: 'Test automatisé — statut interdit',
      consent: true,
      status: 'acceptee',
    });
    expect(error).toBeTruthy();
  });

  it('accepte un dépôt conforme au formulaire réel', async () => {
    const { error } = await anon.from('quote_requests').insert({
      name: MARQUEUR,
      phone: TELEPHONE_TEST,
      message: 'Test automatisé — dépôt conforme',
      consent: true,
      source: 'site',
      status: 'nouvelle',
    });
    expect(error).toBeNull();
  });

  it('ne peut jamais relire les demandes déposées — même la sienne', async () => {
    const { data } = await anon.from('quote_requests').select('*').eq('name', MARQUEUR);
    // RLS filtre silencieusement : pas d'erreur, juste aucune ligne.
    expect(data).toEqual([]);
  });

  it(
    'limite de débit : la 4ᵉ demande en moins d’une heure depuis le même numéro est refusée',
    async () => {
      const telephoneRafale = `+001${Date.now().toString().slice(-7)}`;
      const insererUne = () =>
        anon.from('quote_requests').insert({
          name: MARQUEUR,
          phone: telephoneRafale,
          message: 'Test automatisé — limite de débit',
          consent: true,
          source: 'site',
        });

      const r1 = await insererUne();
      const r2 = await insererUne();
      const r3 = await insererUne();
      const r4 = await insererUne();

      expect(r1.error, 'la 1ʳᵉ doit passer').toBeNull();
      expect(r2.error, 'la 2ᵉ doit passer').toBeNull();
      expect(r3.error, 'la 3ᵉ doit passer').toBeNull();
      expect(r4.error, 'la 4ᵉ doit être bloquée par limiter_debit_devis()').toBeTruthy();

      if (service) {
        await service.from('quote_requests').delete().eq('phone', telephoneRafale);
      }
    },
    20000
  );
});

describe.skipIf(!CONFIGURE)('RLS — données exploitation (clients, véhicules, interventions)', () => {
  const anon = CONFIGURE ? createClient(URL, ANON_KEY) : null;

  it('ne peut pas lire le fichier client', async () => {
    const { data } = await anon.from('customers').select('*');
    expect(data).toEqual([]);
  });

  it('ne peut pas créer de client', async () => {
    const { error } = await anon.from('customers').insert({ name: 'Test', phone: '000' });
    expect(error).toBeTruthy();
  });

  it('ne peut pas lire les véhicules', async () => {
    const { data } = await anon.from('vehicles').select('*');
    expect(data).toEqual([]);
  });

  it('ne peut pas lire les interventions', async () => {
    const { data } = await anon.from('jobs').select('*');
    expect(data).toEqual([]);
  });

  it('ne peut pas lire les comptes d’administration', async () => {
    const { data } = await anon.from('admin_users').select('*');
    expect(data).toEqual([]);
  });
});

describe.skipIf(!CONFIGURE)('RLS — contenu public du site', () => {
  const anon = CONFIGURE ? createClient(URL, ANON_KEY) : null;

  it('peut lire les services publiés', async () => {
    const { data, error } = await anon.from('services').select('*').eq('published', true);
    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  it('ne peut pas modifier un service', async () => {
    const { data: avant } = await anon.from('services').select('id, title_fr').limit(1);
    if (!avant?.length) return; // base vide : rien à vérifier ici

    await anon.from('services').update({ title_fr: 'PIRATE' }).eq('id', avant[0].id);

    const { data: apres } = await anon
      .from('services')
      .select('title_fr')
      .eq('id', avant[0].id)
      .single();
    expect(apres.title_fr).toBe(avant[0].title_fr);
  });

  it('peut lire les paramètres généraux (coordonnées affichées sur le site)', async () => {
    const { data, error } = await anon.from('settings').select('*').maybeSingle();
    expect(error).toBeNull();
    expect(data).toBeTruthy();
  });
});

describe.skipIf(!CONFIGURE)('RLS — stockage des images (bucket site-media)', () => {
  const anon = CONFIGURE ? createClient(URL, ANON_KEY) : null;

  it('ne peut pas envoyer de fichier', async () => {
    const faux = new Blob(['test'], { type: 'text/plain' });
    const { error } = await anon.storage
      .from('site-media')
      .upload(`${MARQUEUR}.txt`, faux, { upsert: false });
    expect(error).toBeTruthy();
  });
});

if (!CONFIGURE) {
  describe('RLS — suite ignorée', () => {
    it.skip('NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY absents de l’environnement', () => {});
  });
}
