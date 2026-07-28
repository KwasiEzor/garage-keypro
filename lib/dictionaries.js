// Toutes les traductions du site. Ajoutez une langue en dupliquant un bloc.
export const dictionaries = {
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      about: 'À propos',
      brands: 'Marques',
      gallery: 'Galerie',
      contact: 'Contact',
      quote: 'Demander un devis',
    },
    common: {
      readMore: 'En savoir plus',
      seeAll: 'Voir tout',
      callUs: 'Appelez-nous',
      emailUs: 'Écrivez-nous',
      openHours: 'Horaires',
      ourServices: 'Nos services',
      getQuote: 'Devis gratuit',
      bookNow: 'Prendre rendez-vous',
      whatsapp: 'Discuter sur WhatsApp',
      phone: 'Téléphone',
      email: 'E-mail',
      address: 'Adresse',
      backHome: "Retour à l'accueil",
    },
    home: {
      heroEyebrow: 'Lomé · Togo — Spécialiste clés auto & électronique',
      heroTitleTop: 'Technicien',
      heroTitleMain: 'AUTOMOBILE',
      heroSubtitle:
        "Reproduction et programmation de clés, diagnostic électronique et assistance mobile. Toutes marques, intervention rapide partout dans le Grand Lomé.",
      heroBadges: ['Auto scanner', 'Programmeur', 'Conseiller technique'],
      statsTitle: 'KEYPRO en chiffres',
      stats: [
        { value: '2 000+', label: 'Véhicules pris en charge' },
        { value: '4', label: 'Origines de marques couvertes' },
        { value: '30 min', label: "Délai moyen d'intervention" },
        { value: '7j/7', label: 'Assistance urgence' },
      ],
      servicesEyebrow: 'Ce que nous faisons',
      servicesTitle: 'Des solutions complètes pour vos clés et votre électronique',
      servicesIntro:
        "Clé perdue, télécommande hors service, voyant moteur allumé ? KEYPRO SERVICE CENTER intervient en atelier comme à domicile.",
      aboutEyebrow: 'À propos de KEYPRO',
      aboutTitle: 'Expertise technique, rapidité et transparence',
      aboutText:
        "KEYPRO SERVICE CENTER est un centre technique spécialisé dans les clés automobiles et l'électronique embarquée. Nous combinons des outils de diagnostic modernes et une équipe formée aux systèmes des constructeurs japonais, européens, américains et chinois.",
      aboutPoints: [
        'Diagnostic électronique complet',
        'Programmation et codage véhicule',
        'Intervention mobile sur site',
      ],
      processEyebrow: 'Notre méthode',
      processTitle: 'Comment nous travaillons',
      process: [
        {
          title: 'Identifier le problème',
          text: "Vous nous décrivez la panne par téléphone ou WhatsApp, nous qualifions le besoin.",
        },
        {
          title: 'Proposer une solution',
          text: "Nous vous annonçons la démarche, le délai et le tarif avant toute intervention.",
        },
        {
          title: 'Intervenir',
          text: "En atelier ou sur site, avec le matériel de diagnostic et de programmation adapté.",
        },
        {
          title: 'Livrer et garantir',
          text: "Test complet devant vous, conseils d'entretien et suivi après intervention.",
        },
      ],
      brandsEyebrow: 'Spécialiste en toutes marques',
      brandsTitle: 'Japonaises, chinoises, américaines, européennes',
      whyEyebrow: 'Pourquoi KEYPRO',
      whyTitle: 'Nos avantages',
      why: [
        {
          title: 'Intervention rapide',
          text: "Nous nous déplaçons là où vous êtes, sans remorquage inutile.",
        },
        {
          title: 'Expertise spécialisée',
          text: 'Clés intelligentes, immobiliseurs, calculateurs : notre cœur de métier.',
        },
        {
          title: 'Toutes marques',
          text: 'Compatible avec la majorité des véhicules modernes.',
        },
        {
          title: 'Digital et IA',
          text: 'Chatbot, prise de rendez-vous et notifications en temps réel.',
        },
      ],
      testimonialsEyebrow: 'Témoignages',
      testimonialsTitle: 'Ce que disent nos clients',
      testimonials: [
        {
          quote:
            "J'avais perdu l'unique clé de mon Toyota. L'équipe est venue jusqu'au parking à Agoè, a fabriqué et programmé une nouvelle clé en moins d'une heure.",
          name: 'Kossi A.',
          role: 'Agoè-Nyivé · Toyota RAV4',
        },
        {
          quote:
            "Voyant moteur allumé depuis des semaines et deux garages incapables de trouver. Diagnostic clair chez KEYPRO, réparé le jour même.",
          name: 'Afiwa D.',
          role: 'Tokoin · Hyundai Tucson',
        },
        {
          quote:
            "Ils gèrent la flotte de notre société sur tout le Grand Lomé : doubles de clés, diagnostics périodiques. Sérieux et réactifs.",
          name: 'Komlan M.',
          role: 'Lomé · Responsable logistique',
        },
      ],
      ctaTitle: "Besoin d'une clé, d'un diagnostic ou d'une intervention rapide ?",
      ctaText:
        'Appelez-nous ou envoyez un message WhatsApp. Nous répondons en quelques minutes.',

      // Section épinglée « clé perdue »
      showcase: {
        eyebrow: 'Clé perdue ?',
        lead: 'Pas de remorquage.',
        title: 'Nous venons à vous.',
        text:
          "Une clé perdue n'immobilise plus votre véhicule. Notre unité mobile se déplace avec le matériel complet de fabrication et de programmation, où que vous soyez dans le Grand Lomé.",
        steps: [
          {
            k: '01',
            title: 'Vous appelez',
            text: 'Marque, modèle, année et votre position. Une minute suffit.',
          },
          {
            k: '02',
            title: 'Nous arrivons',
            text: 'Unité mobile équipée, en moyenne sous 30 minutes dans Lomé.',
          },
          {
            k: '03',
            title: 'Vous repartez',
            text: 'Clé fabriquée, programmée et testée devant vous.',
          },
        ],
      },

      // Bandeau des zones desservies
      coverage: {
        eyebrow: 'Intervention mobile',
        title: 'Partout dans le Grand Lomé',
        text:
          "Notre atelier est à Agoè-Nyivé, mais notre unité mobile couvre l'ensemble de l'agglomération.",
      },
    },
    services: {
      eyebrow: 'Nos prestations',
      title: 'Services KEYPRO Service Center',
      intro:
        "Du double de clé au codage de calculateur, nous couvrons l'ensemble des problématiques liées aux clés et à l'électronique de votre véhicule.",
      items: [
        {
          slug: 'cles-auto',
          icon: 'key',
          title: 'Clés auto — duplication & programmation',
          short: 'Double de clé, clé perdue, clé cassée : fabrication et programmation sur place.',
          details: [
            'Fabrication de clé sur véhicule sans clé d’origine',
            'Duplication de clé mécanique et à transpondeur',
            'Programmation à l’immobiliseur du véhicule',
            'Effacement des clés perdues ou volées',
          ],
        },
        {
          slug: 'smart-keys',
          icon: 'chip',
          title: 'Smart keys (clés intelligentes)',
          short: 'Clés mains libres, démarrage sans clé, boîtiers Keyless.',
          details: [
            'Programmation de smart key neuve ou d’occasion',
            'Réparation de boîtier Keyless Go',
            'Remplacement de pile et de coque',
            'Diagnostic des problèmes de détection',
          ],
        },
        {
          slug: 'telecommandes',
          icon: 'remote',
          title: 'Télécommandes',
          short: 'Réparation, appairage et remplacement de télécommandes centralisées.',
          details: [
            'Appairage de télécommande neuve',
            'Réparation de circuit imprimé et de boutons',
            'Changement de coque et de lame',
            'Test de portée et de fréquence',
          ],
        },
        {
          slug: 'diagnostic',
          icon: 'scanner',
          title: 'Diagnostic électronique',
          short: 'Lecture des codes défaut, analyse des capteurs et des calculateurs.',
          details: [
            'Lecture et effacement des codes défaut (OBD)',
            'Analyse des données en temps réel',
            'Contrôle des capteurs et actionneurs',
            'Rapport de diagnostic expliqué',
          ],
        },
        {
          slug: 'programmation',
          icon: 'code',
          title: 'Codage et programmation véhicule',
          short: 'Reprogrammation de calculateurs, codage de composants, mises à jour.',
          details: [
            'Codage de calculateur après remplacement',
            'Activation de fonctions constructeur',
            'Reprogrammation de modules (BCM, ECU, ABS)',
            'Mise à jour logicielle véhicule',
          ],
        },
        {
          slug: 'assistance-mobile',
          icon: 'truck',
          title: 'Assistance automobile mobile',
          short: 'Nous venons à vous : domicile, bureau, parking, bord de route.',
          details: [
            'Déplacement avec matériel complet',
            'Ouverture de véhicule sans dommage',
            'Dépannage électrique et batterie',
            'Intervention d’urgence',
          ],
        },
      ],
      ctaTitle: 'Un besoin particulier ?',
      ctaText: 'Décrivez votre situation, nous vous répondons avec un devis clair.',
    },
    about: {
      eyebrow: 'Qui sommes-nous',
      title: 'Un centre technique dédié aux clés et à l’électronique auto',
      intro:
        "KEYPRO SERVICE CENTER accompagne les particuliers, les entreprises et les gestionnaires de flotte avec des solutions rapides, fiables et accessibles.",
      missionTitle: 'Notre mission',
      missionText:
        "Fournir des solutions rapides, fiables et accessibles pour tous les problèmes liés aux clés automobiles et aux systèmes électroniques des véhicules.",
      visionTitle: 'Notre vision',
      visionText:
        "Devenir une référence locale en services automobiles modernes, assistance technique mobile et solutions intelligentes intégrant l'IA et la digitalisation.",
      valuesTitle: 'Nos valeurs',
      values: [
        { title: 'Expertise technique', text: 'Une équipe formée en continu aux systèmes récents.' },
        { title: "Rapidité d'intervention", text: 'Un délai annoncé et respecté.' },
        { title: 'Fiabilité et transparence', text: 'Un tarif communiqué avant toute intervention.' },
        { title: 'Innovation', text: 'IA, digital et automatisation au service du client.' },
        { title: 'Service multi-marques', text: 'Japonaises, européennes, américaines, chinoises.' },
      ],
      innovationTitle: 'Innovation digitale',
      innovationText:
        'KEYPRO intègre des outils modernes pour simplifier votre expérience.',
      innovation: [
        'Chatbot intelligent pour les demandes clients',
        'Prise de rendez-vous automatisée',
        'Notifications en temps réel',
        'Gestion digitale des interventions',
      ],
      coverageTitle: 'Notre couverture à Lomé',
      coverageText:
        'Atelier à Agoè-Nyivé et intervention mobile dans tout le Grand Lomé : Adidogomé, Bè, Tokoin, Hédzranawoé, Baguida, Avépozo et alentours. Au-delà de Lomé, contactez-nous pour vérifier la disponibilité.',
      coverageZones: 'Zones desservies',
    },
    brands: {
      eyebrow: 'Compatibilité',
      title: 'Spécialiste en toutes marques',
      intro:
        'Nos outils de diagnostic et de programmation couvrent la majorité des véhicules modernes, quelle que soit leur origine.',
      groups: [
        {
          region: 'Japonaises',
          brands: ['Toyota', 'Nissan', 'Honda', 'Mitsubishi', 'Suzuki', 'Mazda', 'Subaru', 'Isuzu'],
        },
        {
          region: 'Européennes',
          brands: ['Mercedes-Benz', 'BMW', 'Volkswagen', 'Audi', 'Peugeot', 'Renault', 'Citroën', 'Volvo'],
        },
        {
          region: 'Américaines',
          brands: ['Ford', 'Chevrolet', 'Jeep', 'Dodge', 'GMC', 'Cadillac', 'Chrysler', 'Tesla'],
        },
        {
          region: 'Chinoises',
          brands: ['Chery', 'Geely', 'Haval', 'BYD', 'Changan', 'JAC', 'Dongfeng', 'MG'],
        },
      ],
      note:
        "Votre marque n'est pas listée ? Contactez-nous : la compatibilité couvre bien plus de modèles.",
    },
    gallery: {
      eyebrow: 'En images',
      title: 'Notre atelier et nos interventions',
      intro: "Quelques aperçus de notre équipe au travail.",
      captions: [
        'Diagnostic électronique sur véhicule',
        'Programmation de clé à transpondeur',
        'Intervention mobile sur site',
        'Atelier — poste de diagnostic',
        'Réparation de télécommande',
        'Contrôle avant restitution',
      ],
      placeholderNote:
        'Images d’illustration libres de droits (Unsplash). Pour afficher vos propres photos, ajoutez-les dans public/photos/ et modifiez lib/images.js.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Demandez votre devis ou votre rendez-vous',
      intro:
        'Remplissez le formulaire ou appelez-nous directement. Réponse sous quelques minutes aux heures d’ouverture.',
      formTitle: 'Formulaire de demande',
      fields: {
        name: 'Nom complet',
        phone: 'Téléphone',
        email: 'E-mail (facultatif)',
        vehicle: 'Véhicule (marque, modèle, année)',
        service: 'Service souhaité',
        date: 'Date souhaitée',
        mode: 'Type d’intervention',
        message: 'Décrivez votre besoin',
      },
      modes: ['En atelier', 'À domicile / sur site', 'Urgence'],
      servicePlaceholder: 'Choisissez un service',
      submit: 'Envoyer la demande',
      submitting: 'Envoi en cours…',
      successTitle: 'Demande prête à être envoyée',
      successText:
        'Votre messagerie va s’ouvrir avec le récapitulatif. Vous pouvez aussi nous écrire directement sur WhatsApp.',
      errorRequired: 'Merci de remplir les champs obligatoires.',
      errorConsent: 'Merci d’accepter l’utilisation de vos données pour poursuivre.',
      consentLabel: 'J’accepte que KEYPRO SERVICE CENTER utilise mes données pour traiter cette demande.',
      consentLink: 'Politique de confidentialité',
      orWhatsapp: 'Ou envoyez la demande sur WhatsApp',
      infoTitle: 'Nos coordonnées',
      map: {
        eyebrow: 'Nous trouver',
        title: 'L’atelier à Agoè-Nyivé, Lomé',
        intro:
          'Autorisez la géolocalisation pour voir votre position, votre distance jusqu’à l’atelier et lancer l’itinéraire.',
        locate: 'Me localiser',
        locating: 'Localisation…',
        retry: 'Actualiser ma position',
        you: 'Vous êtes ici',
        here: 'KEYPRO Service Center',
        distance: 'Distance à vol d’oiseau',
        eta: 'Environ',
        directions: 'Itinéraire',
        openMaps: 'Ouvrir dans Google Maps',
        denied:
          'Géolocalisation refusée. Vous pouvez l’autoriser dans les réglages de votre navigateur.',
        unavailable: 'Position indisponible pour le moment.',
        unsupported: 'Votre navigateur ne prend pas en charge la géolocalisation.',
        loading: 'Chargement de la carte…',
        failed:
          'La carte n’a pas pu se charger. Ouvrez directement l’adresse dans Google Maps.',
        callFirst: 'Appelez avant de venir',
        mobileNote:
          'Vous n’êtes pas obligé de vous déplacer : nous intervenons aussi à domicile dans tout le Grand Lomé.',
      },
    },
    chatbot: {
      title: 'Assistant KEYPRO',
      subtitle: 'Réponse instantanée',
      placeholder: 'Posez votre question…',
      greeting:
        'Bonjour 👋 Je suis l’assistant KEYPRO. Comment puis-je vous aider aujourd’hui ?',
      suggestions: [
        'J’ai perdu ma clé de voiture',
        'Combien coûte un double de clé ?',
        'Vous déplacez-vous à domicile ?',
        'Quels sont vos horaires ?',
      ],
      fallback:
        "Je n'ai pas la réponse exacte. Le plus simple : appelez le +228 72 11 44 44 ou écrivez-nous sur WhatsApp, un technicien vous répond directement.",
      answers: [
        {
          keys: ['perdu', 'perdue', 'plus de clé', 'clé perdue'],
          text: "Pas de panique. Nous fabriquons une clé neuve même sans clé d'origine, sur place ou à domicile. Indiquez-nous la marque, le modèle et l'année du véhicule, ainsi que votre position.",
        },
        {
          keys: ['prix', 'coût', 'cout', 'tarif', 'combien'],
          text: "Le tarif dépend de la marque, du type de clé (mécanique, transpondeur, smart key) et du lieu d'intervention. Envoyez-nous la marque et le modèle : nous vous donnons un prix ferme avant toute intervention.",
        },
        {
          keys: ['domicile', 'déplace', 'deplace', 'mobile', 'sur site'],
          text: 'Oui, nous intervenons à domicile, au bureau, sur un parking ou au bord de la route, avec le matériel complet de diagnostic et de programmation.',
        },
        {
          keys: ['horaire', 'ouvert', 'heure', 'dimanche'],
          text: 'Nous sommes ouverts du lundi au samedi de 08h00 à 19h00. Le dimanche, nous assurons uniquement les urgences.',
        },
        {
          keys: ['diagnostic', 'voyant', 'panne', 'défaut', 'defaut'],
          text: "Nous réalisons un diagnostic électronique complet : lecture des codes défaut, analyse des capteurs et des calculateurs, avec un rapport expliqué. Passez à l'atelier ou demandez une intervention sur site.",
        },
        {
          keys: ['marque', 'compatible', 'toyota', 'mercedes', 'bmw', 'chinois'],
          text: 'Nous sommes spécialistes toutes marques : japonaises, européennes, américaines et chinoises. Donnez-nous la marque et le modèle pour confirmer la compatibilité.',
        },
        {
          keys: ['rendez-vous', 'rdv', 'réserver', 'reserver'],
          text: 'Vous pouvez réserver via la page Contact, par téléphone au +228 72 11 44 44 ou directement sur WhatsApp.',
        },
        {
          keys: ['télécommande', 'telecommande', 'bip', 'centralisé'],
          text: 'Nous réparons et appairons les télécommandes : circuit imprimé, boutons, coque, pile et test de portée.',
        },
      ],
      disclaimer: 'Assistant automatique — pour un devis ferme, contactez un technicien.',
    },
    footer: {
      about:
        'Centre technique spécialisé dans les clés automobiles, l’électronique embarquée et l’assistance mobile. Toutes marques.',
      explore: 'Navigation',
      services: 'Services',
      contact: 'Contact',
      hours: 'Horaires',
      rights: 'Tous droits réservés.',
      newsletterTitle: 'Recevez nos conseils entretien',
      newsletterPlaceholder: 'Votre e-mail',
      newsletterButton: 'S’inscrire',
      privacyPolicy: 'Politique de confidentialité',
      legalNotice: 'Mentions légales',
    },
    notFound: {
      title: 'Page introuvable',
      text: "La page que vous cherchez n'existe pas ou a été déplacée.",
    },
    cookies: {
      text: 'Ce site utilise uniquement des cookies fonctionnels (langue, session d’administration) — aucun traceur publicitaire ni de mesure d’audience.',
      linkLabel: 'En savoir plus',
      accept: 'J’ai compris',
    },
    privacy: {
      eyebrow: 'Vos données',
      title: 'Politique de confidentialité',
      intro:
        'Comment KEYPRO SERVICE CENTER collecte, utilise et protège vos données personnelles.',
      updated: 'Dernière mise à jour : 28 juillet 2026',
      sections: [
        {
          title: 'Responsable du traitement',
          text: 'KEYPRO SERVICE CENTER, atelier situé à Agoè-Nyivé, Lomé (Togo), joignable à garagelaredemption@gmail.com et au +228 72 11 44 44, est responsable du traitement des données décrites dans cette page.',
        },
        {
          title: 'Données que nous collectons',
          text: 'Selon votre usage du site :',
          items: [
            'Formulaire de devis : nom, téléphone, e-mail (facultatif), informations sur le véhicule, service souhaité, date souhaitée et message.',
            'Navigation : la langue choisie, mémorisée sur votre appareil.',
            'Connexion au tableau de bord (personnel autorisé uniquement) : un cookie de session technique.',
          ],
        },
        {
          title: 'Pourquoi nous les utilisons',
          text: 'Traiter votre demande de devis ou de rendez-vous, vous recontacter par téléphone, e-mail ou WhatsApp, assurer le suivi de vos interventions si vous devenez client, et améliorer nos services.',
        },
        {
          title: 'Base légale',
          text: 'Votre consentement, donné en cochant la case du formulaire de contact, et notre intérêt légitime à répondre à une demande que vous nous adressez vous-même.',
        },
        {
          title: 'Qui a accès à vos données',
          text: 'Seule l’équipe de KEYPRO SERVICE CENTER. Aucune donnée n’est vendue ni partagée à des fins commerciales. Nos prestataires techniques (hébergement du site, base de données Supabase) n’y accèdent que pour assurer le fonctionnement du service, sous contrat.',
        },
        {
          title: 'Durée de conservation',
          text: 'Les demandes de devis sans suite sont conservées 3 ans à compter du dernier échange. Les dossiers clients et l’historique des interventions sont conservés pendant la durée de la relation commerciale, augmentée des délais légaux de conservation comptable.',
        },
        {
          title: 'Cookies et traceurs',
          text: 'Le site n’utilise aucun cookie publicitaire ni traceur de mesure d’audience. Un cookie technique de session est déposé uniquement lorsqu’un membre de l’équipe se connecte au tableau de bord. Le choix de langue est mémorisé sur votre appareil, sans être transmis à un serveur.',
        },
        {
          title: 'Vos droits',
          text: 'Conformément à la loi togolaise n°2019-014 relative à la protection des données à caractère personnel — et, pour nos visiteurs de l’Union européenne, au Règlement général sur la protection des données — vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition sur vos données. Pour l’exercer, écrivez à garagelaredemption@gmail.com. Vous pouvez aussi saisir l’Instance de Protection des Données à Caractère Personnel (IPDCP) du Togo.',
        },
        {
          title: 'Sécurité',
          text: 'Vos données sont hébergées chez Supabase et protégées par des règles d’accès strictes : un visiteur ne peut jamais relire les demandes déposées par d’autres, et seules les personnes autorisées de l’atelier consultent le fichier client.',
        },
        {
          title: 'Modifications de cette politique',
          text: 'Cette politique peut évoluer ; la date de mise à jour figure en haut de page.',
        },
      ],
    },
    legal: {
      eyebrow: 'Informations',
      title: 'Mentions légales',
      intro: 'Informations légales relatives à l’éditeur et à l’hébergement de ce site.',
      sections: [
        {
          title: 'Éditeur du site',
          text: 'KEYPRO SERVICE CENTER — atelier de clés automobiles, programmation et diagnostic électronique. Agoè-Nyivé, Lomé, Togo.',
        },
        {
          title: 'Contact',
          text: 'garagelaredemption@gmail.com — +228 72 11 44 44 / 98 48 88 44 / 22 46 66 26',
        },
        {
          title: 'Directeur de la publication',
          text: 'La direction de KEYPRO SERVICE CENTER.',
        },
        {
          title: 'Hébergement',
          text: 'Ce site est hébergé par un prestataire d’hébergement web (Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis, ou Netlify, Inc., 512 2nd Street, San Francisco, CA 94107, États-Unis, selon la solution retenue). À mettre à jour avec l’hébergeur effectivement choisi avant la mise en ligne.',
        },
        {
          title: 'Base de données',
          text: 'Supabase Inc. — hébergement de la base de données et de l’authentification du tableau de bord.',
        },
        {
          title: 'Crédits',
          text: 'Photographies : Unsplash. Fond de carte : OpenStreetMap via Leaflet. Polices : Google Fonts.',
        },
        {
          title: 'Propriété intellectuelle',
          text: 'Le logo, les textes et les visuels originaux de ce site sont la propriété de KEYPRO SERVICE CENTER, sauf mention contraire.',
        },
      ],
    },
  },

  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      brands: 'Brands',
      gallery: 'Gallery',
      contact: 'Contact',
      quote: 'Get a quote',
    },
    common: {
      readMore: 'Learn more',
      seeAll: 'See all',
      callUs: 'Call us',
      emailUs: 'Email us',
      openHours: 'Opening hours',
      ourServices: 'Our services',
      getQuote: 'Free quote',
      bookNow: 'Book an appointment',
      whatsapp: 'Chat on WhatsApp',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      backHome: 'Back to home',
    },
    home: {
      heroEyebrow: 'Lomé · Togo — Car key & electronics specialist',
      heroTitleTop: 'Automotive',
      heroTitleMain: 'TECHNICIAN',
      heroSubtitle:
        'Key cutting and programming, electronic diagnostics and mobile assistance. All brands, fast on-site service across Greater Lomé.',
      heroBadges: ['Auto scanner', 'Programmer', 'Technical advisor'],
      statsTitle: 'KEYPRO in numbers',
      stats: [
        { value: '2,000+', label: 'Vehicles serviced' },
        { value: '4', label: 'Brand regions covered' },
        { value: '30 min', label: 'Average response time' },
        { value: '24/7', label: 'Emergency support' },
      ],
      servicesEyebrow: 'What we do',
      servicesTitle: 'Complete solutions for your keys and electronics',
      servicesIntro:
        'Lost key, dead remote, check engine light on? KEYPRO SERVICE CENTER works in the shop and at your location.',
      aboutEyebrow: 'About KEYPRO',
      aboutTitle: 'Technical expertise, speed and transparency',
      aboutText:
        'KEYPRO SERVICE CENTER is a technical centre specialised in car keys and on-board electronics. We combine modern diagnostic tools with a team trained on Japanese, European, American and Chinese manufacturer systems.',
      aboutPoints: [
        'Full electronic diagnostics',
        'Vehicle coding and programming',
        'Mobile on-site service',
      ],
      processEyebrow: 'Our method',
      processTitle: 'How we work',
      process: [
        {
          title: 'Identify the issue',
          text: 'You describe the problem by phone or WhatsApp, we qualify the need.',
        },
        {
          title: 'Propose a solution',
          text: 'We confirm the approach, the timeframe and the price before any work.',
        },
        {
          title: 'Carry out the work',
          text: 'In the shop or on site, with the right diagnostic and programming equipment.',
        },
        {
          title: 'Deliver and guarantee',
          text: 'Full test in front of you, maintenance advice and follow-up.',
        },
      ],
      brandsEyebrow: 'All-brand specialist',
      brandsTitle: 'Japanese, Chinese, American, European',
      whyEyebrow: 'Why KEYPRO',
      whyTitle: 'Our advantages',
      why: [
        { title: 'Fast response', text: 'We come to you — no unnecessary towing.' },
        {
          title: 'Specialised expertise',
          text: 'Smart keys, immobilisers, ECUs: this is our core business.',
        },
        { title: 'All brands', text: 'Compatible with most modern vehicles.' },
        { title: 'Digital and AI', text: 'Chatbot, booking and real-time notifications.' },
      ],
      testimonialsEyebrow: 'Testimonials',
      testimonialsTitle: 'What our clients say',
      testimonials: [
        {
          quote:
            'I lost the only key to my Toyota. The team came to the car park in Agoè, cut and programmed a new key in under an hour.',
          name: 'Kossi A.',
          role: 'Agoè-Nyivé · Toyota RAV4',
        },
        {
          quote:
            'Check engine light on for weeks and two garages could not find it. Clear diagnosis at KEYPRO, fixed the same day.',
          name: 'Afiwa D.',
          role: 'Tokoin · Hyundai Tucson',
        },
        {
          quote:
            'They manage our company fleet across Greater Lomé: spare keys, periodic diagnostics. Reliable and responsive.',
          name: 'Komlan M.',
          role: 'Lomé · Logistics manager',
        },
      ],
      ctaTitle: 'Need a key, a diagnosis or fast assistance?',
      ctaText: 'Call us or send a WhatsApp message. We reply within minutes.',

      showcase: {
        eyebrow: 'Lost your key?',
        lead: 'No towing.',
        title: 'We come to you.',
        text:
          'A lost key no longer immobilises your vehicle. Our mobile unit travels with full cutting and programming equipment, anywhere in Greater Lomé.',
        steps: [
          {
            k: '01',
            title: 'You call',
            text: 'Make, model, year and your location. One minute is enough.',
          },
          {
            k: '02',
            title: 'We arrive',
            text: 'Fully equipped mobile unit, typically within 30 minutes in Lomé.',
          },
          {
            k: '03',
            title: 'You drive off',
            text: 'Key cut, programmed and tested in front of you.',
          },
        ],
      },

      coverage: {
        eyebrow: 'Mobile service',
        title: 'Everywhere in Greater Lomé',
        text:
          'Our workshop is in Agoè-Nyivé, and our mobile unit covers the whole metropolitan area.',
      },
    },
    services: {
      eyebrow: 'Our work',
      title: 'KEYPRO Service Center services',
      intro:
        'From a spare key to ECU coding, we cover everything related to your vehicle keys and electronics.',
      items: [
        {
          slug: 'cles-auto',
          icon: 'key',
          title: 'Car keys — cutting & programming',
          short: 'Spare key, lost key, broken key: cut and programmed on the spot.',
          details: [
            'Key made on the vehicle with no original key',
            'Mechanical and transponder key duplication',
            'Programming to the vehicle immobiliser',
            'Erasing lost or stolen keys',
          ],
        },
        {
          slug: 'smart-keys',
          icon: 'chip',
          title: 'Smart keys',
          short: 'Hands-free keys, keyless start, Keyless modules.',
          details: [
            'New or used smart key programming',
            'Keyless Go module repair',
            'Battery and shell replacement',
            'Detection issue diagnostics',
          ],
        },
        {
          slug: 'telecommandes',
          icon: 'remote',
          title: 'Remote controls',
          short: 'Repair, pairing and replacement of central locking remotes.',
          details: [
            'New remote pairing',
            'Circuit board and button repair',
            'Shell and blade replacement',
            'Range and frequency testing',
          ],
        },
        {
          slug: 'diagnostic',
          icon: 'scanner',
          title: 'Electronic diagnostics',
          short: 'Fault code reading, sensor and ECU analysis.',
          details: [
            'OBD fault code reading and clearing',
            'Live data analysis',
            'Sensor and actuator testing',
            'Explained diagnostic report',
          ],
        },
        {
          slug: 'programmation',
          icon: 'code',
          title: 'Vehicle coding and programming',
          short: 'ECU reprogramming, component coding, software updates.',
          details: [
            'ECU coding after replacement',
            'Manufacturer feature activation',
            'Module reprogramming (BCM, ECU, ABS)',
            'Vehicle software updates',
          ],
        },
        {
          slug: 'assistance-mobile',
          icon: 'truck',
          title: 'Mobile car assistance',
          short: 'We come to you: home, office, car park, roadside.',
          details: [
            'Fully equipped mobile unit',
            'Damage-free vehicle opening',
            'Electrical and battery assistance',
            'Emergency call-out',
          ],
        },
      ],
      ctaTitle: 'Something specific?',
      ctaText: 'Describe your situation and we will reply with a clear quote.',
    },
    about: {
      eyebrow: 'Who we are',
      title: 'A technical centre dedicated to car keys and electronics',
      intro:
        'KEYPRO SERVICE CENTER supports individuals, businesses and fleet managers with fast, reliable and affordable solutions.',
      missionTitle: 'Our mission',
      missionText:
        'To provide fast, reliable and affordable solutions for every problem involving car keys and vehicle electronic systems.',
      visionTitle: 'Our vision',
      visionText:
        'To become a local reference in modern automotive services, mobile technical assistance and smart solutions built on AI and digital tools.',
      valuesTitle: 'Our values',
      values: [
        { title: 'Technical expertise', text: 'A team continuously trained on recent systems.' },
        { title: 'Fast response', text: 'A timeframe announced and respected.' },
        { title: 'Reliability and transparency', text: 'A price agreed before any work starts.' },
        { title: 'Innovation', text: 'AI, digital and automation serving the customer.' },
        { title: 'Multi-brand service', text: 'Japanese, European, American, Chinese.' },
      ],
      innovationTitle: 'Digital innovation',
      innovationText: 'KEYPRO uses modern tools to simplify your experience.',
      innovation: [
        'Smart chatbot for customer requests',
        'Automated appointment booking',
        'Real-time notifications',
        'Digital job management',
      ],
      coverageTitle: 'Our coverage in Lomé',
      coverageText:
        'Workshop in Agoè-Nyivé and mobile call-outs across Greater Lomé: Adidogomé, Bè, Tokoin, Hédzranawoé, Baguida, Avépozo and surrounding areas. Outside Lomé, contact us to check availability.',
      coverageZones: 'Areas served',
    },
    brands: {
      eyebrow: 'Compatibility',
      title: 'All-brand specialist',
      intro:
        'Our diagnostic and programming tools cover most modern vehicles, whatever their origin.',
      groups: [
        {
          region: 'Japanese',
          brands: ['Toyota', 'Nissan', 'Honda', 'Mitsubishi', 'Suzuki', 'Mazda', 'Subaru', 'Isuzu'],
        },
        {
          region: 'European',
          brands: ['Mercedes-Benz', 'BMW', 'Volkswagen', 'Audi', 'Peugeot', 'Renault', 'Citroën', 'Volvo'],
        },
        {
          region: 'American',
          brands: ['Ford', 'Chevrolet', 'Jeep', 'Dodge', 'GMC', 'Cadillac', 'Chrysler', 'Tesla'],
        },
        {
          region: 'Chinese',
          brands: ['Chery', 'Geely', 'Haval', 'BYD', 'Changan', 'JAC', 'Dongfeng', 'MG'],
        },
      ],
      note: 'Your brand is not listed? Contact us — compatibility covers many more models.',
    },
    gallery: {
      eyebrow: 'In pictures',
      title: 'Our workshop and our work',
      intro: 'A few glimpses of our team at work.',
      captions: [
        'Electronic diagnostics on a vehicle',
        'Transponder key programming',
        'Mobile on-site service',
        'Workshop — diagnostic bay',
        'Remote control repair',
        'Final check before handover',
      ],
      placeholderNote:
        'Royalty-free stock images (Unsplash). To show your own photos, add them to public/photos/ and edit lib/images.js.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Request your quote or appointment',
      intro:
        'Fill in the form or call us directly. We reply within minutes during opening hours.',
      formTitle: 'Request form',
      fields: {
        name: 'Full name',
        phone: 'Phone',
        email: 'Email (optional)',
        vehicle: 'Vehicle (make, model, year)',
        service: 'Service needed',
        date: 'Preferred date',
        mode: 'Service type',
        message: 'Describe your need',
      },
      modes: ['In the workshop', 'At home / on site', 'Emergency'],
      servicePlaceholder: 'Choose a service',
      submit: 'Send request',
      submitting: 'Sending…',
      successTitle: 'Request ready to send',
      successText:
        'Your email app will open with the summary. You can also message us directly on WhatsApp.',
      errorRequired: 'Please fill in the required fields.',
      errorConsent: 'Please accept the use of your data to continue.',
      consentLabel: 'I agree that KEYPRO SERVICE CENTER may use my data to process this request.',
      consentLink: 'Privacy policy',
      orWhatsapp: 'Or send the request on WhatsApp',
      infoTitle: 'Our details',
      map: {
        eyebrow: 'Find us',
        title: 'The workshop in Agoè-Nyivé, Lomé',
        intro:
          'Allow location access to see your position, your distance to the workshop and get directions.',
        locate: 'Locate me',
        locating: 'Locating…',
        retry: 'Refresh my position',
        you: 'You are here',
        here: 'KEYPRO Service Center',
        distance: 'Straight-line distance',
        eta: 'About',
        directions: 'Directions',
        openMaps: 'Open in Google Maps',
        denied: 'Location denied. You can allow it in your browser settings.',
        unavailable: 'Position unavailable right now.',
        unsupported: 'Your browser does not support geolocation.',
        loading: 'Loading map…',
        failed: 'The map could not load. Open the address directly in Google Maps.',
        callFirst: 'Call before coming',
        mobileNote:
          'You do not have to travel: we also come to you anywhere in Greater Lomé.',
      },
    },
    chatbot: {
      title: 'KEYPRO Assistant',
      subtitle: 'Instant reply',
      placeholder: 'Ask your question…',
      greeting: 'Hello 👋 I am the KEYPRO assistant. How can I help you today?',
      suggestions: [
        'I lost my car key',
        'How much is a spare key?',
        'Do you come to my location?',
        'What are your opening hours?',
      ],
      fallback:
        "I don't have the exact answer. The quickest way: call +228 72 11 44 44 or message us on WhatsApp and a technician will reply directly.",
      answers: [
        {
          keys: ['lost', 'no key', 'locked'],
          text: "No worries. We can make a new key even without the original, in the shop or at your location. Tell us the make, model and year, plus your position.",
        },
        {
          keys: ['price', 'cost', 'how much', 'quote'],
          text: 'The price depends on the brand, the key type (mechanical, transponder, smart key) and the location. Send us the make and model and we will give a firm price before any work.',
        },
        {
          keys: ['home', 'come to', 'mobile', 'on site', 'roadside'],
          text: 'Yes, we come to your home, office, a car park or the roadside with full diagnostic and programming equipment.',
        },
        {
          keys: ['hours', 'open', 'sunday', 'time'],
          text: 'We are open Monday to Saturday, 8:00 AM to 7:00 PM. On Sunday we handle emergencies only.',
        },
        {
          keys: ['diagnostic', 'engine light', 'fault', 'error'],
          text: 'We run full electronic diagnostics: fault code reading, sensor and ECU analysis, with an explained report. Come to the workshop or request an on-site visit.',
        },
        {
          keys: ['brand', 'compatible', 'toyota', 'mercedes', 'bmw', 'chinese'],
          text: 'We are an all-brand specialist: Japanese, European, American and Chinese. Give us the make and model to confirm compatibility.',
        },
        {
          keys: ['appointment', 'book', 'schedule'],
          text: 'You can book on the Contact page, by phone on +228 72 11 44 44, or directly on WhatsApp.',
        },
        {
          keys: ['remote', 'fob', 'central locking'],
          text: 'We repair and pair remotes: circuit board, buttons, shell, battery and range testing.',
        },
      ],
      disclaimer: 'Automated assistant — for a firm quote, contact a technician.',
    },
    footer: {
      about:
        'Technical centre specialised in car keys, on-board electronics and mobile assistance. All brands.',
      explore: 'Navigation',
      services: 'Services',
      contact: 'Contact',
      hours: 'Opening hours',
      rights: 'All rights reserved.',
      newsletterTitle: 'Get our maintenance tips',
      newsletterPlaceholder: 'Your email',
      newsletterButton: 'Subscribe',
      privacyPolicy: 'Privacy policy',
      legalNotice: 'Legal notice',
    },
    notFound: {
      title: 'Page not found',
      text: 'The page you are looking for does not exist or has been moved.',
    },
    cookies: {
      text: 'This site only uses functional cookies (language, admin session) — no advertising or analytics trackers.',
      linkLabel: 'Learn more',
      accept: 'Got it',
    },
    privacy: {
      eyebrow: 'Your data',
      title: 'Privacy policy',
      intro: 'How KEYPRO SERVICE CENTER collects, uses and protects your personal data.',
      updated: 'Last updated: 28 July 2026',
      sections: [
        {
          title: 'Data controller',
          text: 'KEYPRO SERVICE CENTER, a workshop located in Agoè-Nyivé, Lomé (Togo), reachable at garagelaredemption@gmail.com and +228 72 11 44 44, is responsible for the processing described on this page.',
        },
        {
          title: 'Data we collect',
          text: 'Depending on how you use the site:',
          items: [
            'Quote form: name, phone number, email (optional), vehicle details, service needed, preferred date and message.',
            'Browsing: your chosen language, stored on your device.',
            'Dashboard sign-in (authorised staff only): a technical session cookie.',
          ],
        },
        {
          title: 'Why we use it',
          text: 'To process your quote or appointment request, contact you back by phone, email or WhatsApp, follow up on your jobs if you become a customer, and improve our services.',
        },
        {
          title: 'Legal basis',
          text: 'Your consent, given by ticking the box on the contact form, and our legitimate interest in replying to a request you send us directly.',
        },
        {
          title: 'Who can access your data',
          text: 'Only the KEYPRO SERVICE CENTER team. We never sell or share data for commercial purposes. Our technical providers (website hosting, Supabase database) only access it to keep the service running, under contract.',
        },
        {
          title: 'How long we keep it',
          text: 'Quote requests that do not lead to a job are kept for 3 years from the last contact. Customer records and job history are kept for the duration of the business relationship, plus the legal accounting retention period.',
        },
        {
          title: 'Cookies and trackers',
          text: 'The site uses no advertising cookies and no analytics trackers. A technical session cookie is only set when a staff member signs in to the dashboard. Your language choice is stored on your device and never sent to a server.',
        },
        {
          title: 'Your rights',
          text: 'Under Togolese law n°2019-014 on the protection of personal data — and, for visitors from the European Union, the General Data Protection Regulation — you have the right to access, correct, erase, restrict and object to the use of your data. To exercise it, write to garagelaredemption@gmail.com. You may also contact Togo’s data protection authority (Instance de Protection des Données à Caractère Personnel, IPDCP).',
        },
        {
          title: 'Security',
          text: 'Your data is hosted on Supabase and protected by strict access rules: a visitor can never read requests submitted by others, and only authorised workshop staff can view the customer file.',
        },
        {
          title: 'Changes to this policy',
          text: 'This policy may change; the update date is shown at the top of the page.',
        },
      ],
    },
    legal: {
      eyebrow: 'Information',
      title: 'Legal notice',
      intro: 'Legal information about the publisher and hosting of this site.',
      sections: [
        {
          title: 'Site publisher',
          text: 'KEYPRO SERVICE CENTER — car key, programming and electronic diagnostics workshop. Agoè-Nyivé, Lomé, Togo.',
        },
        {
          title: 'Contact',
          text: 'garagelaredemption@gmail.com — +228 72 11 44 44 / 98 48 88 44 / 22 46 66 26',
        },
        {
          title: 'Publication director',
          text: 'The management of KEYPRO SERVICE CENTER.',
        },
        {
          title: 'Hosting',
          text: 'This site is hosted by a web hosting provider (Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, or Netlify, Inc., 512 2nd Street, San Francisco, CA 94107, USA, depending on the option chosen). Update this once the actual host is selected before going live.',
        },
        {
          title: 'Database',
          text: 'Supabase Inc. — hosts the database and the dashboard authentication.',
        },
        {
          title: 'Credits',
          text: 'Photographs: Unsplash. Map data: OpenStreetMap via Leaflet. Fonts: Google Fonts.',
        },
        {
          title: 'Intellectual property',
          text: 'The logo, original text and visuals on this site are the property of KEYPRO SERVICE CENTER unless otherwise stated.',
        },
      ],
    },
  },
};

export const locales = ['fr', 'en'];
export const defaultLocale = 'fr';
