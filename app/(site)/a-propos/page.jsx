import AboutClient from './AboutClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: 'À propos',
  description:
    "KEYPRO SERVICE CENTER : centre technique spécialisé en clés automobiles et électronique embarquée à Agoè-Nyivé, Lomé. Notre méthode, nos valeurs et notre zone d'intervention dans le Grand Lomé.",
  alternates: { canonical: '/a-propos' },
  openGraph: {
    title: 'À propos | KEYPRO SERVICE CENTER',
    description:
      "Expertise technique, rapidité et transparence — le centre technique clés auto et électronique de Lomé.",
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

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
