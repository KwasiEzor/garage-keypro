import GalleryClient from './GalleryClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: 'Galerie',
  description:
    "Photos de l'atelier KEYPRO SERVICE CENTER à Agoè-Nyivé, Lomé : interventions, matériel de diagnostic et de programmation de clés.",
  alternates: { canonical: '/galerie' },
  openGraph: {
    title: 'Galerie | KEYPRO SERVICE CENTER',
    description: "L'atelier et les interventions en images.",
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Galerie', path: '/galerie' },
        ]}
      />
      <GalleryClient />
    </>
  );
}
