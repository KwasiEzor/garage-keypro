'use client';

import Image from 'next/image';
import { useLanguage } from '@/components/LanguageProvider';
import PageHero from '@/components/PageHero';
import { Marquee, Rise, SplitText, Spotlight } from '@/components/motion';
import CtaBanner from '@/components/CtaBanner';
import { images, alt as altOf } from '@/lib/images';
import { IconCar, IconCheck, IconGlobe } from '@/components/Icons';

export default function BrandsPage() {
  const { t, locale } = useLanguage();
  const b = t.brands;

  // Bandeau défilant de toutes les marques
  const allBrands = b.groups.flatMap((g) => g.brands);

  return (
    <>
      <PageHero
        eyebrow={b.eyebrow}
        title={b.title}
        intro={b.intro}
        crumb={t.nav.brands}
        image={images.bannerBrands}
      />

      {/* ——— Bandeau défilant ——— */}
      <div className="mask-fade-r border-b border-navy-100 bg-navy-50/70 py-7">
        <Marquee
          items={allBrands}
          speed={52}
          renderItem={(brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="flex items-center gap-4 whitespace-nowrap font-heading text-[clamp(1.25rem,2.2vw,1.75rem)] font-extrabold uppercase tracking-tight text-navy-200"
            >
              {brand}
              <span className="h-1.5 w-1.5 rounded-full bg-brand/50" />
            </span>
          )}
        />
      </div>

      <section className="section bg-white">
        <div className="container-x space-y-8">
          {b.groups.map((group, i) => (
            <Rise key={group.region} delay={i * 70}>
              <Spotlight className="rounded-2xl">
              <div className="relative z-10 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift">
                <div className="flex items-center gap-4 bg-navy-950 px-8 py-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
                    <IconGlobe className="h-5 w-5" />
                  </span>
                  <SplitText text={group.region} as="h2" className="text-h3 font-bold text-white" />
                  <span className="tnum ml-auto rounded-full bg-white/10 px-3.5 py-1.5 text-micro font-bold text-white/70">
                    {group.brands.length}
                  </span>
                </div>

                <div className="grid gap-3 bg-white p-8 sm:grid-cols-2 lg:grid-cols-4">
                  {group.brands.map((brand) => (
                    <div
                      key={brand}
                      className="flex items-center gap-3.5 rounded-xl border border-navy-100 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand/[0.04] hover:shadow-soft"
                    >
                      <IconCar className="h-5 w-5 shrink-0 text-brand" />
                      <span className="text-small font-semibold text-navy-900">{brand}</span>
                    </div>
                  ))}
                </div>
              </div>
              </Spotlight>
            </Rise>
          ))}

          <Rise>
            <div className="grid items-center gap-8 overflow-hidden rounded-2xl bg-navy-50/80 ring-1 ring-navy-100 lg:grid-cols-[1fr,0.8fr]">
              <div className="flex items-start gap-4 p-9">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10">
                  <IconCheck className="h-5 w-5 text-brand" />
                </span>
                <p className="text-lead text-navy-600">{b.note}</p>
              </div>

              <div className="media media-zoom aspect-[16/10] h-full rounded-none">
                <Image
                  src={images.handKey.src}
                  alt={altOf(images.handKey, locale)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Rise>
        </div>
      </section>

      <CtaBanner title={t.home.ctaTitle} text={t.home.ctaText} />
    </>
  );
}
