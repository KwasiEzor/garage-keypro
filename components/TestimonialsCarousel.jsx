'use client';

/**
 * Carrousel de témoignages — glissement tactile natif (scroll-snap, donc
 * momentum et rubber-band gratuits sur mobile), flèches et puces cliquables,
 * défilement automatique qui se met en pause à la moindre interaction
 * (survol, focus clavier, toucher, onglet caché) et s'arrête complètement
 * si l'utilisateur a demandé « moins d'animations ».
 *
 * La carte active est mise en valeur (échelle/opacité) selon sa distance à
 * l'index actif — calculée en tenant compte du bouclage, pas seulement de
 * la position brute — pour un rendu identique en boucle continue.
 *
 * Invariant important : la navigation (goTo) ne fait défiler QUE la piste
 * elle-même via track.scrollTo(), jamais element.scrollIntoView(). Ce
 * dernier peut aussi faire défiler la fenêtre verticalement pour ramener
 * la carte dans le viewport si le carrousel est hors champ — c'était la
 * cause d'un vrai bug (la page entière se remettait à défiler toute seule
 * quand l'automatique tournait pendant que l'utilisateur lisait plus bas).
 * L'automatique se met aussi en pause quand le carrousel sort du viewport.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { IconArrow } from './Icons';
import { Spotlight, useReducedMotion } from './motion';

const AUTOPLAY_MS = 6000;
const RESUME_AFTER_MS = 5000;

const LABELS = {
  fr: {
    region: 'Témoignages clients',
    prev: 'Témoignage précédent',
    next: 'Témoignage suivant',
    goTo: (i) => `Aller au témoignage ${i}`,
    announce: (i, n, name) => `Témoignage ${i} sur ${n}${name ? `, ${name}` : ''}`,
  },
  en: {
    region: 'Customer testimonials',
    prev: 'Previous testimonial',
    next: 'Next testimonial',
    goTo: (i) => `Go to testimonial ${i}`,
    announce: (i, n, name) => `Testimonial ${i} of ${n}${name ? `, ${name}` : ''}`,
  },
};

export default function TestimonialsCarousel({ items, locale = 'fr' }) {
  const n = items?.length ?? 0;
  const L = LABELS[locale] || LABELS.fr;

  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [recently, setRecently] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(true);
  const resumeTimer = useRef(null);

  const paused = hovering || focused || recently || hidden || reduced || !sectionVisible;

  // Signale une caméra manuelle (clic, glissement) : coupe l'automatique
  // un moment pour ne pas se battre avec le geste de l'utilisateur.
  const markInteraction = useCallback(() => {
    setRecently(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setRecently(false), RESUME_AFTER_MS);
  }, []);

  useEffect(() => () => resumeTimer.current && clearTimeout(resumeTimer.current), []);

  // Onglet caché : on ne fait pas tourner un carrousel que personne ne voit.
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // La carte la plus visible dans la piste devient la carte active — fiable
  // quel que soit le moyen qui l'y a amenée (glissement, molette, flèche…).
  useEffect(() => {
    const track = trackRef.current;
    if (!track || n === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const entry of entries) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        }
        if (best && best.intersectionRatio > 0) {
          setActive(Number(best.target.dataset.index));
        }
      },
      { root: track, threshold: [0.25, 0.5, 0.6, 0.75, 0.9, 1] }
    );
    slideRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [n]);

  // Le carrousel lui-même peut être hors champ (l'utilisateur a continué à
  // lire plus bas sur la page) — l'automatique doit alors se taire, voir
  // plus bas pourquoi c'est important.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(([entry]) => setSectionVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(track);
    return () => io.disconnect();
  }, []);

  // Fait défiler UNIQUEMENT la piste elle-même (jamais la page). On calcule
  // la position au lieu d'utiliser slide.scrollIntoView({block:'nearest'}) :
  // ce dernier peut aussi faire défiler la fenêtre verticalement pour
  // ramener la carte dans le viewport — exactement le bug remonté : dès
  // que l'utilisateur avait défilé plus bas sur la page (vers le CTA ou le
  // pied de page), l'automatique tirait la page vers le carrousel toutes
  // les 6 secondes. scrollTo() sur la piste ne touche jamais la fenêtre.
  const goTo = useCallback(
    (index, { instant = false } = {}) => {
      if (n === 0) return;
      const track = trackRef.current;
      const wrapped = ((index % n) + n) % n;
      const slide = slideRefs.current[wrapped];
      if (!track || !slide) return;

      const trackRect = track.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const slideOffsetWithinTrack = slideRect.left - trackRect.left + track.scrollLeft;
      const target = slideOffsetWithinTrack - (track.clientWidth - slide.clientWidth) / 2;

      track.scrollTo({
        left: target,
        behavior: instant || reduced ? 'auto' : 'smooth',
      });
    },
    [n, reduced]
  );

  // Avance/recule d'UNE carte (flèches, clavier, autoplay). Quand ce pas
  // franchit le bout de la piste (dernière carte → première, ou l'inverse),
  // on bascule sur un saut instantané plutôt qu'un smooth-scroll : sinon
  // le navigateur anime un défilement continu sur TOUTE la largeur de la
  // piste, traversant chaque carte intermédiaire d'un coup — c'est ce qui
  // se voyait comme un « bug » au moment où l'automatique bouclait.
  // Un clic direct sur une puce reste un smooth-scroll normal : c'est un
  // saut délibéré vers une carte précise, pas un bouclage.
  const step = useCallback(
    (direction) => {
      const target = active + direction;
      const wrapping = target < 0 || target >= n;
      goTo(target, { instant: wrapping });
    },
    [active, n, goTo]
  );

  // Défilement automatique — une fenêtre de AUTOPLAY_MS par carte active,
  // jamais s'il y a une seule carte, jamais en pause, jamais en mouvement réduit.
  useEffect(() => {
    if (paused || n < 2) return;
    const id = setInterval(() => step(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, n, step]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      markInteraction();
      step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      markInteraction();
      step(-1);
    }
  };

  if (n === 0) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={L.region}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
        }}
        onTouchStart={markInteraction}
        onWheel={markInteraction}
        className="no-scrollbar mask-fade-x flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth rounded-2xl px-4 py-3 outline-none scroll-px-4 sm:gap-6 sm:px-6 sm:scroll-px-6 md:px-8 md:scroll-px-8 focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        {items.map((item, i) => {
          const raw = Math.abs(active - i);
          const distance = Math.min(raw, n - raw);
          const scale = distance === 0 ? 1 : distance === 1 ? 0.92 : 0.86;
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.55 : 0.32;
          const blur = distance >= 2 ? 1 : 0;

          return (
            <div
              key={`${item.name}-${i}`}
              ref={(el) => (slideRefs.current[i] = el)}
              data-index={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1}/${n}`}
              className="w-[clamp(260px,82vw,380px)] shrink-0 snap-center sm:w-[clamp(320px,60vw,420px)] md:w-[clamp(340px,46vw,440px)] lg:w-[clamp(360px,34vw,460px)] xl:w-[clamp(380px,28vw,500px)]"
              style={{
                transform: `scale(${scale})`,
                opacity,
                filter: blur ? `blur(${blur}px)` : 'none',
                transition: reduced
                  ? 'none'
                  : 'transform .6s cubic-bezier(.16,1,.3,1), opacity .6s ease, filter .6s ease',
              }}
            >
              <Spotlight className="h-full rounded-2xl" color="rgba(255,255,255,.07)">
                <figure className="glass relative z-10 flex h-full flex-col rounded-2xl p-8 transition-all duration-500 ease-smooth hover:-translate-y-2 hover:bg-white/[0.08]">
                  <span className="font-heading text-5xl leading-none text-brand/50">“</span>
                  <blockquote className="-mt-3 flex-1 text-small italic leading-relaxed text-white/75">
                    {item.quote}
                  </blockquote>

                  <div className="mt-6 flex gap-0.5 text-brand" aria-label="5/5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} aria-hidden="true">
                        ★
                      </span>
                    ))}
                  </div>

                  <figcaption className="mt-5 flex items-center gap-3.5 border-t border-white/10 pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-heading text-small font-extrabold text-white">
                      {item.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-small font-bold text-white">{item.name}</span>
                      <span className="block text-micro text-brand-300">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Spotlight>
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <>
          <button
            type="button"
            onClick={() => {
              markInteraction();
              step(-1);
            }}
            aria-label={L.prev}
            className="glass absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105 hover:bg-white/15 sm:flex sm:-left-1 lg:left-3"
          >
            <IconArrow className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => {
              markInteraction();
              step(1);
            }}
            aria-label={L.next}
            className="glass absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105 hover:bg-white/15 sm:flex sm:-right-1 lg:right-3"
          >
            <IconArrow className="h-4 w-4" />
          </button>

          <div className="mt-8 flex items-center justify-center gap-2.5">
            {items.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    markInteraction();
                    goTo(i);
                  }}
                  aria-label={L.goTo(i + 1)}
                  aria-current={isActive}
                  className={`relative h-2 overflow-hidden rounded-full transition-all duration-500 ease-smooth ${
                    isActive ? 'w-9 bg-white/20' : 'w-2 bg-white/25 hover:bg-white/45'
                  }`}
                >
                  {isActive && !reduced && (
                    <span
                      key={active}
                      className="absolute inset-y-0 left-0 origin-left rounded-full bg-brand"
                      style={{
                        animation: `carousel-progress ${AUTOPLAY_MS}ms linear forwards`,
                        animationPlayState: paused ? 'paused' : 'running',
                        width: '100%',
                      }}
                    />
                  )}
                  {isActive && reduced && <span className="absolute inset-0 rounded-full bg-brand" />}
                </button>
              );
            })}
          </div>
        </>
      )}

      <p className="sr-only" aria-live="polite">
        {L.announce(active + 1, n, items[active]?.name)}
      </p>
    </div>
  );
}
