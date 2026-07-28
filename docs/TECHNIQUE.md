# Documentation technique

---

## Choix d'architecture

**Next.js App Router**, avec un contenu à deux niveaux : les fichiers de `lib/` fournissent la version par défaut, versionnée dans git ; Supabase fournit la version éditable depuis le tableau de bord. Le site lit la base et retombe sur les fichiers si elle est vide, injoignable ou non configurée.

Ce choix a une conséquence utile : **une panne de base de données ne fait pas tomber le site vitrine**, et on peut développer hors connexion.

**Les dépendances sont réduites au strict nécessaire** — Next, React et Supabase. Les animations, la carte et le chatbot sont écrits à la main : moins de code à charger, moins de mises à jour de sécurité à suivre, moins de risque qu'une bibliothèque casse au prochain changement de version majeure.

| Besoin | Solution retenue | Alternative écartée |
|---|---|---|
| Contenu éditable | Supabase + repli sur fichiers | CMS hébergé, Decap, contenu figé |
| Animations au défilement | `IntersectionObserver` + `requestAnimationFrame` | Framer Motion, GSAP |
| Carte | Leaflet chargé depuis un CDN | Google Maps (clé API + facturation) |
| Multilingue | Contexte React + dictionnaires | `next-intl`, routes `/fr` `/en` |
| Devis | Enregistrement en base + relais e-mail et WhatsApp | Formulaire sans trace |
| Chatbot | Correspondance de mots-clés, API en option | Service tiers payant |

Le détail du tableau de bord et de la base est dans [`TABLEAU-DE-BORD.md`](TABLEAU-DE-BORD.md).

---

## Système de design

Tout est dans **`app/globals.css`** (classes réutilisables) et **`tailwind.config.js`** (jetons).

### Palette

`navy` 50 → 950 et `brand` 50 → 900, plus `gold`. Définies dans `tailwind.config.js`.

### Échelle typographique fluide

```js
'display-xl': ['clamp(3.25rem, 9vw, 7rem)',   { lineHeight: '0.88', letterSpacing: '-0.02em' }],
h1:           ['clamp(2.125rem, 4.4vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
h2:           ['clamp(1.75rem, 3.2vw, 2.75rem)', ... ],
lead:         ['clamp(1.0625rem, 1.25vw, 1.1875rem)', { lineHeight: '1.72' }],
```

Les titres s'adaptent progressivement à la largeur de l'écran, sans paliers de rupture.

### Classes utilitaires du projet

| Classe | Rôle |
|---|---|
| `.container-x` | Conteneur centré, largeur max 80 rem, marges latérales fluides |
| `.section` / `.section-sm` | Rythme vertical fluide entre les sections |
| `.section-head` | Espace normalisé entre un titre de section et son contenu |
| `.eyebrow` | Sur-titre rouge en capitales, avec traits latéraux |
| `.btn-primary` `.btn-navy` `.btn-outline` `.btn-ghost` `.btn-wa` `.btn-sm` | Boutons |
| `.card` | Carte blanche avec ombre et élévation au survol |
| `.glass` | Surface translucide floutée, pour les fonds sombres |
| `.media` / `.media-zoom` | Conteneur d'image avec débordement masqué et zoom au survol |
| `.field` / `.label` | Champs de formulaire |
| `.tnum` | Chiffres tabulaires — à mettre sur tout nombre et téléphone |
| `.mask-fade-r` | Dégradé de disparition à droite, pour les bandeaux défilants |

### Ombres

