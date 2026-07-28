import BrandsClient from './BrandsClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: 'Marques',
  description:
    'Spécialiste toutes marques à Lomé : véhicules japonais, européens, américains et chinois. Clés, télécommandes, programmation et diagnostic compatibles avec la majorité des véhicules modernes.',
  alternates: { canonical: '/marques' },
  openGraph: {
    title: 'Toutes marques | KEYPRO SERVICE CENTER',
    description: 'Japonaises, chinoises, américaines, européennes — un seul spécialiste à Lomé.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

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
