# KEYPRO SERVICE CENTER

Site vitrine du garage **KEYPRO SERVICE CENTER** — Agoè-Nyivé, Lomé (Togo).
Clés auto, programmation, diagnostic électronique et assistance mobile dans tout le Grand Lomé.

**Next.js** (App Router) · **Tailwind CSS** · bilingue **FR/EN** · carte interactive · animations au défilement · chatbot.

---

## Démarrage

```bash
npm install
npm run dev
```

Le site tourne sur **http://localhost:3000**

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement avec rechargement à chaud |
| `npm run build` | Build de production |
| `npm start` | Lance le build de production |
| `npm run lint` | Vérifie le code |

> **Après toute modification de `tailwind.config.js`**, arrêtez le serveur (`Ctrl+C`) et relancez `npm run dev` : le cache `.next` doit être régénéré.

---

## Les quatre fichiers à connaître

Vous n'avez presque jamais besoin de toucher au code des pages. Tout ce qui change au quotidien vit dans quatre fichiers :

| Fichier | Ce qu'il contient |
|---|---|
| **`lib/site.js`** | Téléphones, e-mail, adresse, coordonnées GPS, horaires, quartiers desservis, réseaux sociaux |
| **`lib/dictionaries.js`** | **Tous** les textes du site, en français et en anglais |
| **`lib/images.js`** | Toutes les photos, regroupées par section |
| **`lib/logo.js`** | Géométrie vectorielle du logo (généré — à ne pas modifier à la main) |

Modifier un texte dans `dictionaries.js` le met à jour partout où il apparaît. Aucune page n'écrit de texte en dur.

---

## Documentation

| Document | Sujet |
|---|---|
| [`docs/CONTENU.md`](docs/CONTENU.md) | Changer les textes, les photos, les coordonnées, les horaires, les zones desservies |
| [`docs/MARQUE.md`](docs/MARQUE.md) | Le logo, ses déclinaisons, les fichiers à donner à un imprimeur |
| [`docs/TECHNIQUE.md`](docs/TECHNIQUE.md) | Architecture, système de design, animations, carte, chatbot, multilingue |
| [`docs/DEPLOIEMENT.md`](docs/DEPLOIEMENT.md) | Mise en ligne, nom de domaine, variables d'environnement, checklist |
| [`public/charte-de-marque.html`](public/charte-de-marque.html) | Charte graphique à ouvrir dans un navigateur |

---

## Structure du projet

```
app/
  layout.jsx            layout global, polices, SEO, données structurées
  page.jsx              accueil
  services/             les six prestations en détail
  a-propos/             mission, vision, valeurs, couverture
  marques/              marques supportées par région
  galerie/              galerie avec visionneuse
  contact/              formulaire de devis + carte
  api/chat/route.js     backend optionnel du chatbot
  globals.css           design system (classes .btn, .card, .section…)
  not-found.jsx         page 404

components/
  Header · Footer · Logo · PageHero · CtaBanner
  motion.jsx            animations au défilement (parallaxe, compteurs, épinglage)
  LocationMap.jsx       carte Leaflet + géolocalisation
  LanguageProvider.jsx  contexte de langue FR/EN
  Chatbot.jsx           assistant flottant
  WhatsAppButton.jsx    bouton WhatsApp flottant
  Icons.jsx             toutes les icônes SVG

lib/
  site.js · dictionaries.js · images.js · logo.js

public/
  brand/                logos SVG pour les prestataires
  charte-de-marque.html
  favicon.* · icon-*.png · og-image.png · site.webmanifest
```

---

## Ce qui reste à faire

Trois points à finaliser avant la mise en ligne :

1. **Coordonnées GPS exactes** — le marqueur pointe vers le centre d'Agoè-Nyivé, pas vers l'atelier. Voir [`docs/CONTENU.md`](docs/CONTENU.md#placer-le-marqueur-sur-la-carte).
2. **Liens des réseaux sociaux** — les `#` dans `lib/site.js` sont des espaces réservés.
3. **Vraies photos de l'atelier** — les visuels actuels viennent d'Unsplash. Voir [`docs/CONTENU.md`](docs/CONTENU.md#remplacer-les-photos).

---

## Crédits

- Photographies : [Unsplash](https://unsplash.com/license) — licence gratuite, usage commercial autorisé
- Fond de carte : [OpenStreetMap](https://www.openstreetmap.org/copyright) via [Leaflet](https://leafletjs.com/)
- Polices : Sora, Inter, Anton, Great Vibes, Poppins ([Google Fonts](https://fonts.google.com/), licence SIL Open Font)
