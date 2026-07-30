import { describe, expect, it } from 'vitest';
import { fcfa, dateFr, dateTimeFr } from '@/lib/admin/format';

describe('lib/admin/format — fcfa', () => {
  it('affiche un tiret pour null ou undefined', () => {
    expect(fcfa(null)).toBe('—');
    expect(fcfa(undefined)).toBe('—');
  });

  it('affiche 0 FCFA pour zéro (ne le confond pas avec une valeur absente)', () => {
    expect(fcfa(0)).toBe('0 FCFA');
  });

  it('formate un montant avec séparateur de milliers', () => {
    expect(fcfa(15000)).toMatch(/15.000 FCFA|15 000 FCFA/);
  });

  it('accepte une chaîne numérique', () => {
    expect(fcfa('25000')).toContain('FCFA');
  });
});

describe('lib/admin/format — dateFr', () => {
  it('affiche un tiret pour une date absente', () => {
    expect(dateFr(null)).toBe('—');
    expect(dateFr(undefined)).toBe('—');
    expect(dateFr('')).toBe('—');
  });

  it('formate une date ISO en jour/mois abrégé/année', () => {
    const resultat = dateFr('2026-01-15');
    expect(resultat).toContain('2026');
    expect(resultat).toMatch(/janv/i);
  });
});

describe('lib/admin/format — dateTimeFr', () => {
  it('affiche un tiret pour une date absente', () => {
    expect(dateTimeFr(null)).toBe('—');
  });

  it('affiche l’heure dans le fuseau de l’atelier (Africa/Lome), pas celui du serveur', () => {
    // Lomé est en UTC+0 toute l'année (pas d'heure d'été) : 14h30 UTC doit
    // rester 14h30 quel que soit le fuseau de la machine qui exécute le test.
    const resultat = dateTimeFr('2026-03-10T14:30:00Z');
    expect(resultat).toContain('14:30');
  });
});
