/**
 * Importe le contenu des fichiers lib/*.js vers la base Supabase.
 *
 *   npm run db:seed
 *
 * Rejouable sans danger : les lignes existantes sont mises à jour,
 * pas dupliquées. Nécessite SUPABASE_SERVICE_ROLE_KEY dans .env.local.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// ─────────── Environnement ───────────
if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(`
✗ Variables manquantes.

  Créez un fichier .env.local à la racine avec :

    NEXT_PUBLIC_SUPABASE_URL=...
    SUPABASE_SERVICE_ROLE_KEY=...

  La clé de service se trouve dans Supabase →
  Project Settings → API → service_role (« secret »).
`);
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });

// ─────────── Lecture des fichiers de contenu ───────────
const { dictionaries } = await import(pathToFileURL('./lib/dictionaries.js').href);
const { images } = await import(pathToFileURL('./lib/images.js').href);
const { site } = await import(pathToFileURL('./lib/site.js').href);

const fr = dictionaries.fr;
const en = dictionaries.en;

const ok = (label, error) => {
  if (error) {
    console.error(`✗ ${label} — ${error.message}`);
    process.exitCode = 1;
  } else {
    console.log(`✓ ${label}`);
  }
};

console.log('\nImport du contenu vers Supabase…\n');

// ─────────── Paramètres ───────────
{
  const { error } = await db.from('settings').upsert({
    id: true,
    business_name: site.name,
    email: site.email,
    country_code: site.countryCode,
    phones: site.phones,
    whatsapp: site.whatsapp,
    address: site.address,
    geo: site.geo,
    hours: site.hours,
    social: site.social,
    currency: site.currency,
  });
  ok('Paramètres généraux', error);
}

// ─────────── Zones desservies ───────────
{
  const { error } = await db
    .from('coverage_zones')
    .upsert(
      site.coverage.map((name, position) => ({ name, position })),
      { onConflict: 'name' }
    );
  ok(`Zones desservies (${site.coverage.length})`, error);
}

// ─────────── Textes de page ───────────
{
  // On aplatit les dictionnaires, en excluant les sections devenues des tables.
  const excluded = new Set([
    'services.items',
    'brands.groups',
    'home.process',
    'home.why',
    'home.testimonials',
    'gallery.captions',
    'chatbot.answers',
  ]);

  const rows = [];
  const walk = (o, e, path) => {
    for (const k of Object.keys(o)) {
      const p = path ? `${path}.${k}` : k;
      if (excluded.has(p)) continue;
      const v = o[k];
      const w = e ? e[k] : undefined;
      if (typeof v === 'string') {
        rows.push({ key: p, fr: v, en: typeof w === 'string' ? w : '' });
      } else if (Array.isArray(v)) {
        if (v.every((x) => typeof x === 'string')) {
          v.forEach((x, i) =>
            rows.push({ key: `${p}.${i}`, fr: x, en: (Array.isArray(w) && w[i]) || '' })
          );
        }
      } else if (v && typeof v === 'object') {
        walk(v, w || {}, p);
      }
    }
  };
  walk(fr, en, '');

  const { error } = await db.from('page_texts').upsert(rows, { onConflict: 'key' });
  ok(`Textes de page (${rows.length})`, error);
}

// ─────────── Services ───────────
{
  const rows = fr.services.items.map((s, i) => {
    const e = en.services.items[i] || {};
    const img = images.services[s.slug] || {};
    return {
      slug: s.slug,
      icon: s.icon,
      position: i,
      title_fr: s.title,
      title_en: e.title || s.title,
      short_fr: s.short || '',
      short_en: e.short || '',
      details_fr: s.details || [],
      details_en: e.details || [],
      image_url: img.src || null,
      image_alt_fr: img.alt?.fr || '',
      image_alt_en: img.alt?.en || '',
    };
  });
  const { error } = await db.from('services').upsert(rows, { onConflict: 'slug' });
  ok(`Services (${rows.length})`, error);
}

// ─────────── Marques par région ───────────
{
  await db.from('brands').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await db.from('brand_regions').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const regions = fr.brands.groups.map((g, i) => {
    const img = images.regions[i] || {};
    return {
      position: i,
      name_fr: g.region,
      name_en: en.brands.groups[i]?.region || g.region,
      image_url: img.src || null,
      image_alt_fr: img.alt?.fr || '',
      image_alt_en: img.alt?.en || '',
    };
  });

  const { data: inserted, error } = await db.from('brand_regions').insert(regions).select('id, position');
  ok(`Régions de marques (${regions.length})`, error);

  if (!error && inserted) {
    const byPosition = Object.fromEntries(inserted.map((r) => [r.position, r.id]));
    const brands = fr.brands.groups.flatMap((g, i) =>
      g.brands.map((name, position) => ({ region_id: byPosition[i], name, position }))
    );
    const { error: e2 } = await db.from('brands').insert(brands);
    ok(`Marques (${brands.length})`, e2);
  }
}

// ─────────── Étapes du processus ───────────
{
  await db.from('process_steps').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const rows = fr.home.process.map((s, i) => {
    const e = en.home.process[i] || {};
    const img = images.process[i] || {};
    return {
      position: i,
      title_fr: s.title,
      title_en: e.title || s.title,
      text_fr: s.text || '',
      text_en: e.text || '',
      image_url: img.src || null,
      image_alt_fr: img.alt?.fr || '',
      image_alt_en: img.alt?.en || '',
    };
  });
  const { error } = await db.from('process_steps').insert(rows);
  ok(`Étapes du processus (${rows.length})`, error);
}

// ─────────── Avantages ───────────
{
  await db.from('advantages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const icons = ['bolt', 'tools', 'globe', 'sparkle'];
  const rows = fr.home.why.map((s, i) => {
    const e = en.home.why[i] || {};
    const img = images.why[i] || {};
    return {
      position: i,
      icon: icons[i] || 'bolt',
      title_fr: s.title,
      title_en: e.title || s.title,
      text_fr: s.text || '',
      text_en: e.text || '',
      image_url: img.src || null,
      image_alt_fr: img.alt?.fr || '',
      image_alt_en: img.alt?.en || '',
    };
  });
  const { error } = await db.from('advantages').insert(rows);
  ok(`Avantages (${rows.length})`, error);
}

// ─────────── Témoignages ───────────
{
  await db.from('testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const rows = fr.home.testimonials.map((s, i) => {
    const e = en.home.testimonials[i] || {};
    return {
      position: i,
      author: s.name,
      role_fr: s.role || '',
      role_en: e.role || '',
      quote_fr: s.quote,
      quote_en: e.quote || s.quote,
    };
  });
  const { error } = await db.from('testimonials').insert(rows);
  ok(`Témoignages (${rows.length})`, error);
}

// ─────────── Galerie ───────────
{
  await db.from('gallery_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const rows = fr.gallery.captions.map((caption, i) => {
    const img = images.gallery[i % images.gallery.length];
    return {
      position: i,
      image_url: img.src,
      caption_fr: caption,
      caption_en: en.gallery.captions[i] || caption,
      credit: img.credit || null,
    };
  });
  const { error } = await db.from('gallery_items').insert(rows);
  ok(`Galerie (${rows.length})`, error);
}

// ─────────── Réponses du chatbot ───────────
{
  await db.from('chatbot_answers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const rows = fr.chatbot.answers.map((a, i) => {
    const e = en.chatbot.answers[i] || { keys: [], text: '' };
    return {
      position: i,
      keys_fr: a.keys,
      text_fr: a.text,
      keys_en: e.keys,
      text_en: e.text,
    };
  });
  const { error } = await db.from('chatbot_answers').insert(rows);
  ok(`Réponses du chatbot (${rows.length})`, error);
}

// ─────────── Visuels nommés ───────────
{
  const named = [
    'heroWorkshop', 'heroKey', 'bannerServices', 'bannerAbout', 'bannerBrands',
    'bannerGallery', 'bannerContact', 'cta', 'keyClose', 'handKey',
  ];
  const rows = named
    .filter((slot) => images[slot])
    .map((slot) => ({
      slot,
      image_url: images[slot].src,
      alt_fr: images[slot].alt?.fr || '',
      alt_en: images[slot].alt?.en || '',
      credit: images[slot].credit || null,
    }));

  images.about.forEach((m, i) =>
    rows.push({
      slot: `about.${i}`,
      image_url: m.src,
      alt_fr: m.alt?.fr || '',
      alt_en: m.alt?.en || '',
      credit: m.credit || null,
    })
  );

  const { error } = await db.from('media_slots').upsert(rows, { onConflict: 'slot' });
  ok(`Visuels nommés (${rows.length})`, error);
}

console.log(
  process.exitCode
    ? '\n✗ Import terminé avec des erreurs.\n'
    : '\n✓ Import terminé. Le tableau de bord peut maintenant piloter le contenu.\n'
);
