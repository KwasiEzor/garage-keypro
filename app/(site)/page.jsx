import HomeClient from './HomeClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Accueil', path: '/' }]} />
      <HomeClient />
    </>
  );
}
