'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import { Magnetic, Marquee, Parallax, Rise, SplitText } from '@/components/motion';
import { images, alt as altOf } from '@/lib/images';
import { site } from '@/lib/site';
import { IconArrow, IconCheck, IconPin, IconTools, serviceIcons } from '@/components/Icons';

export default function ServicesClient() {
  const { t, locale } = useLanguage();
  const s = t.services;

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.title}
        intro={s.intro}
        crumb={t.nav.services}
        image={images.bannerServices}
      />

      {/* ——— Sommaire rapide ——— */}
      <div className="sticky top-[68px] z-30 border-b border-navy-100 bg-white/85 backdrop-blur-xl">
        <div className="container-x flex gap-2 overflow-x-auto py-3.5 no-scrollbar">
          {s.items.map((item) => {
            const Icon = serviceIcons[item.icon] || IconTools;
            return (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                className="flex shrink-0 items-center gap-2 rounded-full border border-navy-200 px-4 py-2 text-micro font-semibold text-navy-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {item.title.split('—')[0].split('(')[0].trim()}
              </a>
            );
          })}
        </div>
      </div>

      <section className="section bg-white">
        <div className="container-x space-y-[clamp(4rem,8vw,7rem)]">
          {s.items.map((service, i) => {
            const Icon = serviceIcons[service.icon] || IconTools;
            const img = images.services[service.slug];
            const reversed = i % 2 === 1;

            return (
              <article
                key={service.slug}
                id={service.slug}
                className="grid scroll-mt-40 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Visuel */}
                <Rise className={`relative ${reversed ? 'lg:order-2' : ''}`}>
                  <Parallax speed={reversed ? -0.12 : 0.12}>
                    <div className="media media-zoom aspect-[5/4] shadow-lift">
                      <Image
                        src={img.src}
                        alt={altOf(img, locale)}
                        fill
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/45 via-transparent to-transparent" />
                    </div>
                  </Parallax>

                  <span
                    className={`tnum pointer-events-none absolute -top-6 font-display text-[clamp(4rem,8vw,6.5rem)] leading-none text-navy-100 ${
                      reversed ? '-right-2' : '-left-2'
                    }`}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </Rise>

                {/* Texte */}
                <div className={reversed ? 'lg:order-1' : ''}>
                  <Rise>
                    <span className="flex h-15 w-15 items-center justify-center rounded-2xl bg-navy-950 text-brand shadow-lift transition-transform duration-500 hover:rotate-6">
                      <Icon className="h-7 w-7" />
                    </span>
                  </Rise>

                  <SplitText text={service.title} as="h2" className="mt-6 text-h2" delay={80} />

                  <Rise delay={200}>
                    <p className="mt-4 text-lead text-navy-500">{service.short}</p>
                  </Rise>

                  <ul className="mt-8 grid gap-3.5 border-t border-navy-100 pt-8 sm:grid-cols-2">
                    {service.details.map((detail, d) => (
                      <Rise
                        key={detail}
                        as="li"
                        delay={260 + d * 70}
                        className="flex items-start gap-3"
                      >
                        <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                        <span className="text-small text-navy-600">{detail}</span>
                      </Rise>
                    ))}
                  </ul>

                  <Rise delay={520}>
                    <Magnetic className="mt-9 inline-block">
                      <Link href="/contact" className="btn-primary">
                        {t.common.getQuote}
                        <IconArrow className="h-4 w-4" />
                      </Link>
                    </Magnetic>
                  </Rise>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ——— Zones desservies ——— */}
      <section className="border-y border-navy-100 bg-navy-50/70 py-[clamp(3rem,5vw,4.5rem)]">
        <div className="container-x">
          <Rise className="flex flex-wrap items-center justify-center gap-3 text-center">
            <IconPin className="h-5 w-5 text-brand" />
            <p className="text-micro font-bold uppercase tracking-wider2 text-navy-500">
              {t.about.coverageZones} — {site.address.city}
            </p>
          </Rise>
        </div>

        <div className="mask-fade-r mt-8">
          <Marquee
            items={site.coverage}
            speed={44}
            renderItem={(zone, i) => (
              <span
                key={`${zone}-${i}`}
                className="flex items-center gap-3 whitespace-nowrap font-heading text-[clamp(1.25rem,2.4vw,2rem)] font-extrabold uppercase tracking-tight text-navy-200"
              >
                {zone}
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
            )}
          />
        </div>
      </section>

      <CtaBanner title={s.ctaTitle} text={s.ctaText} />
    </>
  );
}
