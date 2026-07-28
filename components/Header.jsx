'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { site, telHref, displayPhone } from '@/lib/site';
import Logo from './Logo';
import {
  IconArrow,
  IconClose,
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconMail,
  IconMenu,
  IconPhone,
  IconPin,
  IconTwitter,
  IconYoutube,
} from './Icons';

export default function Header() {
  const { t, locale, setLocale } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = [
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

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* ————— Barre de contact ————— */}
      <div className="hidden bg-navy-950 text-white lg:block">
        <div className="container-x flex h-11 items-center justify-between text-micro">
          <div className="flex items-center gap-7">
            <a
              href={telHref(site.phones[0])}
              className="tnum flex items-center gap-2 text-white/75 transition-colors hover:text-white"
            >
              <IconPhone className="h-3.5 w-3.5 text-brand" />
              {displayPhone(site.phones[0])}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-white/75 transition-colors hover:text-white"
            >
              <IconMail className="h-3.5 w-3.5 text-brand" />
              {site.email}
            </a>
            <span className="flex items-center gap-2 text-white/45">
              <IconPin className="h-3.5 w-3.5 text-brand" />
              {site.address.short[locale]}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-0.5 rounded-full border border-white/15 p-0.5">
              {['fr', 'en'].map((code) => (
                <button
                  key={code}
                  onClick={() => setLocale(code)}
                  aria-pressed={locale === code}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    locale === code ? 'bg-brand text-white' : 'text-white/55 hover:text-white'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3.5 text-white/50">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="transition-colors hover:text-brand-300"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ————— Navigation ————— */}
      <div
        className={`border-b transition-all duration-500 ease-smooth ${
          scrolled
            ? 'border-navy-100 bg-white/90 shadow-soft backdrop-blur-xl'
            : 'border-transparent bg-white'
        }`}
      >
        <div
          className={`container-x flex items-center justify-between gap-6 transition-all duration-500 ease-smooth ${
            scrolled ? 'h-[68px]' : 'h-[84px]'
          }`}
        >
          <Link href="/" aria-label={site.name} className="shrink-0">
            <Logo
              theme="color"
              className={`w-auto transition-all duration-500 ease-smooth ${
                scrolled ? 'h-8' : 'h-10'
              }`}
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative rounded-lg px-4 py-2.5 text-small font-semibold transition-colors duration-300 ${
                    active ? 'text-brand' : 'text-navy-700 hover:text-brand'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-4 bottom-1 h-[2px] origin-left rounded-full bg-brand transition-transform duration-300 ease-smooth ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn-primary btn-sm hidden sm:inline-flex">
              {t.nav.quote}
              <IconArrow className="h-3.5 w-3.5" />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg border border-navy-200 p-2.5 text-navy-900 transition-colors hover:border-brand hover:text-brand lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ————— Menu mobile ————— */}
      <div
        className={`overflow-hidden border-b border-navy-100 bg-white transition-[max-height,opacity] duration-500 ease-smooth lg:hidden ${
          open ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-x py-6">
          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-small font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'bg-brand/5 text-brand'
                    : 'text-navy-800 hover:bg-navy-50 hover:text-brand'
                }`}
              >
                {link.label}
                <IconArrow className="h-4 w-4 text-brand/60" />
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex items-center gap-2 border-t border-navy-100 pt-6">
            {['fr', 'en'].map((code) => (
              <button
                key={code}
                onClick={() => setLocale(code)}
                className={`rounded-lg border px-4 py-2 text-micro font-bold uppercase tracking-wider transition-colors ${
                  locale === code
                    ? 'border-brand bg-brand text-white'
                    : 'border-navy-200 text-navy-600'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-2.5">
            <a href={telHref(site.phones[0])} className="btn-navy tnum w-full">
              <IconPhone className="h-4 w-4" /> {displayPhone(site.phones[0])}
            </a>
            <Link href="/contact" className="btn-primary w-full">
              {t.nav.quote}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
