'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import PageHero from '@/components/PageHero';
import { Rise } from '@/components/motion';
import CtaBanner from '@/components/CtaBanner';
import { images } from '@/lib/images';
import { IconArrow, IconClose } from '@/components/Icons';

// Grille éditoriale : certaines vignettes occupent plus de place
const spans = [
  'sm:col-span-2 sm:row-span-2',
  '',
  '',
  '',
  'sm:col-span-2',
  '',
];

export default function GalleryClient() {
  const { t } = useLanguage();
  const g = t.gallery;
  const [active, setActive] = useState(null);
  const photos = images.gallery;

  const close = useCallback(() => setActive(null), []);
  const move = useCallback(
    (dir) => setActive((i) => (i === null ? null : (i + dir + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, move]);

  return (
    <>
      <PageHero
        eyebrow={g.eyebrow}
        title={g.title}
        intro={g.intro}
        crumb={t.nav.gallery}
        image={images.bannerGallery}
      />

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid auto-rows-[13rem] gap-4 sm:grid-cols-3 sm:gap-5 lg:auto-rows-[15rem]">
            {g.captions.map((caption, i) => (
              <Rise
                key={caption}
                delay={(i % 3) * 80}
                className={`${spans[i] || ''} h-full`}
              >
                <button
                  onClick={() => setActive(i)}
                  className="media media-zoom group h-full w-full text-left shadow-soft transition-shadow duration-500 hover:shadow-lift"
                  aria-label={caption}
                >
                  <Image
                    src={photos[i % photos.length].src}
                    alt={caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="tnum absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold text-navy-950 backdrop-blur">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="absolute inset-x-5 bottom-5 translate-y-3 opacity-0 transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="block text-small font-bold text-white">{caption}</span>
                  </span>
                </button>
              </Rise>
            ))}
          </div>

          <p className="mt-12 rounded-2xl border border-dashed border-navy-200 bg-navy-50/60 px-6 py-5 text-center text-micro text-navy-400">
            {g.placeholderNote}
          </p>
        </div>
      </section>

      {/* ——— Lightbox ——— */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/95 p-5 backdrop-blur-md sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={g.captions[active]}
        >
          <button
            onClick={close}
            className="absolute right-5 top-5 rounded-xl bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
            aria-label="Fermer"
          >
            <IconClose className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:left-8"
            aria-label="Précédent"
          >
            <IconArrow className="h-5 w-5 rotate-180" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:right-8"
            aria-label="Suivant"
          >
            <IconArrow className="h-5 w-5" />
          </button>

          <figure
            className="w-full max-w-4xl overflow-hidden rounded-2xl bg-navy-900 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={photos[active % photos.length].src}
                alt={g.captions[active]}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 px-7 py-5">
              <span className="text-small font-semibold text-white">{g.captions[active]}</span>
              <span className="tnum shrink-0 text-micro text-white/40">
                {active + 1} / {g.captions.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}

      <CtaBanner title={t.home.ctaTitle} text={t.home.ctaText} />
    </>
  );
}
