import GalleryClient from './GalleryClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Galerie',
  description:
    "Photos de l'atelier KEYPRO SERVICE CENTER à Agoè-Nyivé, Lomé : interventions, matériel de diagnostic et de programmation de clés.",
  path: '/galerie',
  ogTitle: 'Galerie | KEYPRO SERVICE CENTER',
  ogDescription: "L'atelier et les interventions en images.",
});

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
