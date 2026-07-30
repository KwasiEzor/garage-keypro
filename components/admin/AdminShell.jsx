'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from '@/components/Logo';
import {
  IconArrow,
  IconCar,
  IconClose,
  IconGlobe,
  IconMenu,
  IconScanner,
  IconSettings,
  IconSparkle,
  IconTools,
} from '@/components/Icons';

const NAV = [
  { href: '/admin', label: 'Vue d’ensemble', Icon: IconSparkle, exact: true },
  { href: '/admin/devis', label: 'Demandes de devis', Icon: IconScanner },
  { href: '/admin/interventions', label: 'Interventions', Icon: IconTools },
  { href: '/admin/clients', label: 'Clients & véhicules', Icon: IconCar },
  { href: '/admin/contenu', label: 'Contenu du site', Icon: IconGlobe },
  { href: '/admin/parametres', label: 'Paramètres', Icon: IconSettings },
];

export default function AdminShell({ profile, email, children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const nav = (
    <nav className="space-y-1">
      {NAV.map((item) => {
        const active = isActive(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-small font-semibold transition-colors ${
              active
                ? 'bg-brand text-white shadow-glow'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.Icon className="h-5 w-5 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-navy-50">
      {/* ——— Barre latérale, grand écran ——— */}
      <aside className="fixed inset-y-0 left-0 hidden w-[17rem] flex-col bg-navy-950 p-6 lg:flex">
        <Link href="/admin" className="px-1">
          <Logo theme="light" className="h-9 w-auto" />
        </Link>

        <div className="mt-9 flex-1">{nav}</div>

        <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
          <p className="truncate text-small font-semibold text-white">
            {profile.full_name || email}
          </p>
          <p className="mt-0.5 truncate text-micro text-white/40">{email}</p>
          <p className="mt-2 inline-block rounded-full bg-brand/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-300">
            {profile.role === 'owner' ? 'Responsable' : 'Équipe'}
          </p>

          <div className="mt-4 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-micro text-white/50 transition-colors hover:text-white"
            >
              <IconArrow className="h-3.5 w-3.5 rotate-180" />
              Voir le site
            </Link>
            <form action="/admin/deconnexion" method="post">
              <button className="text-micro text-white/50 transition-colors hover:text-brand-300">
                Se déconnecter
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* ——— Barre supérieure, mobile ——— */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-4 bg-navy-950 px-5 py-4 lg:hidden">
        <Link href="/admin">
          <Logo theme="light" className="h-8 w-auto" />
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="rounded-lg border border-white/15 p-2 text-white"
        >
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </header>

      {open && (
        <div className="sticky top-[64px] z-40 bg-navy-950 px-5 pb-6 lg:hidden">
          {nav}
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
            <span className="truncate text-micro text-white/50">{email}</span>
            <form action="/admin/deconnexion" method="post">
              <button className="text-micro font-semibold text-brand-300">Déconnexion</button>
            </form>
          </div>
        </div>
      )}

      {/* ——— Contenu ——— */}
      <main className="lg:pl-[17rem]">
        <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">{children}</div>
      </main>
    </div>
  );
}
