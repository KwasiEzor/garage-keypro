import LegalContent from '@/components/LegalContent';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { images } from '@/lib/images';

export const metadata = {
  title: 'Politique de confidentialité',
  description:
    "Comment KEYPRO SERVICE CENTER collecte, utilise, conserve et protège les données personnelles transmises via le site et le formulaire de devis.",
  alternates: { canonical: '/politique-confidentialite' },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Politique de confidentialité', path: '/politique-confidentialite' },
        ]}
      />
      <LegalContent
        dictKey="privacy"
        crumb="Politique de confidentialité"
        image={images.bannerAbout}
      />
    </>
  );
}
