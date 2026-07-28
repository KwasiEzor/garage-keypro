'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { images } from '@/lib/images';
import { IconArrow } from '@/components/Icons';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate flex min-h-[68vh] items-center justify-center overflow-hidden bg-navy-950 py-[clamp(5rem,10vw,8rem)] text-center">
      <Image
        src={images.heroWorkshop.src}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover opacity-[0.15]"
      />
      <div className="absolute inset-0 bg-grid-pattern [background-size:46px_46px]" />
      <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]" />

      <div className="container-x relative">
        <p
          className="tnum text-[clamp(5rem,18vw,12rem)] font-normal leading-none text-brand"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          404
        </p>
        <h1 className="mt-6 text-h2 text-white">{t.notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-lead text-white/55">{t.notFound.text}</p>

        <Link href="/" className="btn-primary mt-10">
          {t.common.backHome}
          <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
