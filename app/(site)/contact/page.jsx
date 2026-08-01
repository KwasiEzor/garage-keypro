import ContactClient from './ContactClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    "Demandez un devis ou un rendez-vous : formulaire, téléphone, WhatsApp. Atelier à Adjidogomé Boukarou, Lomé, et assistance mobile dans tout le Grand Lomé.",
  path: '/contact',
  ogTitle: 'Contact | KEYPRO SERVICE CENTER',
  ogDescription: 'Devis gratuit, réponse rapide — atelier ou intervention mobile à Lomé.',
});

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
