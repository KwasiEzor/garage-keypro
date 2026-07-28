# KEYPRO SERVICE CENTER

Site vitrine du garage **KEYPRO SERVICE CENTER** — Agoè-Nyivé, Lomé (Togo).
Clés auto, programmation, diagnostic électronique et assistance mobile dans tout le Grand Lomé.

**Next.js** (App Router) · **Tailwind CSS** · **Supabase** · bilingue **FR/EN** · carte interactive · animations au défilement · chatbot · **tableau de bord d'administration**.

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
| `npm run db:seed` | Importe le contenu des fichiers vers la base |
| `npm run db:admin` | Crée un compte d'accès au tableau de bord |

> **Après toute modification de `tailwind.config.js`**, arrêtez le serveur (`Ctrl+C`) et relancez `npm run dev` : le cache `.next` doit être régénéré.

---

## Deux façons de gérer le contenu

**Au quotidien : le tableau de bord.** Ouvrez `/admin` et modifiez textes, photos, horaires, services et marques depuis un navigateur — y compris sur téléphone. Voir [`docs/TABLEAU-DE-BORD.md`](docs/TABLEAU-DE-BORD.md).

**Le contenu par défaut reste dans les fichiers.** Si la base est vide ou injoignable, le site retombe dessus et continue de fonctionner. C'est aussi la version versionnée dans git :

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
| [`docs/TABLEAU-DE-BORD.md`](docs/TABLEAU-DE-BORD.md) | **Espace `/admin`** : contenu, devis, interventions, clients — mise en route et sécurité |
| [`docs/CONTENU.md`](docs/CONTENU.md) | Changer les textes et les photos **dans les fichiers** (contenu par défaut) |
| [`docs/MARQUE.md`](docs/MARQUE.md) | Le logo, ses déclinaisons, les fichiers à donner à un imprimeur |
| [`docs/TECHNIQUE.md`](docs/TECHNIQUE.md) | Architecture, système de design, animations, carte, chatbot, multilingue |
| [`docs/DEPLOIEMENT.md`](docs/DEPLOIEMENT.md) | Mise en ligne, nom de domaine, variables d'environnement, checklist |
| [`public/charte-de-marque.html`](public/charte-de-marque.html) | Charte graphique à ouvrir dans un navigateur |

---

## Structure du projet

```
app/
  layout.jsx            html, polices, SEO — charge le contenu depuis la base
  (site)/               le site public : accueil, services, à propos,
                        marques, galerie, contact, 404
  admin/                le tableau de bord privé
    connexion/          page de connexion
    (dashboard)/        vue d'ensemble, devis, interventions, clients, contenu
  api/chat/route.js     backend optionnel du chatbot
  globals.css           design system (classes .btn, .card, .section…)

components/
  Header · Footer · Logo · PageHero · CtaBanner
  motion.jsx            animations au défilement (parallaxe, compteurs, épinglage)
  LocationMap.jsx       carte Leaflet + géolocalisation
  LanguageProvider.jsx  contexte de langue FR/EN
  Chatbot.jsx           assistant flottant
  WhatsAppButton.jsx    bouton WhatsApp flottant
  Icons.jsx             toutes les icônes SVG

lib/
  site.js · dictionaries.js · images.js   contenu par défaut
  content.js                              chargement depuis la base, avec repli
  runtime.js                              application du contenu chargé
  supabase/                               clients navigateur et serveur
  admin/labels.js                         libellés des statuts
  logo.js                                 géométrie du logo

proxy.js                renouvellement de session + protection de /admin
                        (ex-middleware.js, renommé par Next.js 16)

supabase/
  schema.sql            structure complète de la base (sans aucune donnée)

scripts/
  seed.mjs              npm run db:seed
  create-admin.mjs      npm run db:admin

public/
  brand/                logos SVG pour les prestataires
  charte-de-marque.html
  favicon.* · icon-*.png · og-image.png · site.webmanifest
```

---

## Ce qui reste à faire

Cinq points à finaliser avant la mise en ligne :

1. **Coordonnées GPS exactes** — le marqueur pointe vers le centre d'Agoè-Nyivé, pas vers l'atelier. Voir [`docs/CONTENU.md`](docs/CONTENU.md#placer-le-marqueur-sur-la-carte).
2. **Liens des réseaux sociaux** — les `#` dans `lib/site.js` sont des espaces réservés.
3. **Vraies photos de l'atelier** — les visuels actuels viennent d'Unsplash. Voir [`docs/CONTENU.md`](docs/CONTENU.md#remplacer-les-photos).
4. **Compte administrateur** — `npm run db:admin` n'a pas encore été lancé.
5. **Protection contre les mots de passe compromis** — à activer dans Supabase, deux clics. Voir [`docs/TABLEAU-DE-BORD.md`](docs/TABLEAU-DE-BORD.md#ce-qui-reste-à-faire-côté-supabase).

---

## Crédits

- Photographies : [Unsplash](https://unsplash.com/license) — licence gratuite, usage commercial autorisé
- Fond de carte : [OpenStreetMap](https://www.openstreetmap.org/copyright) via [Leaflet](https://leafletjs.com/)
- Polices : Sora, Inter, Anton, Great Vibes, Poppins ([Google Fonts](https://fonts.google.com/), licence SIL Open Font)
