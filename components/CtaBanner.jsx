'use client';

import Image from 'next/image';
import Link from 'next/link';
import { site, telHref, displayPhone } from '@/lib/site';
import { images, alt as altOf } from '@/lib/images';
import { useLanguage } from './LanguageProvider';
import { Magnetic, Parallax, Rise, SplitText } from './motion';
import { IconArrow, IconPhone, IconWhatsapp } from './Icons';

export default function CtaBanner({ title, text }) {
  const { t, locale } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-[clamp(4rem,7vw,6rem)] text-white">
      <Parallax speed={0.24} className="absolute inset-0 -z-10">
        <div className="relative h-[128%] w-full">
          <Image
            src={images.cta.src}
            alt={altOf(images.cta, locale)}
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/90 to-brand/25" />
      <div className="absolute inset-0 -z-10 bg-grid-pattern [background-size:42px_42px]" />

      <div className="container-x relative flex flex-col items-center gap-10 text-center lg:flex-row lg:gap-16 lg:text-left">
        <div className="flex-1">
          <SplitText text={title} as="h2" className="text-h2 font-extrabold text-white" />
          <Rise delay={200}>
            <p className="mt-4 max-w-prose2 text-lead text-white/60">{text}</p>
          </Rise>
        </div>

        <Rise delay={280} className="flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <a href={telHref(site.phones[0])} className="btn-primary tnum">
              <IconPhone className="h-4 w-4" />
              {displayPhone(site.phones[0])}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa"
            >
              <IconWhatsapp className="h-4 w-4" />
              WhatsApp
            </a>
          </Magnetic>
          <Magnetic>
            <Link href="/contact" className="btn-outline">
              {t.common.getQuote}
              <IconArrow className="h-4 w-4" />
            </Link>
          </Magnetic>
        </Rise>
      </div>
    </section>
  );
}
