// Content-Security-Policy — délibérément pragmatique plutôt que maximaliste :
// 'unsafe-inline' reste nécessaire sur script-src pour le script d'hydratation
// de Next.js et le JSON-LD injecté en dangerouslySetInnerHTML (app/layout.jsx),
// et sur style-src pour les styles inline générés par Leaflet (marqueurs,
// popups — voir components/LocationMap.jsx). Un CSP à base de nonce serait
// plus strict mais demande de re-câbler ces deux points ; à envisager plus
// tard si besoin d'un score de sécurité plus élevé.
//
// https://vercel.live (+ Pusher websocket) : la barre d'outils Vercel
// (commentaires/feedback sur les déploiements), injectée automatiquement par
// Vercel lui-même — pas quelque chose qu'on charge depuis notre code, mais
// bloquée sans ces autorisations. https://unpkg.com en connect-src : le
// fichier Leaflet chargé en script-src référence sa propre sourcemap
// (leaflet.js.map), que le navigateur va chercher séparément.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://unpkg.com https://vercel.live",
  "style-src 'self' 'unsafe-inline' https://unpkg.com https://vercel.live",
  "img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com https://*.supabase.co https://*.tile.openstreetmap.org https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live https://assets.vercel.com",
  "connect-src 'self' https://*.supabase.co https://unpkg.com https://vercel.live wss://ws-us3.pusher.com",
  "frame-src 'self' https://vercel.live",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), payment=(), usb=(), geolocation=(self)' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      // Images envoyées depuis /admin (bucket Supabase Storage "site-media").
      // Sans cette ligne, next/image refuse d'afficher toute image envoyée
      // par l'admin — erreur "hostname not configured" en production.
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
