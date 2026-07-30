import { describe, expect, it } from 'vitest';
import { site, intlPhone, displayPhone, displayPhones, telHref, mapsHref, directionsHref } from '@/lib/site';

describe('lib/site — formatage des numéros', () => {
  it('intlPhone retire les espaces et préfixe l’indicatif', () => {
    expect(intlPhone('72 11 44 44')).toBe('+22872114444');
  });

  it('displayPhone garde les espaces, ajoute juste l’indicatif', () => {
    expect(displayPhone('72 11 44 44')).toBe('+228 72 11 44 44');
  });

  it('displayPhones joint tous les numéros avec l’indicatif en préfixe unique', () => {
    const resultat = displayPhones();
    expect(resultat.startsWith('+228 ')).toBe(true);
    // Autant de numéros affichés que dans site.phones
    const nb = resultat.split('/').length;
    expect(nb).toBe(site.phones.length);
  });

  it('displayPhones accepte un séparateur personnalisé', () => {
    expect(displayPhones(' · ')).toContain(' · ');
  });

  it('telHref produit un lien tel: exploitable', () => {
    expect(telHref('72 11 44 44')).toBe('tel:+22872114444');
  });
});

describe('lib/site — liens de carte', () => {
  it('mapsHref pointe vers les coordonnées configurées', () => {
    expect(mapsHref).toContain(String(site.geo.lat));
    expect(mapsHref).toContain(String(site.geo.lng));
  });

  it('directionsHref sans origine cible seulement la destination', () => {
    const href = directionsHref();
    expect(href).toContain('destination=');
    expect(href).not.toContain('origin=');
  });

  it('directionsHref avec une origine inclut les deux points', () => {
    const href = directionsHref({ lat: 6.1, lng: 1.2 });
    expect(href).toContain('origin=6.1,1.2');
    expect(href).toContain(`destination=${site.geo.lat},${site.geo.lng}`);
  });
});

describe('lib/site — configuration de base', () => {
  it('a un numéro WhatsApp au format international sans "+"', () => {
    expect(site.whatsapp).toMatch(/^\d+$/);
  });

  it('a au moins un numéro de téléphone', () => {
    expect(site.phones.length).toBeGreaterThan(0);
  });

  it('a des horaires définis pour fr et en', () => {
    expect(site.hours.fr.length).toBeGreaterThan(0);
    expect(site.hours.en.length).toBe(site.hours.fr.length);
  });

  it('a une langue par défaut valide', () => {
    expect(['fr', 'en']).toContain(site.defaultLocale);
  });
});
