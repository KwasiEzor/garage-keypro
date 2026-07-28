// Configuration centrale du site — modifiez ici les infos de l'entreprise.
export const site = {
  name: 'KEYPRO SERVICE CENTER',
  shortName: 'KSC',
  legalName: 'KEYPRO SERVICE CENTER',

  tagline: {
    fr: 'Clés auto • Programmation • Diagnostic • Assistance mobile',
    en: 'Car keys • Programming • Diagnostics • Mobile assistance',
  },

  email: 'garagelaredemption@gmail.com',

  // Indicatif pays Togo
  countryCode: '+228',
  // Numéros locaux (affichés tels quels)
  phones: ['72 11 44 44', '98 48 88 44', '22 46 66 26'],
  // Numéro WhatsApp au format international sans « + »
  whatsapp: '22872114444',

  address: {
    street: 'Agoè-Nyivé',
    city: 'Lomé',
    region: 'Golfe / Agoè-Nyivé',
    country: { fr: 'Togo', en: 'Togo' },
    full: {
      fr: 'Agoè-Nyivé, Lomé — Togo',
      en: 'Agoè-Nyivé, Lomé — Togo',
    },
    short: { fr: 'Lomé, Togo', en: 'Lomé, Togo' },
  },

  // Coordonnées GPS du marqueur sur la carte.
  // ⚠️ Position approximative d'Agoè-Nyivé — remplacez par les coordonnées
  // exactes de l'atelier (clic droit sur Google Maps → « Plus d'infos sur cet endroit »).
  geo: {
    lat: 6.2094,
    lng: 1.2069,
    zoom: 14,
  },

  hours: {
    fr: [
      ['Lundi – Vendredi', '08h00 – 19h00'],
      ['Samedi', '08h00 – 19h00'],
      ['Dimanche', 'Urgences uniquement'],
    ],
    en: [
      ['Monday – Friday', '8:00 AM – 7:00 PM'],
      ['Saturday', '8:00 AM – 7:00 PM'],
      ['Sunday', 'Emergencies only'],
    ],
  },

  // Zones desservies en intervention mobile (Grand Lomé)
  coverage: [
    'Agoè-Nyivé',
    'Adidogomé',
    'Bè',
    'Akodésséwa',
    'Hédzranawoé',
    'Tokoin',
    'Nyékonakpoè',
    'Baguida',
    'Avépozo',
    'Kégué',
    'Totsi',
    'Djidjolé',
  ],

  currency: 'FCFA',
  timezone: 'Africa/Lome',

  social: {
    facebook: '#',
    instagram: '#',
    twitter: '#',
    linkedin: '#',
    youtube: '#',
  },
};

/** Numéro compact pour les liens, ex. « 72 11 44 44 » → « +22872114444 » */
export const intlPhone = (phone) =>
  `${site.countryCode}${phone.replace(/\s/g, '')}`;

/** Numéro affiché à l'écran, ex. « 72 11 44 44 » → « +228 72 11 44 44 » */
export const displayPhone = (phone) => `${site.countryCode} ${phone}`;

/** Tous les numéros affichés, indicatif en préfixe unique */
export const displayPhones = (separator = ' / ') =>
  `${site.countryCode} ${site.phones.join(separator)}`;

export const telHref = (phone) => `tel:${intlPhone(phone)}`;

/** Lien Google Maps vers l'atelier */
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`;

/** Lien d'itinéraire depuis la position de l'utilisateur */
export const directionsHref = (from) =>
  from
    ? `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lng}&destination=${site.geo.lat},${site.geo.lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`;
