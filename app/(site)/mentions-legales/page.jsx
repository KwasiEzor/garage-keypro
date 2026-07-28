import LegalContent from '@/components/LegalContent';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { images } from '@/lib/images';

export const metadata = {
  title: 'Mentions légales',
  description:
    'Éditeur du site, hébergement, propriété intellectuelle et crédits du site KEYPRO SERVICE CENTER.',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: true, follow: true },
};

export default function LegalNoticePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Mentions légales', path: '/mentions-legales' },
        ]}
      />
      <LegalContent dictKey="legal" crumb="Mentions légales" image={images.bannerAbout} />
    </>
  );
}
