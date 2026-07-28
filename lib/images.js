// Banque d'images libres (Unsplash — licence gratuite, usage commercial autorisé).
// Pour utiliser vos propres photos : placez-les dans public/photos/ et remplacez
// la valeur `src` par un chemin local, ex. '/photos/atelier-1.jpg'.

const U = (id, { w = 1600, q = 78 } = {}) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  // — Héros et bandeaux —
  heroWorkshop: {
    src: U('photo-1632733711679-529326f6db12', { w: 2000 }),
    alt: { fr: 'Technicien intervenant sur le moteur d’un véhicule', en: 'Technician working on a car engine' },
    credit: 'Maxim Hopman / Unsplash',
  },
  heroKey: {
    src: U('photo-1533558701576-23c65e0272fb', { w: 1200 }),
    alt: { fr: 'Clé intelligente Mercedes-Benz tenue en main', en: 'Mercedes-Benz smart key held in hand' },
    credit: 'Roland Denes / Unsplash',
  },
  bannerServices: {
    src: U('photo-1643700973089-baa86a1ab9ee', { w: 2000 }),
    alt: { fr: 'Mécanicien au travail dans un atelier', en: 'Mechanic working in a workshop' },
    credit: 'Jimmy Nilsson Masth / Unsplash',
  },
  bannerAbout: {
    src: U('photo-1517524206127-48bbd363f3d7', { w: 2000 }),
    alt: { fr: 'Technicien portant une pièce moteur', en: 'Technician carrying an engine part' },
    credit: 'Aaron Huber / Unsplash',
  },
  bannerBrands: {
    src: U('photo-1596986952526-3be237187071', { w: 2000 }),
    alt: { fr: 'Véhicule noir dans un garage', en: 'Black car in a garage' },
    credit: 'Laurel and Michael Evans / Unsplash',
  },
  bannerGallery: {
    src: U('photo-1637640125496-31852f042a60', { w: 2000 }),
    alt: { fr: 'Caisse à outils de mécanicien', en: 'Mechanic tool box' },
    credit: 'Isabela Kronemberger / Unsplash',
  },
  bannerContact: {
    src: U('photo-1487754180451-c456f719a1fc', { w: 2000 }),
    alt: { fr: 'Entretien du compartiment moteur', en: 'Engine bay maintenance' },
    credit: 'Tim Mossholder / Unsplash',
  },
  cta: {
    src: U('photo-1486262715619-67b85e0b08d3', { w: 2000 }),
    alt: { fr: 'Gros plan sur un moteur', en: 'Close-up of an engine' },
    credit: 'Chad Kirchoff / Unsplash',
  },

  // — Services (même ordre que dictionaries.services.items) —
  services: {
    'cles-auto': {
      src: U('photo-1710006548781-eff5670376fa', { w: 1000 }),
      alt: { fr: 'Clé de voiture avec télécommande intégrée', en: 'Car key with built-in remote' },
      credit: 'Barry A / Unsplash',
    },
    'smart-keys': {
      src: U('photo-1562003596-a5827707367d', { w: 1000 }),
      alt: { fr: 'Clé intelligente noire', en: 'Black smart key fob' },
      credit: 'Bence Balla-Schottner / Unsplash',
    },
    telecommandes: {
      src: U('photo-1562343750-446a1e7693b6', { w: 1000 }),
      alt: { fr: 'Télécommande de véhicule sur fond noir', en: 'Vehicle remote on black background' },
      credit: 'Syed Hussaini / Unsplash',
    },
    diagnostic: {
      src: U('photo-1498887960847-2a5e46312788', { w: 1000 }),
      alt: { fr: 'Tableau de bord et compteur de véhicule', en: 'Vehicle dashboard and gauge' },
      credit: 'CHUTTERSNAP / Unsplash',
    },
    programmation: {
      src: U('photo-1517026575980-3e1e2dedeab4', { w: 1000 }),
      alt: { fr: 'Compte-tours d’un véhicule', en: 'Vehicle tachometer' },
      credit: 'Chris Liverani / Unsplash',
    },
    'assistance-mobile': {
      src: U('photo-1645445522156-9ac06bc7a767', { w: 1000 }),
      alt: { fr: 'Intervention sur une roue en atelier', en: 'Wheel service in a workshop' },
      credit: 'Jimmy Nilsson Masth / Unsplash',
    },
  },

  // — Collage « À propos » —
  about: [
    {
      src: U('photo-1643700973089-baa86a1ab9ee', { w: 900 }),
      alt: { fr: 'Mécanicien au travail', en: 'Mechanic at work' },
      credit: 'Jimmy Nilsson Masth / Unsplash',
    },
    {
      src: U('photo-1671719367451-7bf05ae9549c', { w: 900 }),
      alt: { fr: 'Remise de clé devant un véhicule', en: 'Handing over a car key' },
      credit: 'Swansway Motor Group / Unsplash',
    },
    {
      src: U('photo-1637640125496-31852f042a60', { w: 900 }),
      alt: { fr: 'Outils de mécanique', en: 'Mechanic tools' },
      credit: 'Isabela Kronemberger / Unsplash',
    },
    {
      src: U('photo-1487754180451-c456f719a1fc', { w: 900 }),
      alt: { fr: 'Entretien moteur', en: 'Engine maintenance' },
      credit: 'Tim Mossholder / Unsplash',
    },
  ],

  // — Galerie (6 visuels) —
  gallery: [
    { src: U('photo-1632733711679-529326f6db12', { w: 1200 }), credit: 'Maxim Hopman / Unsplash' },
    { src: U('photo-1710006548781-eff5670376fa', { w: 1200 }), credit: 'Barry A / Unsplash' },
    { src: U('photo-1645445522156-9ac06bc7a767', { w: 1200 }), credit: 'Jimmy Nilsson Masth / Unsplash' },
    { src: U('photo-1637640125496-31852f042a60', { w: 1200 }), credit: 'Isabela Kronemberger / Unsplash' },
    { src: U('photo-1562343750-446a1e7693b6', { w: 1200 }), credit: 'Syed Hussaini / Unsplash' },
    { src: U('photo-1596986952526-3be237187071', { w: 1200 }), credit: 'Laurel and Michael Evans / Unsplash' },
  ],

  // ─────────────────────────────────────────────────────────
  //  Véhicules nouvelle génération — habitacles, écrans, volants
  // ─────────────────────────────────────────────────────────

  /** Étapes de « Comment nous travaillons » — même ordre que home.process */
  process: [
    {
      src: U('photo-1553260485-b073c3515d92', { w: 1100 }),
      alt: {
        fr: 'Écran tactile allumé dans un véhicule moderne',
        en: 'Lit touchscreen in a modern vehicle',
      },
      credit: 'Bram Van Oost / Unsplash',
    },
    {
      src: U('photo-1676288176918-232f7caadfee', { w: 1100 }),
      alt: {
        fr: 'Tableau de bord avec navigation embarquée',
        en: 'Dashboard with built-in navigation',
      },
      credit: 'Patrick Langwallner / Unsplash',
    },
    {
      src: U('photo-1632733711679-529326f6db12', { w: 1100 }),
      alt: {
        fr: 'Technicien intervenant sur le moteur',
        en: 'Technician working on an engine',
      },
      credit: 'Maxim Hopman / Unsplash',
    },
    {
      src: U('photo-1671719367451-7bf05ae9549c', { w: 1100 }),
      alt: {
        fr: 'Remise de la clé devant le véhicule',
        en: 'Handing the key over in front of the vehicle',
      },
      credit: 'Swansway Motor Group / Unsplash',
    },
  ],

  /**
   * Un visuel par région — l'ordre suit brands.groups du dictionnaire
   * (japonaises, européennes, américaines, chinoises). Tableau indexé
   * volontairement : les noms de région changent selon la langue.
   */
  regions: [
    {
      src: U('photo-1555550252-fc3187f10240', { w: 1000 }),
      alt: { fr: 'Véhicule récent en concession', en: 'Recent vehicle in a showroom' },
      credit: 'Darren Halstead / Unsplash',
    },
    {
      src: U('photo-1533630217389-3a5e4dff5683', { w: 1000 }),
      alt: { fr: 'Volant multifonction d’un véhicule européen', en: 'Multifunction steering wheel' },
      credit: 'Arteum.ro / Unsplash',
    },
    {
      src: U('photo-1566274360936-69fae8dc1d95', { w: 1000 }),
      alt: { fr: 'Coupé noir contemporain', en: 'Contemporary black coupé' },
      credit: 'Nathan Trampe / Unsplash',
    },
    {
      src: U('photo-1760435108470-2205eb8f733f', { w: 1000 }),
      alt: {
        fr: 'Habitacle moderne avec écran de navigation',
        en: 'Modern cabin with navigation screen',
      },
      credit: 'Ansis Kančs / Unsplash',
    },
  ],

  /** Grille « Nos avantages » — même ordre que home.why */
  why: [
    {
      src: U('photo-1485463611174-f302f6a5c1c9', { w: 1600 }),
      alt: {
        fr: 'Traînées lumineuses d’un véhicule en mouvement de nuit',
        en: 'Light trails from a moving vehicle at night',
      },
      credit: 'Samuele Errico Piccarini / Unsplash',
    },
    {
      src: U('photo-1652509059638-1784b02c40b4', { w: 1000 }),
      alt: { fr: 'Écran de diagnostic embarqué', en: 'On-board diagnostic screen' },
      credit: 'Ivan Kazlouskij / Unsplash',
    },
    {
      src: U('photo-1625690180114-5530b1304127', { w: 1000 }),
      alt: { fr: 'Habitacle haut de gamme', en: 'Premium cabin interior' },
      credit: 'Benjamin Zhao / Unsplash',
    },
    {
      src: U('photo-1541968047768-c92c393e0e79', { w: 1000 }),
      alt: { fr: 'Combiné d’instruments numérique', en: 'Digital instrument cluster' },
      credit: 'Julian Hochgesang / Unsplash',
    },
  ],

  // — Divers —
  keyClose: {
    src: U('photo-1602529079830-c217d8f2eda5', { w: 1200 }),
    alt: { fr: 'Clé posée sur la carrosserie d’un véhicule noir', en: 'Key resting on a black car body' },
    credit: 'Ivan Shemereko / Unsplash',
  },
  handKey: {
    src: U('photo-1653565217811-85b41bcd1edb', { w: 1200 }),
    alt: { fr: 'Clé de voiture tenue en main', en: 'Car key held in hand' },
    credit: 'Ivan Kazlouskij / Unsplash',
  },
};

export const alt = (img, locale) =>
  typeof img?.alt === 'object' ? img.alt[locale] || img.alt.fr : img?.alt || '';
