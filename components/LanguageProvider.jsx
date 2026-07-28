'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { dictionaries, defaultLocale, locales } from '@/lib/dictionaries';
import { applyContent } from '@/lib/runtime';

const LanguageContext = createContext({
  locale: defaultLocale,
  setLocale: () => {},
  t: dictionaries[defaultLocale],
});

const STORAGE_KEY = 'keypro-locale';

export function LanguageProvider({ children, content }) {
  // Le contenu venant de la base remplace celui des fichiers, avant
  // le premier rendu — sinon on afficherait brièvement l'ancien texte.
  if (content) applyContent(content);

  const [locale, setLocaleState] = useState(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && locales.includes(stored)) {
      setLocaleState(stored);
      return;
    }
    const browser = navigator.language?.slice(0, 2);
    if (browser && locales.includes(browser)) setLocaleState(browser);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next) => {
    if (!locales.includes(next)) return;
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
