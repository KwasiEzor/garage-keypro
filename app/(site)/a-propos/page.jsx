import AboutClient from './AboutClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'À propos',
  description:
    "KEYPRO SERVICE CENTER : centre technique spécialisé en clés automobiles et électronique embarquée à Adjidogomé Boukarou, Lomé. Notre méthode, nos valeurs et notre zone d'intervention dans le Grand Lomé.",
  path: '/a-propos',
  ogTitle: 'À propos | KEYPRO SERVICE CENTER',
  ogDescription:
    "Expertise technique, rapidité et transparence — le centre technique clés auto et électronique de Lomé.",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'À propos', path: '/a-propos' },
        ]}
      />
      <AboutClient />
    </>
  );
}
