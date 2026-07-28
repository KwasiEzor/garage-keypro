'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/site';
import { useLanguage } from './LanguageProvider';
import { IconWhatsapp } from './Icons';

export default function WhatsAppButton() {
  const { t, locale } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const message =
    locale === 'fr'
      ? `Bonjour KEYPRO Service Center, j'aimerais des informations sur vos services.`
      : `Hello KEYPRO Service Center, I would like information about your services.`;

  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.whatsapp}
      className={`group fixed bottom-6 left-6 z-40 flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-white shadow-[0_18px_40px_-14px_rgba(37,211,102,.75)] transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-[#1eb257] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <span className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/40" />
        <IconWhatsapp className="relative h-7 w-7" />
      </span>
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-small font-semibold transition-all duration-500 ease-smooth group-hover:max-w-[220px] sm:inline">
        {t.common.whatsapp}
      </span>
    </a>
  );
}
