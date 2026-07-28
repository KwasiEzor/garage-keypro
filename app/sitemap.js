const BASE_URL = 'https://keyproservicecenter.com';

/**
 * Sitemap XML généré par Next.js (app/sitemap.js → /sitemap.xml).
 * N'inclut que les pages publiques et indexables — le tableau de bord
 * (/admin) est volontairement absent, voir app/robots.js.
 */
export default function sitemap() {
  const routes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/a-propos', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/marques', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/galerie', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/politique-confidentialite', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/mentions-legales', priority: 0.2, changeFrequency: 'yearly' },
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
