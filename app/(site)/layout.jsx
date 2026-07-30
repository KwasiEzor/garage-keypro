import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Chatbot from '@/components/Chatbot';
import CookieNotice from '@/components/CookieNotice';
import { ScrollProgress } from '@/components/motion';
import { site } from '@/lib/site';

/**
 * Habillage du site public. Le tableau de bord ne passe pas par ici.
 *
 * Les deux boutons flottants sont conditionnés à `site.showWhatsapp` /
 * `site.showChatbot`, réglables depuis /admin/parametres. Le tri se fait
 * ici, côté serveur : masqué, le bouton n'est ni rendu ni envoyé au
 * navigateur — pas seulement caché en CSS.
 */
export default function SiteLayout({ children }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {site.showWhatsapp && <WhatsAppButton />}
      {site.showChatbot && <Chatbot />}
      <CookieNotice />
    </>
  );
}
