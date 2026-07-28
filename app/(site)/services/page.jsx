import ServicesClient from './ServicesClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: 'Services',
  description:
    'Reproduction et programmation de clés, clés intelligentes, télécommandes, diagnostic électronique, codage véhicule et assistance mobile. Toutes marques, à Lomé, Togo.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Nos services | KEYPRO SERVICE CENTER',
    description:
      'Clés auto, programmation, diagnostic électronique et assistance mobile à Lomé, Togo.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />
      <ServicesClient />
    </>
  );
}
