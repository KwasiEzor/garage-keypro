import { describe, expect, it } from 'vitest';
import { dictionaries, locales, defaultLocale } from '@/lib/dictionaries';

/**
 * Compare la FORME de deux valeurs (clés d'objet, longueur des tableaux
 * d'objets), jamais le texte lui-même — ce n'est pas le rôle de ce test de
 * vérifier une traduction, seulement qu'aucune clé n'a été ajoutée d'un
 * côté et oubliée de l'autre. C'est ce genre d'oubli qui, en prod, affiche
 * un texte français au milieu d'une page anglaise.
 *
 * Les tableaux de chaînes (mots-clés du chatbot, badges…) sont exemptés de
 * la vérification de longueur : une liste de synonymes n'a aucune raison
 * de compter le même nombre de mots dans les deux langues.
 */
function comparerForme(fr, en, chemin = 'racine') {
  const erreurs = [];

  if (Array.isArray(fr) || Array.isArray(en)) {
    if (!Array.isArray(fr) || !Array.isArray(en)) {
      erreurs.push(`${chemin} : un seul des deux côtés est un tableau`);
      return erreurs;
    }
    const sontDesObjets =
      fr.every((x) => x && typeof x === 'object') && en.every((x) => x && typeof x === 'object');

    if (sontDesObjets) {
      if (fr.length !== en.length) {
        erreurs.push(`${chemin} : ${fr.length} élément(s) en fr, ${en.length} en en`);
      }
      const n = Math.min(fr.length, en.length);
      for (let i = 0; i < n; i++) {
        erreurs.push(...comparerForme(fr[i], en[i], `${chemin}[${i}]`));
      }
    }
    return erreurs;
  }

  if (fr && typeof fr === 'object') {
    if (!en || typeof en !== 'object') {
      erreurs.push(`${chemin} : absent côté en`);
      return erreurs;
    }
    const clesFr = Object.keys(fr);
    const clesEn = Object.keys(en);

    for (const cle of clesFr) {
      if (!clesEn.includes(cle)) erreurs.push(`${chemin}.${cle} : présent en fr, absent en en`);
    }
    for (const cle of clesEn) {
      if (!clesFr.includes(cle)) erreurs.push(`${chemin}.${cle} : présent en en, absent en fr`);
    }
    for (const cle of clesFr) {
      if (clesEn.includes(cle)) erreurs.push(...comparerForme(fr[cle], en[cle], `${chemin}.${cle}`));
    }
  }

  return erreurs;
}

describe('lib/dictionaries — configuration des langues', () => {
  it('déclare fr et en', () => {
    expect(locales).toEqual(expect.arrayContaining(['fr', 'en']));
  });

  it('a une langue par défaut qui fait partie des langues déclarées', () => {
    expect(locales).toContain(defaultLocale);
  });
});

describe('lib/dictionaries — parité structurelle FR/EN', () => {
  it('fr et en ont exactement les mêmes clés à tous les niveaux', () => {
    const erreurs = comparerForme(dictionaries.fr, dictionaries.en);
    expect(erreurs, `\n${erreurs.join('\n')}`).toEqual([]);
  });

  it('les tableaux structurés (étapes, avantages, témoignages, stats…) ont le même nombre d’éléments', () => {
    expect(dictionaries.en.home.process.length).toBe(dictionaries.fr.home.process.length);
    expect(dictionaries.en.home.why.length).toBe(dictionaries.fr.home.why.length);
    expect(dictionaries.en.home.stats.length).toBe(dictionaries.fr.home.stats.length);
    expect(dictionaries.en.home.testimonials.length).toBe(dictionaries.fr.home.testimonials.length);
    expect(dictionaries.en.chatbot.answers.length).toBe(dictionaries.fr.chatbot.answers.length);
    expect(dictionaries.en.privacy.sections.length).toBe(dictionaries.fr.privacy.sections.length);
    expect(dictionaries.en.legal.sections.length).toBe(dictionaries.fr.legal.sections.length);
  });
});