`shadow-soft` (repos) · `shadow-lift` (survol) · `shadow-glow` (rouge, éléments d'action).

---

## Animations — `components/motion.jsx`

Aucune bibliothèque externe. Tout se coupe automatiquement si le visiteur a activé « réduire les animations » dans son système.

| Composant | Effet |
|---|---|
| `<ScrollProgress />` | Barre de progression de lecture en haut de page |
| `<Rise>` | Apparition en fondu + montée + léger flou |
| `<SplitText>` | Le titre se révèle mot par mot |
| `<Counter>` | Les chiffres s'incrémentent à l'apparition |
| `<Parallax>` | L'élément se déplace plus lentement que la page |
| `<Spotlight>` | Halo lumineux qui suit le curseur |
| `<Magnetic>` | Le bouton s'incline légèrement vers le curseur |
| `<Marquee>` | Bandeau défilant en continu |

Hooks exportés : `useInView`, `useScrollProgress`, `useMediaQuery`, `useReducedMotion`.

### La section épinglée

La section « Clé perdue ? » de l'accueil reste fixe pendant que la page défile, et son contenu se révèle par paliers.

```jsx
const pinRef = useRef(null);
const rawPin = useScrollProgress(pinRef, { start: 1, end: 0 });   // 0 → 1
const isDesktop = useMediaQuery('(min-width: 1024px)');
const pinned = isDesktop && !reduced;
const pin = pinned ? rawPin : 1;      // hors épinglage, tout est visible
```

L'épinglage est **désactivé sous 1024 px** : sur mobile, une section fixe de 280 vh piège le défilement.

### Performance

`useScrollProgress` et `ScrollProgress` limitent leurs calculs à une fois par image via `requestAnimationFrame`, et écoutent le défilement en `{ passive: true }`. `Parallax` n'anime que `transform`, jamais `top` ou `margin`, pour rester sur le compositeur graphique.

---

## La carte — `components/LocationMap.jsx`

Leaflet est chargé **depuis un CDN au moment de l'affichage** : aucune dépendance npm, aucune clé d'API, aucun coût. Le fond de carte vient d'OpenStreetMap.

```js
const LEAFLET_VERSION = '1.9.4';
const CSS_URL = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.css`;
const JS_URL  = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.js`;
```

`loadLeaflet()` mémorise sa promesse dans `window.__leafletPromise` — plusieurs cartes sur une même page ne déclenchent qu'un seul téléchargement.

### Géolocalisation

Le bouton « Me localiser » utilise `navigator.geolocation`. Il affiche la position du visiteur, son cercle de précision, un trait pointillé vers l'atelier, recadre sur les deux points, et calcule la distance à vol d'oiseau par la formule de haversine.

Le temps de trajet est une estimation prudente à **22 km/h porte-à-porte**, adaptée à la circulation urbaine de Lomé. Ajustez la constante dans le fichier si nécessaire.

### Deux détails importants

- Le **zoom molette ne s'active qu'après un clic** sur la carte (`map.on('click', …)`), sinon la carte piège le défilement de la page.
- `.leaflet-container { z-index: 0; isolation: isolate }` dans `globals.css` empêche les calques Leaflet (z-index jusqu'à 1000) de passer devant l'en-tête collant.

Si Leaflet ne charge pas — réseau coupé, CDN bloqué — un lien direct vers Google Maps prend le relais.

---

## Types de base de données

Le projet est en **JavaScript**, mais TypeScript est activé pour une seule
raison : typer les accès à la base.

`tsconfig.json` est volontairement permissif — `allowJs: true` et surtout
`checkJs: false`. Les 49 fichiers `.js` et `.jsx` ne sont **pas** analysés,
ce qui évite des milliers d'erreurs sur du code qui fonctionne. Seuls les
fichiers `.ts` le sont : `types/database.ts` et `lib/supabase/*`.

### Ce que ça apporte

`types/database.ts` décrit les 17 tables. Le client Supabase en est typé,
donc l'autocomplétion remonte jusqu'aux composants — y compris dans les
fichiers `.jsx`, via le service TypeScript de l'éditeur.

```ts
import type { Row, Insert, Update, QuoteStatus } from '@/types/database';

type Devis = Row<'quote_requests'>;
type NouveauClient = Insert<'customers'>;
type MajIntervention = Update<'jobs'>;
```

Quatre familles d'erreurs sont désormais attrapées avant l'exécution :

| Erreur | Message |
|---|---|
| Colonne inexistante | `Property 'telephone' does not exist` |
| Colonne obligatoire oubliée | `Property 'phone' is missing` |
| Valeur hors énumération | `Type '"traitee"' is not assignable to type 'QuoteStatus'` |
| Mauvais type | `Type 'string' is not assignable to type 'number'` |

### Régénérer après une migration

```bash
npm run db:types     # écrit types/database.generated.ts
npm run typecheck    # vérifie que rien n'est cassé
```

Le fichier généré n'est **pas versionné** : c'est une sortie brute, à
comparer avec `types/database.ts` qui est la version relue et commentée.
Reportez-y les différences à la main — l'occasion de voir ce qui a changé.

### Pourquoi pas un ORM

Drizzle et Prisma ont été écartés, pour trois raisons :

- **Le projet est en JavaScript.** L'essentiel de leur valeur est l'inférence
  de types ; sans TypeScript partout, on paie le coût sans le bénéfice.
- **Ils exigent une connexion Postgres directe**, impossible depuis un
  navigateur. Les quatre écrans d'administration lisent et écrivent côté
  client ; il faudrait tous les convertir en Server Actions.
- **Ils contourneraient la sécurité.** Les 35 politiques RLS vivent dans la
  base. Une connexion directe avec le rôle `postgres` les ignore : il
  faudrait réécrire toute l'autorisation en code applicatif.

Les types générés apportent l'essentiel du confort sans toucher à
l'architecture ni affaiblir la sécurité.

---

## Le proxy — `proxy.js`

Ce fichier s'appelait `middleware.js` jusqu'à Next.js 16. La convention a été **renommée en `proxy`** : même comportement, nom plus juste — le code s'exécute en amont de l'application, à la frontière réseau, et non « au milieu » comme un middleware Express.

La migration se résume à deux changements :

```diff
- // middleware.js
- export async function middleware(request) {
+ // proxy.js
+ export async function proxy(request) {
```

L'export `config` avec son `matcher` ne change pas. Un codemod officiel existe si vous rencontrez le cas ailleurs :

```bash
npx @next/codemod@canary middleware-to-proxy .
```

Ici, le proxy fait deux choses : il **renouvelle le jeton de session** Supabase à chaque requête — c'est le rôle de `supabase.auth.getUser()`, à ne jamais retirer — et il **redirige vers la connexion** quiconque tente d'ouvrir `/admin` sans session.

Il se retire complètement si les clés Supabase manquent, et laisse passer si la base ne répond pas : c'est le layout du tableau de bord qui tranche alors, avec un message explicite.

> Next.js recommande de **n'utiliser le proxy qu'en dernier recours**. Ici il ne porte aucune logique métier : la véritable protection vient des règles de sécurité de la base et de la vérification refaite dans `app/admin/(dashboard)/layout.jsx`. Le proxy évite seulement d'afficher une page vide.

---

## Multilingue — `components/LanguageProvider.jsx`

Contexte React simple. Le choix est mémorisé dans `localStorage`, avec détection de la langue du navigateur au premier passage.

```jsx
const { t, locale, setLocale } = useLanguage();
<h1>{t.home.heroTitleMain}</h1>
```

Il n'y a **pas de routes `/fr` et `/en`** : la langue ne change pas l'URL. C'est plus simple à maintenir, mais Google n'indexe que la version française. Si le référencement anglophone devient important, il faudra passer à des routes localisées.

---

## Le chatbot

**Sans clé API** : `app/api/chat/route.js` renvoie `204 No Content`, et le composant bascule sur les réponses préprogrammées de `dictionaries.js`. Aucun coût, aucune configuration.

**Avec `ANTHROPIC_API_KEY`** : la route appelle l'API avec un prompt déjà renseigné — services, marques, horaires, téléphones avec indicatif, adresse. Le modèle a pour consigne de rester bref, de ne jamais donner de prix ferme, et d'orienter vers le téléphone en cas d'urgence.

Le repli est silencieux : toute erreur d'API renvoie `204`, et le visiteur obtient quand même une réponse locale.

La correspondance locale normalise les accents et la casse, puis retient la réponse dont les mots-clés totalisent le plus de caractères correspondants.

---

## Le formulaire de contact

À la validation, la demande est **enregistrée dans la table `quote_requests`** — elle apparaît aussitôt dans le tableau de bord. Si la base n'est pas configurée ou ne répond pas, l'enregistrement est ignoré en silence et le visiteur garde ses deux relais :

- un e-mail pré-rempli (`mailto:`) avec objet et corps structurés, ou
- un message WhatsApp pré-rempli.

Le numéro saisi est normalisé — si le visiteur retape « +228 » ou « 228 », l'indicatif n'est pas dupliqué.

Pour recevoir les demandes directement par e-mail, branchez [Formspree](https://formspree.io/) ou [Resend](https://resend.com/) dans la fonction `handleSubmit` de `app/contact/page.jsx`.

---

## Images

Toutes chargées via `next/image` : conversion automatique en AVIF/WebP, redimensionnement selon l'écran, chargement différé.

Chaque `<Image>` du projet a `alt`, `fill` et `sizes`. **`sizes` n'est pas optionnel** avec `fill` : sans lui, le navigateur télécharge toujours la plus grande variante.

Les domaines distants autorisés sont déclarés dans `next.config.mjs` :

```js
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'plus.unsplash.com' },
  ],
},
```

Si vous passez à des images locales dans `public/photos/`, ces entrées deviennent inutiles.

---

## Référencement

- Métadonnées et Open Graph dans `app/layout.jsx`
- Données structurées **`AutoRepair`** avec `geo`, `openingHoursSpecification`, `areaServed` par quartier — c'est ce qui alimente la fiche Google
- `locale: 'fr_TG'`, `addressCountry: 'TG'`
- Bannière de partage `og-image.png` (1200 × 630)
- Manifeste `site.webmanifest` pour l'ajout à l'écran d'accueil

Après mise en ligne, mettez à jour `metadataBase` dans `app/layout.jsx` avec le vrai domaine.

---

## Accessibilité

- Contraste : le rouge `#E4032E` sur blanc atteint 5,3:1 — conforme AA pour le texte courant.
- Tous les boutons d'icône ont un `aria-label`.
- La visionneuse de la galerie se pilote au clavier : `Échap`, `←`, `→`.
- `:focus-visible` affiche un anneau rouge sur tous les éléments interactifs.
- `prefers-reduced-motion` coupe toutes les animations.
- Les titres suivent une hiérarchie `h1` → `h2` → `h3` sans saut de niveau.

---

## Vérifications avant commit

Sans dépendances de test, ces contrôles rapides valent la peine :

```bash
npm run build          # échoue si une page ne compile pas
npm run lint           # règles Next.js
```

Points à surveiller manuellement :

- chaque `<Image fill>` a bien `sizes`
- chaque texte utilisé existe dans les blocs `fr:` **et** `en:` de `dictionaries.js`
- les tableaux indexés (`process`, `regions`, `why`) ont autant d'entrées que leurs textes
