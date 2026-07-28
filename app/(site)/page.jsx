'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import CtaBanner from '@/components/CtaBanner';
import {
  Counter,
  Magnetic,
  Marquee,
  Parallax,
  Rise,
  SplitText,
  Spotlight,
  useMediaQuery,
  useReducedMotion,
  useScrollProgress,
} from '@/components/motion';
import { site, telHref, displayPhone, displayPhones } from '@/lib/site';
import { images, alt as altOf } from '@/lib/images';
import {
  IconArrow,
  IconBolt,
  IconCar,
  IconCheck,
  IconGlobe,
  IconPhone,
  IconPin,
  IconSparkle,
  IconTools,
  IconWhatsapp,
  serviceIcons,
} from '@/components/Icons';

const whyIcons = [IconBolt, IconTools, IconGlobe, IconSparkle];

export default function HomePage() {
  const { t, locale } = useLanguage();
  const h = t.home;
  const reduced = useReducedMotion();

  // Section épinglée « clé perdue » — active uniquement sur grand écran
  const pinRef = useRef(null);
  const rawPin = useScrollProgress(pinRef, { start: 1, end: 0 });
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const pinned = isDesktop && !reduced;
  const pin = pinned ? rawPin : 1;

  return (
    <>
      {/* ══════════════════ HÉROS PLEIN ÉCRAN ══════════════════ */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-navy-950">
        <Parallax speed={0.4} scale className="absolute inset-0 -z-10">
          <div className="relative h-[118%] w-full">
            <Image
              src={images.heroWorkshop.src}
              alt={altOf(images.heroWorkshop, locale)}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-30"
            />
          </div>
        </Parallax>

        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950 via-navy-950/94 to-navy-900/65" />
        <div className="absolute inset-0 -z-10 bg-grid-pattern [background-size:52px_52px]" />
        <div className="absolute -right-40 top-0 -z-10 h-[38rem] w-[38rem] animate-float rounded-full bg-brand/20 blur-[150px]" />
        <div className="absolute -left-32 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-navy-500/25 blur-[130px]" />

        <div className="container-x relative grid w-full items-center gap-16 py-24 lg:grid-cols-[1.05fr,1fr] lg:gap-20">
          <div>
            <Rise>
              <p className="eyebrow eyebrow-start text-brand-300">{h.heroEyebrow}</p>
            </Rise>

            <Rise delay={90}>
              <p className="mt-6 font-script text-[clamp(2.25rem,4.6vw,3.75rem)] leading-none text-white/85">
                {h.heroTitleTop}
              </p>
            </Rise>

            <SplitText
              as="h1"
              text={h.heroTitleMain}
              delay={220}
              stagger={70}
              className="mt-1 font-display text-display-xl font-normal uppercase text-white"
            />

            <Rise delay={340}>
              <p className="mt-8 max-w-xl text-lead text-white/60">{h.heroSubtitle}</p>
            </Rise>

            <Rise delay={410}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {h.heroBadges.map((badge, i) => (
                  <li
                    key={badge}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-micro font-bold uppercase tracking-wider2 transition-transform duration-300 hover:-translate-y-0.5 ${
                      i === 2
                        ? 'bg-white text-brand shadow-lg'
                        : 'border border-white/15 bg-white/[0.06] text-white/90 backdrop-blur-sm'
                    }`}
                  >
                    <IconCheck className={`h-4 w-4 ${i === 2 ? 'text-brand' : 'text-brand-400'}`} />
                    {badge}
                  </li>
                ))}
              </ul>
            </Rise>

            <Rise delay={480}>
              <div className="mt-10 flex flex-wrap items-center gap-3.5">
                <Magnetic>
                  <Link href="/contact" className="btn-primary">
                    {t.common.bookNow}
                    <IconArrow className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <a href={telHref(site.phones[0])} className="btn-outline tnum">
                    <IconPhone className="h-4 w-4" />
                    {displayPhone(site.phones[0])}
                  </a>
                </Magnetic>
              </div>
            </Rise>

            <Rise delay={550}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-7 text-micro text-white/45">
                <span className="flex items-center gap-2">
                  <IconPin className="h-4 w-4 text-brand" />
                  {site.address.full[locale]}
                </span>
                <span className="flex items-center gap-2">
                  <IconCar className="h-4 w-4 text-brand" />
                  {locale === 'fr' ? 'Toutes marques' : 'All brands'}
                </span>
                <span className="flex items-center gap-2">
                  <IconBolt className="h-4 w-4 text-brand" />
                  {locale === 'fr' ? 'Sur site en 30 min' : 'On site in 30 min'}
                </span>
              </div>
            </Rise>
          </div>

          {/* Visuel */}
          <Rise delay={300} className="relative hidden lg:block">
            <Parallax speed={-0.14}>
              <div className="relative">
                <div className="media media-zoom aspect-[4/5] rounded-[2.25rem] shadow-lift ring-1 ring-white/10">
                  <Image
                    src={images.heroKey.src}
                    alt={altOf(images.heroKey, locale)}
                    fill
                    priority
                    sizes="(max-width: 1024px) 0px, 42vw"
                    className="object-cover"
                  />
                  <div className="overlay-bottom opacity-70" />
                </div>

                <div className="absolute -left-8 top-10 animate-float rounded-2xl border border-white/10 bg-navy-950/85 px-6 py-4 shadow-lift backdrop-blur-md">
                  <p className="text-[10px] font-semibold uppercase tracking-widest2 text-white/40">
                    {locale === 'fr' ? 'Clés programmées' : 'Keys programmed'}
                  </p>
                  <Counter
                    value="2 000+"
                    className="tnum mt-1 block font-heading text-3xl font-extrabold text-white"
                  />
                </div>

                <div className="absolute -right-6 bottom-16 rounded-2xl bg-brand px-6 py-4 shadow-glow">
                  <p className="text-[10px] font-semibold uppercase tracking-widest2 text-white/75">
                    {locale === 'fr' ? 'Assistance' : 'Assistance'}
                  </p>
                  <p className="tnum mt-1 font-heading text-3xl font-extrabold text-white">24/7</p>
                </div>

                <div className="absolute -bottom-5 left-10 flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-lift">
                  <IconGlobe className="h-5 w-5 text-brand" />
                  <span className="text-micro font-bold uppercase tracking-wider2 text-navy-950">
                    {locale === 'fr' ? 'Toutes marques' : 'All brands'}
                  </span>
                </div>
              </div>
            </Parallax>
          </Rise>
        </div>

        {/* Indicateur de défilement */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-brand" />
          </span>
        </div>
      </section>

      {/* ══════════════════ BANDE DE CONTACT ══════════════════ */}
      <section className="border-b border-navy-100 bg-navy-950">
        <div className="container-x grid divide-white/10 sm:grid-cols-3 sm:divide-x">
          {[
            {
              label: t.common.callUs,
              value: displayPhones(),
              href: telHref(site.phones[0]),
              Icon: IconPhone,
            },
            {
              label: t.common.emailUs,
              value: site.email,
              href: `mailto:${site.email}`,
              Icon: IconGlobe,
            },
            {
              label: 'WhatsApp',
              value: displayPhone(site.phones[0]),
              href: `https://wa.me/${site.whatsapp}`,
              Icon: IconWhatsapp,
            },
          ].map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              className="group flex items-center gap-4 px-2 py-7 sm:px-7"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-widest2 text-white/35">
                  {label}
                </span>
                <span className="tnum mt-0.5 block truncate text-small font-semibold text-white">
                  {value}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════════════ SECTION ÉPINGLÉE « CLÉ PERDUE » ══════════════════ */}
      <section
        ref={pinRef}
        className="relative bg-navy-950 lg:h-[280vh]"
      >
        <div className="flex min-h-screen items-center overflow-hidden py-24 lg:sticky lg:top-0 lg:h-screen lg:py-0">
          {/* Image de fond qui se dézoome au défilement */}
          <div
            className="absolute inset-0"
            style={{
              transform: pinned ? `scale(${(1.28 - pin * 0.28).toFixed(3)})` : 'scale(1.04)',
              transition: 'transform .12s linear',
            }}
          >
            <Image
              src={images.bannerServices.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div
            className="absolute inset-0 bg-navy-950"
            style={{ opacity: pinned ? 0.94 - pin * 0.16 : 0.86 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950" />

          <div className="container-x relative w-full">
            <div className="max-w-3xl">
              <p className="eyebrow eyebrow-start text-brand-300">{h.showcase.eyebrow}</p>

              <h2 className="mt-6 text-display-lg font-extrabold leading-[0.95] text-white/25">
                {h.showcase.lead}
                <br />
                <span
                  className="text-white"
                  style={{
                    opacity: pinned ? Math.min(1, Math.max(0, (pin - 0.12) * 3.4)) : 1,
                    transform: pinned
                      ? `translateY(${Math.max(0, 28 - pin * 90).toFixed(1)}px)`
                      : 'none',
                    display: 'inline-block',
                    transition: 'opacity .2s linear, transform .2s linear',
                  }}
                >
                  {h.showcase.title}
                </span>
              </h2>

              <p
                className="mt-8 max-w-xl text-lead text-white/55"
                style={{
                  opacity: pinned ? Math.min(1, Math.max(0, (pin - 0.3) * 3.5)) : 1,
                  transition: 'opacity .2s linear',
                }}
              >
                {h.showcase.text}
              </p>
            </div>

            {/* Les 3 étapes apparaissent l'une après l'autre */}
            <div className="mt-14 grid gap-5 sm:grid-cols-3">
              {h.showcase.steps.map((step, i) => {
                const seuil = 0.42 + i * 0.13;
                const on = !pinned || pin > seuil;
                return (
                  <div
                    key={step.k}
                    className="glass rounded-2xl p-7"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on ? 'none' : 'translateY(34px)',
                      transition:
                        'opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)',
                    }}
                  >
                    <span className="tnum font-heading text-h2 font-extrabold leading-none text-brand">
                      {step.k}
                    </span>
                    <h3 className="mt-5 text-h4 font-bold text-white">{step.title}</h3>
                    <p className="mt-2.5 text-small text-white/50">{step.text}</p>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-12 flex flex-wrap gap-3.5"
              style={{
                opacity: pinned ? Math.min(1, Math.max(0, (pin - 0.7) * 4)) : 1,
                transition: 'opacity .3s linear',
              }}
            >
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                <IconWhatsapp className="h-4 w-4" />
                WhatsApp
              </a>
              <a href={telHref(site.phones[0])} className="btn-outline tnum">
                <IconPhone className="h-4 w-4" />
                {displayPhone(site.phones[0])}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SERVICES ══════════════════ */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="section-head mx-auto max-w-2xl text-center">
            <Rise>
              <p className="eyebrow">{h.servicesEyebrow}</p>
            </Rise>
            <SplitText text={h.servicesTitle} as="h2" className="mt-4 text-h2" />
            <Rise delay={160}>
              <p className="lead mx-auto mt-5">{h.servicesIntro}</p>
            </Rise>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((service, i) => {
              const Icon = serviceIcons[service.icon] || IconTools;
              const img = images.services[service.slug];
              return (
                <Rise key={service.slug} delay={i * 80}>
                  <Spotlight className="h-full rounded-2xl">
                    <Link
                      href={`/services#${service.slug}`}
                      className="group relative z-10 flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-2 hover:border-transparent hover:shadow-lift"
                    >
                      <div className="media media-zoom aspect-[16/10] rounded-none">
                        <Image
                          src={img.src}
                          alt={altOf(img, locale)}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/78 via-navy-950/8 to-transparent" />
                        <span className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 text-brand shadow-lg backdrop-blur transition-all duration-500 group-hover:rotate-6 group-hover:bg-brand group-hover:text-white">
                          <Icon className="h-6 w-6" />
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-7">
                        <h3 className="text-h3">{service.title}</h3>
                        <p className="mt-3 flex-1 text-small text-navy-500">{service.short}</p>
                        <span className="mt-6 inline-flex items-center gap-2 text-micro font-bold uppercase tracking-wider2 text-brand">
                          {t.common.readMore}
                          <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </span>
                      </div>
                    </Link>
                  </Spotlight>
                </Rise>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ STATISTIQUES ══════════════════ */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-[clamp(4rem,7vw,6rem)]">
        <Parallax speed={0.22} className="absolute inset-0 -z-10">
          <div className="relative h-[125%] w-full">
            <Image
              src={images.bannerAbout.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className="object-cover opacity-[0.18]"
            />
          </div>
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-navy-950/78" />

        <div className="container-x relative grid gap-10 divide-white/10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
          {h.stats.map((stat, i) => (
            <Rise key={stat.label} delay={i * 90} className="text-center lg:px-4">
              <Counter
                value={stat.value}
                className="tnum block font-heading text-[clamp(2.75rem,4.5vw,3.75rem)] font-extrabold leading-none text-brand"
              />
              <p className="mt-3 text-micro font-semibold uppercase tracking-wider2 text-white/45">
                {stat.label}
              </p>
            </Rise>
          ))}
        </div>
      </section>

      {/* ══════════════════ À PROPOS ══════════════════ */}
      <section className="section bg-navy-50/70">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-4 sm:space-y-5">
                <Rise>
                  <Parallax speed={0.1}>
                    <div className="media media-zoom aspect-[4/5] shadow-lift">
                      <Image
                        src={images.about[0].src}
                        alt={altOf(images.about[0], locale)}
                        fill
                        sizes="(max-width: 1024px) 45vw, 22vw"
                        className="object-cover"
                      />
                    </div>
                  </Parallax>
                </Rise>
                <Rise delay={120}>
                  <div className="media media-zoom aspect-square shadow-soft">
                    <Image
                      src={images.about[2].src}
                      alt={altOf(images.about[2], locale)}
                      fill
                      sizes="(max-width: 1024px) 45vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                </Rise>
              </div>

              <div className="space-y-4 pt-10 sm:space-y-5 sm:pt-14">
                <Rise delay={60}>
                  <div className="media media-zoom aspect-square shadow-soft">
                    <Image
                      src={images.about[1].src}
                      alt={altOf(images.about[1], locale)}
                      fill
                      sizes="(max-width: 1024px) 45vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                </Rise>
                <Rise delay={180}>
                  <Parallax speed={-0.1}>
                    <div className="media media-zoom aspect-[4/5] shadow-lift">
                      <Image
                        src={images.about[3].src}
                        alt={altOf(images.about[3], locale)}
                        fill
                        sizes="(max-width: 1024px) 45vw, 22vw"
                        className="object-cover"
                      />
                    </div>
                  </Parallax>
                </Rise>
              </div>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-4 rounded-2xl bg-white px-7 py-5 shadow-lift ring-1 ring-navy-100">
              <Counter
                value="10+"
                className="tnum font-heading text-[2.75rem] font-extrabold leading-none text-brand"
              />
              <span className="whitespace-pre-line text-micro font-bold uppercase leading-tight tracking-wider2 text-navy-500">
                {locale === 'fr' ? "Années\nd'expérience" : 'Years of\nexperience'}
              </span>
            </div>
          </div>

          <div>
            <Rise>
              <p className="eyebrow eyebrow-start">{h.aboutEyebrow}</p>
            </Rise>
            <SplitText text={h.aboutTitle} as="h2" className="mt-4 text-h2" />
            <Rise delay={180}>
              <p className="mt-6 text-lead text-navy-500">{h.aboutText}</p>
            </Rise>

            <ul className="mt-8 space-y-4">
              {h.aboutPoints.map((point, i) => (
                <Rise key={point} delay={250 + i * 80} as="li" className="flex items-center gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10">
                    <IconCheck className="h-4 w-4 text-brand" />
                  </span>
                  <span className="text-small font-semibold text-navy-950">{point}</span>
                </Rise>
              ))}
            </ul>

            <Rise delay={480}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Magnetic>
                  <Link href="/a-propos" className="btn-primary">
                    {t.common.readMore}
                    <IconArrow className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <a
                  href={telHref(site.phones[1])}
                  className="group flex items-center gap-3.5 text-small font-bold text-navy-950 transition-colors hover:text-brand"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <span className="tnum">{displayPhone(site.phones[1])}</span>
                </a>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* ══════════════════ COUVERTURE GRAND LOMÉ ══════════════════ */}
      <section className="relative overflow-hidden border-y border-navy-100 bg-white py-[clamp(3.5rem,6vw,5rem)]">
        <div className="container-x">
          <Rise className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{h.coverage.eyebrow}</p>
            <h2 className="mt-4 text-h2">{h.coverage.title}</h2>
            <p className="lead mx-auto mt-4">{h.coverage.text}</p>
          </Rise>
        </div>

        <div className="mask-fade-r mt-12">
          <Marquee
            items={site.coverage}
            speed={46}
            renderItem={(zone, i) => (
              <span
                key={`${zone}-${i}`}
                className="flex items-center gap-3 whitespace-nowrap font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold uppercase tracking-tight text-navy-200"
              >
                {zone}
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
            )}
          />
        </div>

        <div className="container-x mt-12 text-center">
          <Magnetic className="inline-block">
            <Link href="/contact" className="btn-ghost">
              <IconPin className="h-4 w-4" />
              {locale === 'fr' ? 'Voir la carte' : 'View the map'}
              <IconArrow className="h-4 w-4" />
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* ══════════════════ PROCESSUS ══════════════════ */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-[clamp(4.5rem,8vw,7rem)]">
        <div className="absolute inset-0 -z-10 bg-grid-pattern [background-size:48px_48px]" />
        <div className="absolute -left-40 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand/12 blur-[150px]" />
        <div className="absolute -right-32 bottom-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-navy-500/20 blur-[130px]" />

        <div className="container-x">
          <div className="section-head mx-auto max-w-2xl text-center">
            <Rise>
              <p className="eyebrow text-brand-300">{h.processEyebrow}</p>
            </Rise>
            <SplitText text={h.processTitle} as="h2" className="mt-4 text-h2 text-white" />
          </div>

          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {/* Fil conducteur */}
            <div className="pointer-events-none absolute inset-x-8 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent lg:block" />

            {h.process.map((step, i) => {
              const img = images.process[i % images.process.length];
              return (
                <Rise key={step.title} delay={i * 110}>
                  <article className="group relative h-full overflow-hidden rounded-2xl bg-navy-900 ring-1 ring-white/10 transition-all duration-500 ease-smooth hover:-translate-y-2 hover:ring-brand/50 hover:shadow-glow">
                    {/* Photo */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={img.src}
                        alt={altOf(img, locale)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/45 to-navy-900/10" />

                      {/* Numéro filigrane */}
                      <span
                        aria-hidden="true"
                        className="tnum absolute -bottom-3 right-3 font-display text-[4.5rem] leading-none text-white/12 transition-colors duration-500 group-hover:text-brand/45"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      {/* Pastille numérotée */}
                      <span className="tnum absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-heading text-micro font-extrabold text-white shadow-glow transition-transform duration-500 group-hover:scale-110">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Texte */}
                    <div className="relative p-6 pt-5">
                      <h3 className="text-h4 font-bold text-white">{step.title}</h3>
                      <p className="mt-2.5 text-small text-white/50 transition-colors duration-500 group-hover:text-white/70">
                        {step.text}
                      </p>
                      <span className="mt-5 block h-[3px] w-10 rounded-full bg-brand/50 transition-all duration-500 ease-smooth group-hover:w-full group-hover:bg-brand" />
                    </div>
                  </article>
                </Rise>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ MARQUES ══════════════════ */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="section-head mx-auto max-w-2xl text-center">
            <Rise>
              <p className="eyebrow">{h.brandsEyebrow}</p>
            </Rise>
            <SplitText text={h.brandsTitle} as="h2" className="mt-4 text-h2" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.brands.groups.map((group, i) => {
              const img = images.regions[i % images.regions.length];
              return (
                <Rise key={group.region} delay={i * 90}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-navy-100 transition-all duration-500 ease-smooth hover:-translate-y-2 hover:ring-transparent hover:shadow-lift">
                    {/* Visuel de la région */}
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <Image
                        src={img.src}
                        alt={altOf(img, locale)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/5" />
                      <div className="absolute inset-0 bg-brand/0 transition-colors duration-500 group-hover:bg-brand/15" />

                      <h3 className="absolute bottom-4 left-5 right-5 text-h4 font-bold text-white">
                        {group.region}
                      </h3>
                      <span className="tnum absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold text-navy-950 backdrop-blur">
                        {group.brands.length}
                      </span>
                    </div>

                    {/* Marques */}
                    <ul className="flex flex-1 flex-wrap content-start gap-1.5 p-6">
                      {group.brands.map((brand) => (
                        <li
                          key={brand}
                          className="rounded-lg bg-navy-50 px-2.5 py-1.5 text-[11px] font-semibold text-navy-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-white"
                        >
                          {brand}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Rise>
              );
            })}
          </div>

          <Rise className="mt-12 text-center">
            <Magnetic className="inline-block">
              <Link href="/marques" className="btn-ghost">
                {t.common.seeAll}
                <IconArrow className="h-4 w-4" />
              </Link>
            </Magnetic>
          </Rise>
        </div>
      </section>

      {/* ══════════════════ POURQUOI NOUS ══════════════════ */}
      <section className="section bg-navy-50/70">
        <div className="container-x">
          <div className="section-head mx-auto max-w-2xl text-center">
            <Rise>
              <p className="eyebrow">{h.whyEyebrow}</p>
            </Rise>
            <SplitText text={h.whyTitle} as="h2" className="mt-4 text-h2" />
          </div>

          {/* Grille bento : une grande cellule + trois secondaires */}
          <div className="grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
            {h.why.map((item, i) => {
              const Icon = whyIcons[i] || IconCheck;
              const img = images.why[i % images.why.length];
              const hero = i === 0;

              return (
                <Rise
                  key={item.title}
                  delay={i * 100}
                  className={hero ? 'lg:col-span-2 lg:row-span-2' : ''}
                >
                  <article
                    className={`group relative h-full overflow-hidden rounded-2xl bg-navy-950 ring-1 ring-white/10 transition-all duration-500 ease-smooth hover:-translate-y-2 hover:ring-brand/45 hover:shadow-glow ${
                      hero ? 'min-h-[22rem] lg:min-h-[30rem]' : 'min-h-[15rem]'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={altOf(img, locale)}
                      fill
                      sizes={
                        hero
                          ? '(max-width: 1024px) 100vw, 66vw'
                          : '(max-width: 1024px) 100vw, 33vw'
                      }
                      className={`object-cover transition-all duration-[1100ms] ease-smooth group-hover:scale-105 ${
                        hero ? 'opacity-45 group-hover:opacity-60' : 'opacity-25 group-hover:opacity-40'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/35" />
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/20 blur-3xl transition-all duration-700 group-hover:bg-brand/35" />

                    <div
                      className={`relative flex h-full flex-col justify-end ${
                        hero ? 'p-8 sm:p-10' : 'p-7'
                      }`}
                    >
                      <span
                        className={`flex shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand ring-1 ring-white/10 backdrop-blur transition-all duration-500 group-hover:rotate-6 group-hover:bg-brand group-hover:text-white ${
                          hero ? 'h-14 w-14' : 'h-12 w-12'
                        }`}
                      >
                        <Icon className={hero ? 'h-7 w-7' : 'h-6 w-6'} />
                      </span>

                      <h3
                        className={`mt-6 font-bold text-white ${hero ? 'text-h2' : 'text-h4'}`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`mt-3 text-white/60 transition-colors duration-500 group-hover:text-white/85 ${
                          hero ? 'max-w-md text-lead' : 'text-small'
                        }`}
                      >
                        {item.text}
                      </p>

                      {hero && (
                        <Magnetic className="mt-8 inline-block self-start">
                          <Link href="/services" className="btn-primary">
                            {t.common.ourServices}
                            <IconArrow className="h-4 w-4" />
                          </Link>
                        </Magnetic>
                      )}
                    </div>
                  </article>
                </Rise>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ TÉMOIGNAGES ══════════════════ */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-[clamp(4.5rem,8vw,7rem)]">
        <Parallax speed={0.18} className="absolute inset-0 -z-10">
          <div className="relative h-[125%] w-full">
            <Image
              src={images.bannerGallery.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className="object-cover opacity-[0.14]"
            />
          </div>
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950 via-navy-950/92 to-navy-950" />

        <div className="container-x relative">
          <div className="section-head mx-auto max-w-2xl text-center">
            <Rise>
              <p className="eyebrow text-brand-300">{h.testimonialsEyebrow}</p>
            </Rise>
            <SplitText text={h.testimonialsTitle} as="h2" className="mt-4 text-h2 text-white" />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {h.testimonials.map((item, i) => (
              <Rise key={item.name} delay={i * 110}>
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
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title={h.ctaTitle} text={h.ctaText} />
    </>
  );
}
