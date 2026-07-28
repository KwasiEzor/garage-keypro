'use client';

/**
 * Petite bibliothèque d'animations au défilement, sans dépendance externe.
 * Tout repose sur IntersectionObserver et requestAnimationFrame, et tout
 * se désactive automatiquement si l'utilisateur a demandé « moins d'animations ».
 */

import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/* ────────────────────────────────────────────
   Préférence d'accessibilité
   ──────────────────────────────────────────── */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

/* ────────────────────────────────────────────
   Media query réactive (rendu SSR neutre)
   ──────────────────────────────────────────── */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

/* ────────────────────────────────────────────
   Apparition à l'entrée dans le viewport
   ──────────────────────────────────────────── */
export function useInView({ threshold = 0.15, once = true, margin = '0px 0px -12% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, margin]);

  return [ref, inView];
}

/* ────────────────────────────────────────────
   Barre de progression de lecture
   ──────────────────────────────────────────── */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-brand via-brand-500 to-brand-300"
        style={{ transform: `scaleX(${progress})`, transition: 'transform .1s linear' }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────
   Progression d'un élément dans le viewport (0 → 1)
   Sert au parallaxe et aux sections épinglées.
   ──────────────────────────────────────────── */
export function useScrollProgress(ref, { start = 1, end = 0 } = {}) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * start;
      const to = -rect.height + vh * end;
      const span = from - to || 1;
      setP(Math.max(0, Math.min(1, (from - rect.top) / span)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, start, end]);

  return p;
}

/* ────────────────────────────────────────────
   <Parallax> — déplace son contenu au défilement
   ──────────────────────────────────────────── */
export function Parallax({ children, speed = 0.18, className = '', scale = false }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const p = useScrollProgress(ref, { start: 1.1, end: -0.1 });

  const offset = reduced ? 0 : (p - 0.5) * speed * 220;
  const zoom = reduced || !scale ? 1 : 1 + (1 - Math.abs(p - 0.5) * 2) * 0.06;

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      <div
        style={{
          transform: `translate3d(0, ${offset.toFixed(2)}px, 0) scale(${zoom.toFixed(3)})`,
        }}
        className="h-full w-full"
      >
        {children}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   <Rise> — apparition douce (remplace Reveal)
   ──────────────────────────────────────────── */
export function Rise({
  children,
  delay = 0,
  y = 28,
  blur = true,
  className = '',
  as = 'div',
}) {
  const [ref, inView] = useInView();
  const reduced = useReducedMotion();
  const on = inView || reduced;

  return createElement(
    as,
    {
      ref,
      className,
      style: {
        opacity: on ? 1 : 0,
        transform: on ? 'none' : `translate3d(0, ${y}px, 0)`,
        filter: on || !blur ? 'none' : 'blur(6px)',
        transition: reduced
          ? 'none'
          : `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .9s cubic-bezier(.16,1,.3,1) ${delay}ms, filter .9s ease ${delay}ms`,
        willChange: 'opacity, transform',
      },
    },
    children
  );
}

/* ────────────────────────────────────────────
   <SplitText> — révèle un titre mot par mot
   ──────────────────────────────────────────── */
export function SplitText({ text, className = '', delay = 0, stagger = 55, as = 'h2' }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const reduced = useReducedMotion();
  const words = useMemo(() => String(text).split(' '), [text]);
  const on = inView || reduced;

  return createElement(
    as,
    { ref, className },
    words.map((word, i) => (
      <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
        <span
          className="inline-block"
          style={{
            opacity: on ? 1 : 0,
            transform: on ? 'none' : 'translate3d(0, 105%, 0)',
            transition: reduced
              ? 'none'
              : `opacity .8s cubic-bezier(.16,1,.3,1) ${delay + i * stagger}ms, transform .9s cubic-bezier(.16,1,.3,1) ${delay + i * stagger}ms`,
          }}
        >
          {word}
        </span>
        {i < words.length - 1 && <span>&nbsp;</span>}
      </span>
    ))
  );
}

/* ────────────────────────────────────────────
   <Counter> — compteur animé à l'apparition
   Accepte « 2 000+ », « 30 min », « 24/7 »…
   ──────────────────────────────────────────── */
export function Counter({ value, className = '', duration = 1600 }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(null);

  const parsed = useMemo(() => {
    const m = String(value).match(/^(\D*)([\d\s.,]+)(.*)$/s);
    if (!m) return null;
    const raw = m[2].replace(/[\s,]/g, '');
    const target = parseFloat(raw);
    if (Number.isNaN(target)) return null;
    return { prefix: m[1], target, suffix: m[3], grouped: /[\s,]/.test(m[2]) };
  }, [value]);

  useEffect(() => {
    if (!inView || !parsed || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(parsed.target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, reduced, duration]);

  if (!parsed) return <span className={className}>{value}</span>;

  const n = display === null ? (inView && !reduced ? 0 : parsed.target) : display;
  const shown = parsed.grouped ? n.toLocaleString('fr-FR').replace(/ /g, ' ') : n;

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {shown}
      {parsed.suffix}
    </span>
  );
}

/* ────────────────────────────────────────────
   <Spotlight> — halo lumineux qui suit le curseur
   ──────────────────────────────────────────── */
export function Spotlight({ children, className = '', color = 'rgba(228,3,46,.16)' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el || reduced) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    },
    [reduced]
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group/spot relative ${className}`}
      style={{ '--mx': '50%', '--my': '50%' }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--mx) var(--my), ${color}, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────
   <Magnetic> — le bouton suit légèrement le curseur
   ──────────────────────────────────────────── */
export function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const onMove = (e) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`transition-transform duration-500 ease-smooth ${className}`}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────
   <Marquee> — bandeau défilant en continu
   ──────────────────────────────────────────── */
export function Marquee({ items, className = '', speed = 40, renderItem }) {
  const doubled = useMemo(() => [...items, ...items], [items]);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex w-max gap-12"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) =>
          renderItem ? (
            renderItem(item, i)
          ) : (
            <span key={i} className="whitespace-nowrap">
              {item}
            </span>
          )
        )}
      </div>
    </div>
  );
}
