'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import PageHero from '@/components/PageHero';
import { Magnetic, Rise, SplitText } from '@/components/motion';
import { site, telHref, displayPhone } from '@/lib/site';
import { images } from '@/lib/images';
import { createClient } from '@/lib/supabase/client';
import LocationMap from '@/components/LocationMap';
import {
  IconArrow,
  IconCheck,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsapp,
} from '@/components/Icons';

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  vehicle: '',
  service: '',
  date: '',
  mode: '',
  message: '',
  consent: false,
};

export default function ContactClient() {
  const { t, locale } = useLanguage();
  const c = t.contact;
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const toggleConsent = () => setForm((f) => ({ ...f, consent: !f.consent }));

  const buildSummary = () => {
    const L = c.fields;
    return [
      `${L.name}: ${form.name}`,
      `${L.phone}: ${site.countryCode} ${form.phone.replace(/^\+?228\s*/, '')}`,
      form.email && `${L.email}: ${form.email}`,
      form.vehicle && `${L.vehicle}: ${form.vehicle}`,
      form.service && `${L.service}: ${form.service}`,
      form.mode && `${L.mode}: ${form.mode}`,
      form.date && `${L.date}: ${form.date}`,
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const validate = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError(c.errorRequired);
      return false;
    }
    if (!form.consent) {
      setError(c.errorConsent);
      return false;
    }
    setError('');
    return true;
  };

  /** Enregistre la demande côté serveur. Silencieux en cas d'échec :
   *  le visiteur garde toujours le relais e-mail ou WhatsApp. */
  const saveToDatabase = async () => {
    try {
      const supabase = createClient();
      if (!supabase) return; // base non configurée : on garde e-mail et WhatsApp
      await supabase.from('quote_requests').insert({
        name: form.name.trim(),
        phone: `${site.countryCode} ${form.phone.replace(/^\+?228\s*/, '').trim()}`,
        email: form.email.trim() || null,
        vehicle: form.vehicle.trim() || null,
        service: form.service || null,
        mode: form.mode || null,
        preferred_date: form.date || null,
        message: form.message.trim(),
        locale,
        status: 'nouvelle',
        source: 'site',
        consent: true,
      });
    } catch {
      // Base indisponible : on n'interrompt pas le visiteur.
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await saveToDatabase();

    const subject =
      locale === 'fr'
        ? `Demande de devis — ${form.service || 'Service'} — ${form.name}`
        : `Quote request — ${form.service || 'Service'} — ${form.name}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildSummary())}`;
    setSent(true);
  };

  const handleWhatsapp = async () => {
    if (!validate()) return;
    await saveToDatabase();
    const header =
      locale === 'fr'
        ? 'Bonjour KEYPRO Service Center, voici ma demande :'
        : 'Hello KEYPRO Service Center, here is my request:';
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`${header}\n\n${buildSummary()}`)}`,
      '_blank'
    );
    setSent(true);
  };

  const infos = [
    {
      Icon: IconPhone,
      label: t.common.phone,
      values: site.phones.map(displayPhone),
      hrefs: site.phones.map(telHref),
    },
    { Icon: IconMail, label: t.common.email, values: [site.email], hrefs: [`mailto:${site.email}`] },
    { Icon: IconPin, label: t.common.address, values: [site.address.full[locale]], hrefs: [] },
  ];

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumb={t.nav.contact}
        image={images.bannerContact}
      />

      <section className="section bg-navy-50/60">
        <div className="container-x grid gap-8 lg:grid-cols-[1.45fr,1fr]">
          {/* ——— Formulaire ——— */}
          <Rise>
            <div className="rounded-2xl bg-white p-8 shadow-soft ring-1 ring-navy-100 sm:p-11">
              <p className="eyebrow eyebrow-start">
                {locale === 'fr' ? 'Réponse rapide' : 'Fast reply'}
              </p>
              <SplitText text={c.formTitle} as="h2" className="mt-4 text-h2" />

              {sent && (
                <div
                  role="status"
                  className="mt-7 flex items-start gap-3.5 rounded-xl border border-emerald-200 bg-emerald-50 p-5"
                >
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <p className="text-small font-bold text-emerald-800">{c.successTitle}</p>
                    <p className="mt-1 text-micro text-emerald-700">{c.successText}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="name">
                    {c.fields.name} <span className="text-brand">*</span>
                  </label>
                  <input id="name" className="field" value={form.name} onChange={update('name')} required />
                </div>

                <div>
                  <label className="label" htmlFor="phone">
                    {c.fields.phone} <span className="text-brand">*</span>
                  </label>
                  <div className="relative">
                    <span className="tnum pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-small font-semibold text-navy-400">
                      {site.countryCode}
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      className="field tnum pl-[4.25rem]"
                      placeholder="72 11 44 44"
                      value={form.phone}
                      onChange={update('phone')}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label" htmlFor="email">
                    {c.fields.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="field"
                    value={form.email}
                    onChange={update('email')}
                  />
                </div>

                <div>
                  <label className="label" htmlFor="vehicle">
                    {c.fields.vehicle}
                  </label>
                  <input
                    id="vehicle"
                    className="field"
                    placeholder="Toyota Corolla 2018"
                    value={form.vehicle}
                    onChange={update('vehicle')}
                  />
                </div>

                <div>
                  <label className="label" htmlFor="service">
                    {c.fields.service}
                  </label>
                  <select id="service" className="field" value={form.service} onChange={update('service')}>
                    <option value="">{c.servicePlaceholder}</option>
                    {t.services.items.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label" htmlFor="mode">
                    {c.fields.mode}
                  </label>
                  <select id="mode" className="field" value={form.mode} onChange={update('mode')}>
                    <option value="">—</option>
                    {c.modes.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="label" htmlFor="date">
                    {c.fields.date}
                  </label>
                  <input
                    id="date"
                    type="date"
                    className="field tnum"
                    value={form.date}
                    onChange={update('date')}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="label" htmlFor="message">
                    {c.fields.message} <span className="text-brand">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="field resize-none"
                    value={form.message}
                    onChange={update('message')}
                    required
                  />
                </div>

                <label className="flex items-start gap-3 text-small text-navy-600 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={toggleConsent}
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-navy-300 text-brand focus:ring-brand"
                  />
                  <span>
                    {c.consentLabel}{' '}
                    <Link
                      href="/politique-confidentialite"
                      target="_blank"
                      className="font-semibold text-brand underline underline-offset-2 hover:text-brand-700"
                    >
                      {c.consentLink}
                    </Link>
                  </span>
                </label>

                {error && (
                  <p className="rounded-xl bg-brand/10 px-4 py-3.5 text-small font-medium text-brand-700 sm:col-span-2">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 pt-1 sm:col-span-2">
                  <button type="submit" className="btn-primary">
                    {c.submit}
                    <IconArrow className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={handleWhatsapp} className="btn-wa">
                    <IconWhatsapp className="h-4 w-4" />
                    {c.orWhatsapp}
                  </button>
                </div>
              </form>
            </div>
          </Rise>

          {/* ——— Coordonnées ——— */}
          <div className="space-y-6">
            <Rise delay={100}>
              <div className="rounded-2xl bg-navy-950 p-9">
                <h2 className="title-underline text-h4 font-bold text-white">{c.infoTitle}</h2>

                <ul className="mt-7 space-y-7">
                  {infos.map(({ Icon, label, values, hrefs }) => (
                    <li key={label} className="flex gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-widest2 text-white/35">
                          {label}
                        </p>
                        <div className="tnum mt-1 space-y-0.5">
                          {values.map((v, i) =>
                            hrefs[i] ? (
                              <a
                                key={v}
                                href={hrefs[i]}
                                className="block break-words text-small font-semibold text-white transition-colors hover:text-brand-300"
                              >
                                {v}
                              </a>
                            ) : (
                              <p key={v} className="text-small font-semibold text-white">
                                {v}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>

            <Rise delay={170}>
              <div className="rounded-2xl bg-brand p-9 shadow-glow">
                <div className="flex items-center gap-3.5">
                  <IconClock className="h-6 w-6 text-white" />
                  <h2 className="text-h4 font-bold text-white">{t.common.openHours}</h2>
                </div>

                <ul className="mt-6 space-y-3.5 text-small">
                  {site.hours[locale].map(([day, time]) => (
                    <li
                      key={day}
                      className="flex items-baseline justify-between gap-3 border-b border-white/15 pb-3.5 last:border-0 last:pb-0"
                    >
                      <span className="text-white/80">{day}</span>
                      <span className="tnum font-bold text-white">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>

            <Rise delay={230}>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <IconWhatsapp className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-small font-bold text-navy-950">
                    {t.common.whatsapp}
                  </span>
                  <span className="tnum block text-micro text-navy-400">
                    {displayPhone(site.phones[0])}
                  </span>
                </span>
                <IconArrow className="ml-auto h-5 w-5 shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Rise>
          </div>
        </div>
      </section>

      {/* ——— Carte & localisation ——— */}
      <section className="section-sm bg-white">
        <div className="container-x">
          <Rise>
            <LocationMap />
          </Rise>
        </div>
      </section>
    </>
  );
}
