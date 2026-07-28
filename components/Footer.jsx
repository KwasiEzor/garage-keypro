'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { site, telHref, displayPhone } from '@/lib/site';
import Logo from './Logo';
import {
  IconArrow,
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconMail,
  IconPhone,
  IconPin,
  IconTwitter,
  IconYoutube,
} from './Icons';

export default function Footer() {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/services', label: t.nav.services },
    { href: '/a-propos', label: t.nav.about },
    { href: '/marques', label: t.nav.brands },
    { href: '/galerie', label: t.nav.gallery },
    { href: '/contact', label: t.nav.contact },
  ];

  const socials = [
    { href: site.social.linkedin, Icon: IconLinkedin, label: 'LinkedIn' },
    { href: site.social.twitter, Icon: IconTwitter, label: 'X' },
    { href: site.social.youtube, Icon: IconYoutube, label: 'YouTube' },
    { href: site.social.instagram, Icon: IconInstagram, label: 'Instagram' },
    { href: site.social.facebook, Icon: IconFacebook, label: 'Facebook' },
  ];

  const Heading = ({ children }) => (
    <h3 className="title-underline text-h4 font-bold text-white">{children}</h3>
  );

  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-brand/10 blur-[120px]" />

      {/* ————— Newsletter ————— */}
      <div className="container-x relative pt-[clamp(3.5rem,6vw,5rem)]">
        <div className="grid items-center gap-8 rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-8 shadow-inset ring-1 ring-white/10 sm:p-10 lg:grid-cols-[auto,1fr,auto]">
          <div className="border-white/10 lg:border-r lg:pr-10">
            <Logo theme="light" className="h-11 w-auto" />
          </div>

          <div>
            <p className="text-h4 font-bold text-white">{t.footer.newsletterTitle}</p>
            <p className="mt-1 text-small text-white/45">{site.tagline[locale]}</p>
          </div>

          <form
            className="flex w-full gap-2.5 lg:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="footer-email" className="sr-only">
              {t.footer.newsletterPlaceholder}
            </label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder={t.footer.newsletterPlaceholder}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-small text-white outline-none transition-colors placeholder:text-white/35 focus:border-brand lg:w-60"
            />
            <button type="submit" className="btn-primary btn-sm shrink-0">
              {t.footer.newsletterButton}
            </button>
          </form>
        </div>
      </div>

      {/* ————— Colonnes ————— */}
      <div className="container-x relative grid gap-12 py-[clamp(3.5rem,6vw,5rem)] sm:grid-cols-2 lg:grid-cols-[1.4fr,1fr,1.2fr,1.1fr]">
        <div>
          <Heading>{t.nav.about}</Heading>
          <p className="mt-5 max-w-sm text-small leading-relaxed text-white/50">
            {t.footer.about}
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="rounded-xl border border-white/10 p-2.5 text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <Heading>{t.footer.explore}</Heading>
          <ul className="mt-5 space-y-3 text-small">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-2.5 text-white/50 transition-colors hover:text-brand-300"
                >
                  <IconArrow className="h-3.5 w-3.5 text-brand transition-transform duration-300 group-hover:translate-x-1" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Heading>{t.footer.contact}</Heading>
          <ul className="mt-5 space-y-4 text-small">
            <li className="flex gap-3.5 text-white/50">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>{site.address.full[locale]}</span>
            </li>
            <li className="flex gap-3.5">
              <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span className="tnum space-y-1.5">
                {site.phones.map((p) => (
                  <a
                    key={p}
                    href={telHref(p)}
                    className="block text-white/50 transition-colors hover:text-brand-300"
                  >
                    {displayPhone(p)}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3.5">
              <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a
                href={`mailto:${site.email}`}
                className="break-all text-white/50 transition-colors hover:text-brand-300"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Heading>{t.footer.hours}</Heading>
          <ul className="mt-5 space-y-3.5 text-small">
            {site.hours[locale].map(([day, time]) => (
              <li key={day} className="flex items-baseline justify-between gap-3">
                <span className="text-white/50">{day}</span>
                <span className="tnum font-semibold text-white/90">{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ————— Bas de page ————— */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-micro text-white/40 sm:flex-row">
          <p>
            © {year} <span className="font-semibold text-white/65">{site.name}</span>.{' '}
            {t.footer.rights}
          </p>
          <p className="text-white/30">
            {locale === 'fr' ? 'Photos : Unsplash' : 'Photos: Unsplash'}
          </p>
        </div>
      </div>
    </footer>
  );
}
