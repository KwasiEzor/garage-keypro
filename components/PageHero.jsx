'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { Parallax, Rise, SplitText } from './motion';
import { alt as altOf } from '@/lib/images';
import { site } from '@/lib/site';
import { IconPin } from './Icons';

export default function PageHero({ eyebrow, title, intro, crumb, image }) {
  const { t, locale } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      {image && (
        <>
          <Parallax speed={0.3} scale className="absolute inset-0 -z-10">
            <div className="relative h-[122%] w-full">
              <Image
                src={image.src}
                alt={altOf(image, locale)}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-40"
              />
            </div>
          </Parallax>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/50" />
        </>
      )}

      <div className="absolute inset-0 -z-10 bg-grid-pattern [background-size:46px_46px]" />
      <div className="absolute -right-28 -top-28 -z-10 h-[28rem] w-[28rem] animate-float rounded-full bg-brand/22 blur-[130px]" />

      <div className="container-x relative py-[clamp(5rem,10vw,8.5rem)]">
        {eyebrow && (
          <Rise>
            <p className="eyebrow eyebrow-start text-brand-300">{eyebrow}</p>
          </Rise>
        )}

        <SplitText
          as="h1"
          text={title}
          delay={120}
          stagger={45}
          className="mt-5 max-w-4xl text-h1 font-extrabold text-white"
        />

        {intro && (
          <Rise delay={280}>
            <p className="mt-7 max-w-prose2 text-lead text-white/60">{intro}</p>
          </Rise>
        )}

        <Rise delay={360}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <nav
              aria-label="Fil d'Ariane"
              className="flex items-center gap-2.5 text-small text-white/45"
            >
              <Link href="/" className="transition-colors hover:text-brand-300">
                {t.nav.home}
              </Link>
              <span className="text-brand">»</span>
              <span className="font-medium text-white">{crumb || title}</span>
            </nav>

            <span className="hidden h-4 w-px bg-white/15 sm:block" />

            <span className="flex items-center gap-2 text-small text-white/45">
              <IconPin className="h-4 w-4 text-brand" />
              {site.address.full[locale]}
            </span>
          </div>
        </Rise>
      </div>

      <div className="divider-red" />
    </section>
  );
}
