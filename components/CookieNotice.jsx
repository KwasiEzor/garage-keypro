'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

const STORAGE_KEY = 'keypro-cookies-ack';

/**
 * Bandeau informatif, non bloquant : le site ne dépose que des cookies
 * fonctionnels (langue, session d'administration) — aucun traceur
 * publicitaire ni de mesure d'audience. Pas de case à cocher nécessaire,
 * juste une information transparente, mémorisée une fois vue.
 */
export default function CookieNotice() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto flex max-w-xl flex-col gap-3 rounded-2xl bg-navy-950 p-5 text-white shadow-lift ring-1 ring-white/10 sm:flex-row sm:items-center sm:gap-4 sm:pl-6"
    >
      <p className="flex-1 text-micro leading-relaxed text-white/70">
        {t.cookies.text}{' '}
        <Link
          href="/politique-confidentialite"
          className="font-semibold text-brand-300 underline underline-offset-2 hover:text-brand-200"
        >
          {t.cookies.linkLabel}
        </Link>
      </p>
      <button onClick={dismiss} className="btn-primary btn-sm shrink-0">
        {t.cookies.accept}
      </button>
    </div>
  );
}
