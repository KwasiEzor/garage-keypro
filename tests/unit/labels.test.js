import { describe, expect, it } from 'vitest';
import { QUOTE_STATUS, JOB_STATUS, KEY_TYPES, QUOTE_SOURCES } from '@/lib/admin/labels';

// Ces jeux de valeurs doivent rester synchronisés avec les contraintes
// CHECK de supabase/schema.sql. TypeScript garantit déjà, à la compilation,
// qu'aucune valeur de l'union n'est oubliée ici — ce test protège contre
// une régression si le type venait un jour à être affaibli (ex. un
// `Partial<Record<...>>` ajouté pour faire taire une erreur au lieu de la
// corriger), et vérifie la forme des valeurs (tone, chaînes non vides).
const TONES_VALIDES = ['neutre', 'info', 'attente', 'succes', 'danger'];

describe('lib/admin/labels — QUOTE_STATUS', () => {
  const attendus = ['nouvelle', 'en_cours', 'devis_envoye', 'acceptee', 'refusee', 'close'];

  it('couvre exactement les statuts autorisés en base', () => {
    expect(Object.keys(QUOTE_STATUS).sort()).toEqual(attendus.sort());
  });

  it('chaque statut a un libellé non vide et une tonalité valide', () => {
    for (const [statut, { label, tone }] of Object.entries(QUOTE_STATUS)) {
      expect(label, `label manquant pour ${statut}`).toBeTruthy();
      expect(TONES_VALIDES, `tonalité invalide pour ${statut}`).toContain(tone);
    }
  });
});

describe('lib/admin/labels — JOB_STATUS', () => {
  const attendus = ['planifiee', 'en_cours', 'terminee', 'facturee', 'annulee'];

  it('couvre exactement les statuts autorisés en base', () => {
    expect(Object.keys(JOB_STATUS).sort()).toEqual(attendus.sort());
  });

  it('chaque statut a un libellé non vide et une tonalité valide', () => {
    for (const [statut, { label, tone }] of Object.entries(JOB_STATUS)) {
      expect(label, `label manquant pour ${statut}`).toBeTruthy();
      expect(TONES_VALIDES, `tonalité invalide pour ${statut}`).toContain(tone);
    }
  });
});

describe('lib/admin/labels — KEY_TYPES', () => {
  it('couvre exactement les types de clé autorisés en base', () => {
    const attendus = ['mecanique', 'transpondeur', 'smart_key', 'telecommande', 'inconnu'];
    expect(Object.keys(KEY_TYPES).sort()).toEqual(attendus.sort());
  });
});

describe('lib/admin/labels — QUOTE_SOURCES', () => {
  it('couvre exactement les sources autorisées en base', () => {
    const attendus = ['site', 'whatsapp', 'telephone', 'visite'];
    expect(Object.keys(QUOTE_SOURCES).sort()).toEqual(attendus.sort());
  });
});
