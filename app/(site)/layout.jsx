import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Chatbot from '@/components/Chatbot';
import { ScrollProgress } from '@/components/motion';

/** Habillage du site public. Le tableau de bord ne passe pas par ici. */
export default function SiteLayout({ children }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </>
  );
}
