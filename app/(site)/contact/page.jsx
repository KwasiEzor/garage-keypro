import ContactClient from './ContactClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: 'Contact',
  description:
    "Demandez un devis ou un rendez-vous : formulaire, téléphone, WhatsApp. Atelier à Agoè-Nyivé, Lomé, et assistance mobile dans tout le Grand Lomé.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | KEYPRO SERVICE CENTER',
    description: 'Devis gratuit, réponse rapide — atelier ou intervention mobile à Lomé.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />
      <ContactClient />
    </>
  );
}
