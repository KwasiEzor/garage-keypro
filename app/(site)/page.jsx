import HomeClient from './HomeClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Accueil', path: '/' }]} />
      <HomeClient />
    </>
  );
}
