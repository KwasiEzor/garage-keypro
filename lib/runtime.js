import { dictionaries } from './dictionaries';
import { site } from './site';
import { images } from './images';

/**
 * Applique le contenu chargé depuis la base aux objets partagés.
 *
 * Pourquoi muter plutôt que passer par des props : `site`, `images` et
 * `dictionaries` sont importés directement par une vingtaine de composants.
 * En remplaçant leur contenu en place, tous les consommateurs voient la
 * nouvelle valeur sans qu'il faille câbler des props partout.
 *
 * Le contenu est identique pour tous les visiteurs — il n'y a donc pas de
 * risque de fuite entre deux requêtes simultanées. Ne mettez jamais de
 * donnée propre à un utilisateur dans ces objets.
 */
export function applyContent(content) {
  if (!content) return;

  if (content.dictionaries) {
    for (const locale of Object.keys(content.dictionaries)) {
      dictionaries[locale] = content.dictionaries[locale];
    }
  }

  if (content.site) {
    for (const k of Object.keys(site)) delete site[k];
    Object.assign(site, content.site);
  }

  if (content.images) {
    for (const k of Object.keys(images)) delete images[k];
    Object.assign(images, content.images);
  }
}
