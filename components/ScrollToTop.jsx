'use client';

/**
 * Bouton « retour en haut » — apparaît une fois qu'on a vraiment défilé
 * (pas dès les premiers pixels), avec un anneau de progression qui montre
 * où on en est dans la page, façon jauge plutôt que simple flèche. Repos
 * en douceur : useReducedMotion coupe l'animation et le smooth-scroll.
 *
 * Toujours à gauche (jamais sous WhatsApp/Chatbot, à droite) ; empilé
 * au-dessus du bouton WhatsApp quand celui-ci est affiché (prop `stacked`),
 * sinon posé à sa place habituelle.
 */

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { useReducedMotion } from './motion';
import { IconArrow } from './Icons';

const THRESHOLD = 560; // px de défilement avant apparition
const SIZE = 48;
const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const LABEL = { fr: 'Remonter en haut de la page', en: 'Back to top' };

export default function ScrollToTop({ stacked = false }) {
  const { locale } = useLanguage();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const update = () => {
      raf.current = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setVisible(y > THRESHOLD);
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    };
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
      aria-label={LABEL[locale] || LABEL.fr}
      tabIndex={visible ? 0 : -1}
      className={`fixed left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-900 shadow-lift ring-1 ring-navy-100 transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:text-brand ${
        stacked ? 'bottom-24' : 'bottom-6'
      } ${
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth="2.5"
          className="stroke-navy-100"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="stroke-brand"
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: CIRCUMFERENCE * (1 - progress),
            transition: reduced ? 'none' : 'stroke-dashoffset 120ms linear',
          }}
        />
      </svg>
      <IconArrow className="h-4 w-4 -rotate-90" />
    </button>
  );
}
