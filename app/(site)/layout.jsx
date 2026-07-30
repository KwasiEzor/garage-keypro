import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieNotice from '@/components/CookieNotice';
import ScrollToTop from '@/components/ScrollToTop';
import { ScrollProgress } from '@/components/motion';
import { site } from '@/lib/site';

// Masqué par défaut (site.showChatbot) et jamais nécessaire au premier
// rendu : chargé à la demande plutôt qu'inclus dans le bundle initial de
// chaque page publique.
const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });

/**
 * Habillage du site public. Le tableau de bord ne passe pas par ici.
 *
 * Les deux boutons flottants sont conditionnés à `site.showWhatsapp` /
 * `site.showChatbot`, réglables depuis /admin/parametres. Le tri se fait
 * ici, côté serveur : masqué, le bouton n'est ni rendu ni envoyé au
 * navigateur — pas seulement caché en CSS.
 *
 * ScrollToTop est à droite (comme le chatbot, généralement masqué par
 * défaut donc ce coin est libre) et s'empile au-dessus du chatbot quand
 * celui-ci est affiché, pour ne jamais se chevaucher.
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
      <ScrollToTop stacked={site.showChatbot} />
      <CookieNotice />
    </>
  );
}
