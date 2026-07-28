/**
 * Données structurées « fil d'Ariane » (schema.org BreadcrumbList).
 * Composant serveur — aucune interactivité, juste un <script> JSON-LD.
 *
 * `items` : liste ordonnée de { name, path } où `path` est relatif au domaine
 * (ex. '/services'). Le premier élément doit être l'accueil.
 */
export default function BreadcrumbJsonLd({ items, baseUrl = 'https://keyproservicecenter.com' }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
