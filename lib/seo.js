// Aide centrale pour les métadonnées de page (SEO + partage social).
//
// Pourquoi ce fichier : Next.js ne fusionne PAS en profondeur les objets
// imbriqués (openGraph, twitter) entre le layout racine et une page enfant —
// dès qu'une page définit son propre `openGraph`, il remplace entièrement
// celui du layout parent. Résultat avant ce fichier : chaque page perdait
// silencieusement `og:type`, `og:site_name` et `og:locale` (définis
// uniquement dans app/layout.jsx), et aucune page n'avait de carte Twitter
// dédiée. Chaque page doit donc reconstruire un objet `openGraph`/`twitter`
// complet et autonome — ce que fait cette fonction.
import { site } from './site';

const SITE_URL = 'https://keyproservicecenter.com';

const DEFAULT_OG_TITLE = `${site.name} — Clés auto, diagnostic & assistance mobile à Lomé`;
const DEFAULT_OG_DESCRIPTION =
  'Clés auto, programmation, diagnostic et assistance mobile à Lomé, Togo. Toutes marques, intervention rapide.';

const DEFAULT_OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: `${site.name} — Agoè-Nyivé, Lomé`,
};

/**
 * Construit un objet `metadata` complet pour une page.
 *
 * @param {string} [title] - Titre de page (passe par le template `%s | KEYPRO SERVICE CENTER` du layout racine). Omis pour la page d'accueil, qui garde le titre par défaut du site.
 * @param {string} [description] - Description SEO (balise meta description).
 * @param {string} path - Chemin canonique de la page, ex. '/services'.
 * @param {string} [ogTitle] - Titre dédié pour Open Graph / Twitter (souvent plus court/percutant que `title`).
 * @param {string} [ogDescription] - Description dédiée pour Open Graph / Twitter.
 * @param {object} [ogImage] - Image de partage personnalisée ({ url, width, height, alt }). Par défaut : /og-image.png.
 * @param {object} [robots] - Override robots (ex. { index: true, follow: true } sur les pages légales).
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  ogImage,
  robots,
} = {}) {
  const finalOgTitle = ogTitle || DEFAULT_OG_TITLE;
  const finalOgDescription = ogDescription || description || DEFAULT_OG_DESCRIPTION;
  const image = ogImage || DEFAULT_OG_IMAGE;

  const metadata = {
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'fr_TG',
      siteName: site.name,
      url: `${SITE_URL}${path}`,
      title: finalOgTitle,
      description: finalOgDescription,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalOgTitle,
      description: finalOgDescription,
      images: [image.url],
    },
  };

  if (title) metadata.title = title;
  if (description) metadata.description = description;
  if (robots) metadata.robots = robots;

  return metadata;
}
