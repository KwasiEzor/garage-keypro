import BrandsClient from './BrandsClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Marques',
  description:
    'Spécialiste toutes marques à Lomé : véhicules japonais, européens, américains et chinois. Clés, télécommandes, programmation et diagnostic compatibles avec la majorité des véhicules modernes.',
  path: '/marques',
  ogTitle: 'Toutes marques | KEYPRO SERVICE CENTER',
  ogDescription: 'Japonaises, chinoises, américaines, européennes — un seul spécialiste à Lomé.',
});

export default function BrandsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Marques', path: '/marques' },
        ]}
      />
      <BrandsClient />
    </>
  );
}
