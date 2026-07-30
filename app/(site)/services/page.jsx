import ServicesClient from './ServicesClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Services',
  description:
    'Reproduction et programmation de clés, clés intelligentes, télécommandes, diagnostic électronique, codage véhicule et assistance mobile. Toutes marques, à Lomé, Togo.',
  path: '/services',
  ogTitle: 'Nos services | KEYPRO SERVICE CENTER',
  ogDescription:
    'Clés auto, programmation, diagnostic électronique et assistance mobile à Lomé, Togo.',
});

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
