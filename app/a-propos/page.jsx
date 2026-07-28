'use client';

import Image from 'next/image';
import { useLanguage } from '@/components/LanguageProvider';
import PageHero from '@/components/PageHero';
import { Parallax, Rise, SplitText } from '@/components/motion';
import CtaBanner from '@/components/CtaBanner';
import { site } from '@/lib/site';
import { images, alt as altOf } from '@/lib/images';
import {
  IconBolt,
  IconCar,
  IconCheck,
  IconGlobe,
  IconPin,
  IconShield,
  IconSparkle,
  IconTools,
} from '@/components/Icons';

const valueIcons = [IconTools, IconBolt, IconShield, IconSparkle, IconCar];

export default function AboutPage() {
  const { t, locale } = useLanguage();
  const a = t.about;

  return (
    <>
      <PageHero
        eyebrow={a.eyebrow}
        title={a.title}
        intro={a.intro}
        crumb={t.nav.about}
        image={images.bannerAbout}
      />

      {/* ——— Mission / Vision ——— */}
      <section className="section bg-white">
        <div className="container-x grid gap-7 lg:grid-cols-2">
          <Rise>
            <div className="relative h-full overflow-hidden rounded-2xl bg-navy-950 p-10">
              <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/12 blur-2xl" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-glow">
                <IconShield className="h-6 w-6" />
              </span>
              <SplitText text={a.missionTitle} as="h2" className="relative mt-7 text-h2 text-white" />
              <p className="relative mt-5 text-lead text-white/60">{a.missionText}</p>
            </div>
          </Rise>

          <Rise delay={100}>
            <div className="relative h-full overflow-hidden rounded-2xl bg-brand p-10">
              <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white">
                <IconSparkle className="h-6 w-6" />
              </span>
              <SplitText text={a.visionTitle} as="h2" className="relative mt-7 text-h2 text-white" />
              <p className="relative mt-5 text-lead text-white/85">{a.visionText}</p>
            </div>
          </Rise>
        </div>
      </section>

      {/* ——— Valeurs ——— */}
      <section className="section bg-navy-50/70">
        <div className="container-x">
          <Rise className="section-head mx-auto max-w-2xl text-center">
            <p className="eyebrow">{locale === 'fr' ? 'Ce qui nous guide' : 'What drives us'}</p>
            <SplitText text={a.valuesTitle} as="h2" className="mt-4 text-h2" />
          </Rise>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {a.values.map((value, i) => {
              const Icon = valueIcons[i] || IconCheck;
              return (
                <Rise key={value.title} delay={i * 70}>
                  <div className="card h-full">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 text-h4 font-bold">{value.title}</h3>
                    <p className="mt-3 text-small text-navy-500">{value.text}</p>
                  </div>
                </Rise>
              );
            })}

            {/* Vignette photo pour compléter la grille */}
            <Rise delay={a.values.length * 70}>
              <div className="media media-zoom h-full min-h-[15rem] shadow-lift">
                <Image
                  src={images.about[1].src}
                  alt={altOf(images.about[1], locale)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="overlay-bottom" />
                <p className="absolute bottom-6 left-6 right-6 text-small font-bold text-white">
                  {site.tagline[locale]}
                </p>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* ——— Innovation digitale ——— */}
      <section className="section bg-white">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <Rise>
            <p className="eyebrow eyebrow-start">
              {locale === 'fr' ? 'Technologie' : 'Technology'}
            </p>
            <SplitText text={a.innovationTitle} as="h2" className="mt-4 text-h2" />
            <p className="mt-6 text-lead text-navy-500">{a.innovationText}</p>

            <ul className="mt-8 space-y-4">
              {a.innovation.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10">
                    <IconCheck className="h-4 w-4 text-brand" />
                  </span>
                  <span className="text-small font-medium text-navy-700">{item}</span>
                </li>
              ))}
            </ul>

            <Parallax speed={0.1} className="mt-10">
            <div className="media media-zoom aspect-[16/9] shadow-lift">
              <Image
                src={images.keyClose.src}
                alt={altOf(images.keyClose, locale)}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
            </Parallax>
          </Rise>

          <Rise delay={120}>
            <div className="overflow-hidden rounded-2xl bg-navy-950 shadow-lift ring-1 ring-white/10">
              <div className="media aspect-[16/10] rounded-none">
                <Image
                  src={images.bannerContact.src}
                  alt={altOf(images.bannerContact, locale)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent" />
              </div>

              <div className="p-9">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
                    <IconPin className="h-5 w-5" />
                  </span>
                  <h3 className="text-h4 font-bold text-white">{a.coverageTitle}</h3>
                </div>

                <p className="mt-5 text-small leading-relaxed text-white/55">{a.coverageText}</p>

                <div className="mt-7 space-y-3.5 border-t border-white/10 pt-7">
                  {site.hours[locale].map(([day, time]) => (
                    <div key={day} className="flex items-baseline justify-between text-small">
                      <span className="text-white/50">{day}</span>
                      <span className="tnum font-semibold text-white">{time}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-3.5 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <IconGlobe className="h-5 w-5 shrink-0 text-brand" />
                  <p className="text-small text-white/70">{site.address.full[locale]}</p>
                </div>
              </div>
            </div>
          </Rise>
        </div>
      </section>

      <CtaBanner title={t.home.ctaTitle} text={t.home.ctaText} />
    </>
  );
}
