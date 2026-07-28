import './globals.css';
import { Inter, Sora, Anton, Great_Vibes } from 'next/font/google';
import { LanguageProvider } from '@/components/LanguageProvider';
import { site } from '@/lib/site';
import { loadContent } from '@/lib/content';
import { applyContent } from '@/lib/runtime';

// Corps de texte — très lisible, chiffres nets
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Titres — géométrique, contemporain, un peu plus « premium » qu'Inter
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['600', '700', '800'],
});

// Titre héros — reprend l'esprit du flyer KSC
const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

// Ligne manuscrite du héros
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://keyproservicecenter.com'),
  title: {
    default: `${site.name} — Clés auto, diagnostic & assistance mobile`,
    template: `%s | ${site.name}`,
  },
  description:
    "Centre technique à Agoè-Nyivé, Lomé (Togo), spécialisé en clés automobiles, programmation, diagnostic électronique et assistance mobile. Toutes marques : japonaises, européennes, américaines, chinoises.",
  keywords: [
    'clé auto Lomé',
    'programmation clé voiture Togo',
    'smart key Lomé',
    'diagnostic automobile Lomé',
    'télécommande voiture Togo',
    'assistance automobile mobile Lomé',
    'serrurier auto Togo',
    'garage Agoè-Nyivé',
    'KEYPRO Service Center',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_TG',
    title: `${site.name} — Clés auto, diagnostic & assistance mobile à Lomé`,
    description:
      'Clés auto, programmation, diagnostic et assistance mobile à Lomé, Togo. Toutes marques, intervention rapide.',
    siteName: site.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${site.name} — Agoè-Nyivé, Lomé`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Lomé, Togo`,
    description: 'Clés auto, programmation, diagnostic et assistance mobile à Lomé.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#0b1024',
};

export default async function RootLayout({ children }) {
  // Contenu piloté depuis le tableau de bord ; repli sur les fichiers.
  const content = await loadContent();
  applyContent(content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: site.name,
    logo: '/icon-512.png',
    image: '/og-image.png',
    email: site.email,
    telephone: site.phones.map((p) => `${site.countryCode}${p.replace(/\s/g, '')}`),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: 'TG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '08:00',
        closes: '19:00',
      },
    ],
    areaServed: site.coverage.map((zone) => ({
      '@type': 'Place',
      name: `${zone}, Lomé`,
    })),
    currenciesAccepted: site.currency,
    priceRange: '$$',
    description:
      "Centre technique à Lomé (Togo) spécialisé en clés automobiles, électronique embarquée et assistance mobile.",
  };

  return (
    <html
      lang="fr"
      className={`${inter.variable} ${sora.variable} ${anton.variable} ${greatVibes.variable}`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider content={content}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
