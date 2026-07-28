import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './supabase/config';
import { dictionaries } from './dictionaries';
import { site as siteFile } from './site';
import { images as imagesFile } from './images';

/**
 * Charge le contenu du site depuis la base et le remet dans la forme
 * attendue par les composants (dictionaries / site / images).
 *
 * Règle : si la base est vide, injoignable ou non configurée, on retombe
 * silencieusement sur les fichiers de lib/. Le site s'affiche toujours.
 */

const anonClient = () => {
  if (!isSupabaseConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
};

/** Reconstruit un objet imbriqué à partir de clés « a.b.c » */
function unflatten(rows, locale) {
  const out = {};
  for (const { key, fr, en } of rows) {
    const value = locale === 'en' ? en || fr : fr;
    const parts = key.split('.');
    let node = out;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      const suivantEstIndex = /^\d+$/.test(parts[i + 1]);
      if (node[p] === undefined) node[p] = suivantEstIndex ? [] : {};
      node = node[p];
    }
    node[parts.at(-1)] = value;
  }
  return out;
}

/** Fusion profonde : la base l'emporte, le fichier comble les trous */
function merge(base, override) {
  if (Array.isArray(override)) return override;
  if (override === null || override === undefined) return base;
  if (typeof override !== 'object') return override;

  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const k of Object.keys(override)) {
    out[k] =
      typeof override[k] === 'object' && override[k] !== null && !Array.isArray(override[k])
        ? merge(out[k] ?? {}, override[k])
        : override[k];
  }
  return out;
}

const FALLBACK = {
  dictionaries,
  site: siteFile,
  images: imagesFile,
  source: 'fichiers',
};

export async function loadContent() {
  const db = anonClient();
  if (!db) return FALLBACK;

  try {
    const [settings, zones, textes, services, regions, marques, etapes, avantages, temoignages, galerie, chatbot, medias] =
      await Promise.all([
        db.from('settings').select('*').maybeSingle(),
        db.from('coverage_zones').select('name, position').order('position'),
        db.from('page_texts').select('key, fr, en'),
        db.from('services').select('*').eq('published', true).order('position'),
        db.from('brand_regions').select('*').eq('published', true).order('position'),
        db.from('brands').select('*').eq('published', true).order('position'),
        db.from('process_steps').select('*').eq('published', true).order('position'),
        db.from('advantages').select('*').eq('published', true).order('position'),
        db.from('testimonials').select('*').eq('published', true).order('position'),
        db.from('gallery_items').select('*').eq('published', true).order('position'),
        db.from('chatbot_answers').select('*').eq('published', true).order('position'),
        db.from('media_slots').select('*'),
      ]);

    // Base vide ou inaccessible → on garde les fichiers.
    if (!settings.data || !textes.data?.length) return FALLBACK;

    const s = settings.data;

    /* ─── site ─── */
    const siteDb = {
      ...siteFile,
      name: s.business_name,
      email: s.email,
      countryCode: s.country_code,
      phones: s.phones,
      whatsapp: s.whatsapp,
      address: merge(siteFile.address, s.address),
      geo: merge(siteFile.geo, s.geo),
      hours: merge(siteFile.hours, s.hours),
      social: merge(siteFile.social, s.social),
      currency: s.currency,
      coverage: zones.data?.length ? zones.data.map((z) => z.name) : siteFile.coverage,
    };

    /* ─── dictionnaires ─── */
    const build = (locale) => {
      const L = (o, champ) => o[`${champ}_${locale}`] || o[`${champ}_fr`];
      const plat = unflatten(textes.data, locale);

      const structure = {
        services: {
          items: services.data.map((x) => ({
            slug: x.slug,
            icon: x.icon,
            title: L(x, 'title'),
            short: L(x, 'short'),
            details: L(x, 'details') || [],
          })),
        },
        brands: {
          groups: regions.data.map((r) => ({
            region: L(r, 'name'),
            brands: marques.data.filter((m) => m.region_id === r.id).map((m) => m.name),
          })),
        },
        home: {
          process: etapes.data.map((x) => ({ title: L(x, 'title'), text: L(x, 'text') })),
          why: avantages.data.map((x) => ({ title: L(x, 'title'), text: L(x, 'text') })),
          testimonials: temoignages.data.map((x) => ({
            name: x.author,
            role: L(x, 'role'),
            quote: L(x, 'quote'),
          })),
        },
        gallery: { captions: galerie.data.map((x) => L(x, 'caption')) },
        chatbot: {
          answers: chatbot.data.map((x) => ({
            keys: x[`keys_${locale}`]?.length ? x[`keys_${locale}`] : x.keys_fr,
            text: L(x, 'text'),
          })),
        },
      };

      return merge(merge(dictionaries[locale], plat), structure);
    };

    /* ─── images ─── */
    const parSlot = Object.fromEntries((medias.data || []).map((m) => [m.slot, m]));
    const toImg = (m, secours) =>
      m ? { src: m.image_url, alt: { fr: m.alt_fr, en: m.alt_en }, credit: m.credit } : secours;

    const imagesDb = {
      ...imagesFile,
      heroWorkshop: toImg(parSlot.heroWorkshop, imagesFile.heroWorkshop),
      heroKey: toImg(parSlot.heroKey, imagesFile.heroKey),
      bannerServices: toImg(parSlot.bannerServices, imagesFile.bannerServices),
      bannerAbout: toImg(parSlot.bannerAbout, imagesFile.bannerAbout),
      bannerBrands: toImg(parSlot.bannerBrands, imagesFile.bannerBrands),
      bannerGallery: toImg(parSlot.bannerGallery, imagesFile.bannerGallery),
      bannerContact: toImg(parSlot.bannerContact, imagesFile.bannerContact),
      cta: toImg(parSlot.cta, imagesFile.cta),
      keyClose: toImg(parSlot.keyClose, imagesFile.keyClose),
      handKey: toImg(parSlot.handKey, imagesFile.handKey),
      about: imagesFile.about.map((f, i) => toImg(parSlot[`about.${i}`], f)),

      services: Object.fromEntries(
        services.data.map((x) => [
          x.slug,
          {
            src: x.image_url || imagesFile.services[x.slug]?.src,
            alt: { fr: x.image_alt_fr, en: x.image_alt_en },
          },
        ])
      ),
      regions: regions.data.map((r, i) => ({
        src: r.image_url || imagesFile.regions[i]?.src,
        alt: { fr: r.image_alt_fr, en: r.image_alt_en },
      })),
      process: etapes.data.map((x, i) => ({
        src: x.image_url || imagesFile.process[i]?.src,
        alt: { fr: x.image_alt_fr, en: x.image_alt_en },
      })),
      why: avantages.data.map((x, i) => ({
        src: x.image_url || imagesFile.why[i]?.src,
        alt: { fr: x.image_alt_fr, en: x.image_alt_en },
      })),
      gallery: galerie.data.map((x) => ({ src: x.image_url, credit: x.credit })),
    };

    return {
      dictionaries: { fr: build('fr'), en: build('en') },
      site: siteDb,
      images: imagesDb,
      source: 'base',
    };
  } catch {
    return FALLBACK;
  }
}
