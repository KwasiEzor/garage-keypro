/**
 * Logo KEYPRO SERVICE CENTER.
 *
 * Remplace l'ancien monogramme vectorisé (dessiné en SVG depuis lib/logo.js)
 * par le visuel fourni par le client (public/logo.png) : un engrenage marine,
 * une silhouette de voiture et le sigle « KSC » en rouge/marine.
 *
 * L'image source est fixe (une seule composition, un seul jeu de couleurs) :
 *   - `variant` n'a donc plus d'effet sur le DESSIN — seulement sur la mise
 *     en forme. 'icon'/'symbol' l'affichent dans un badge carré blanc (utile
 *     sur fond sombre ou dans un espace contraint, ex. le chatbot) ; les
 *     autres variantes l'affichent tel quel, mis à l'échelle par `className`.
 *   - `theme` recolore l'image via un filtre CSS plutôt que de choisir un
 *     fichier différent : 'color' garde les couleurs d'origine (fond clair),
 *     'light'/'mono-white' la transforment en silhouette blanche (fond
 *     sombre — pied de page, écran de connexion), 'mono-dark' en silhouette
 *     marine/noire (fond clair, usage monochrome).
 *
 * lib/logo.js reste utilisé ailleurs (le repère sur la carte, dans
 * LocationMap.jsx) — on n'y touche pas ici.
 */

const FILTERS = {
  color: 'none',
  light: 'brightness(0) invert(1)',
  'mono-white': 'brightness(0) invert(1)',
  'mono-dark': 'brightness(0)',
};

export default function Logo({
  variant = 'horizontal',
  theme = 'color',
  className = 'h-11 w-auto',
  title = 'KEYPRO Service Center',
  decorative = false,
  ...rest
}) {
  const filter = FILTERS[theme] || FILTERS.color;

  const imgProps = {
    src: '/logo.png',
    alt: decorative ? '' : title,
    ...(decorative ? { 'aria-hidden': 'true' } : {}),
    style: filter !== 'none' ? { filter } : undefined,
  };

  /* ——— Icône / symbole : badge carré blanc, image contenue à l'intérieur ——— */
  if (variant === 'icon' || variant === 'symbol') {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center bg-white p-[14%] ${className}`}
        {...rest}
      >
        <img {...imgProps} className="h-full w-full object-contain" />
      </span>
    );
  }

  /* ——— Horizontal / empilé (par défaut) : l'image telle quelle ——— */
  return <img {...imgProps} className={className} {...rest} />;
}
