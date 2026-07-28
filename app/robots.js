const BASE_URL = 'https://keyproservicecenter.com';

/**
 * robots.txt généré par Next.js (app/robots.js → /robots.txt).
 * Le tableau de bord et l'API du chatbot sont exclus de l'indexation :
 * même sans ce fichier, /admin exige une connexion et ne doit jamais
 * apparaître dans les résultats de recherche.
 */
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
