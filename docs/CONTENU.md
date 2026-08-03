# Modifier le contenu

Ce guide couvre tout ce qui change au quotidien : textes, photos, coordonnées, horaires.
**Aucune connaissance en programmation n'est nécessaire** — il s'agit toujours de remplacer du texte entre guillemets.

---

## Règle d'or

Ne modifiez **jamais** le texte directement dans une page (`app/…/page.jsx`).
Tous les textes vivent dans `lib/dictionaries.js`, en deux exemplaires : un bloc `fr:` et un bloc `en:`.

Si vous changez un texte en français, **changez aussi sa traduction anglaise** — sinon le visiteur qui bascule en anglais verra l'ancienne version.

---

## Coordonnées de l'entreprise

Fichier : **`lib/site.js`**

```js
export const site = {
  email: 'keyproservicecenter@gmail.com',
  countryCode: '+228',                              // indicatif du Togo
  phones: ['72 11 44 44', '98 48 88 44', '22 46 66 26'],
  whatsapp: '22872114444',                          // international, sans le +
  ...
};
```

### Les numéros de téléphone

- `phones` — les numéros tels qu'ils s'affichent, au format local. L'indicatif `+228` est ajouté automatiquement partout.
- `whatsapp` — le numéro qui reçoit les messages du bouton flottant et du formulaire. Format international **sans le `+`** : `228` suivi du numéro sans espaces.

Pour changer le numéro WhatsApp de `72 11 44 44` vers `98 48 88 44` :

```js
whatsapp: '22898488844',
```

### L'adresse

```js
address: {
  street: 'Adjidogomé Boukarou',
  city: 'Lomé',
  region: 'Golfe / Adjidogomé',
  country: { fr: 'Togo', en: 'Togo' },
  full:  { fr: 'Adjidogomé Boukarou, Lomé — Togo', en: 'Adjidogomé Boukarou, Lomé — Togo' },
  short: { fr: 'Lomé, Togo', en: 'Lomé, Togo' },
},
```

`full` s'affiche dans le pied de page et sur la carte ; `short` dans la barre du haut, où la place est comptée.

### Les horaires

```js
hours: {
  fr: [
    ['Lundi – Vendredi', '08h00 – 19h00'],
    ['Samedi', '08h00 – 19h00'],
    ['Dimanche', 'Urgences uniquement'],
  ],
  en: [ ... ],
},
```

Chaque ligne est une paire `['jour', 'horaire']`. Ajoutez ou retirez des lignes librement — le pied de page, la page Contact et la page À propos s'adaptent.

> Si vous changez les horaires, pensez à mettre à jour aussi les **données structurées** dans `app/layout.jsx` (`openingHoursSpecification`) : c'est ce que Google affiche dans les résultats de recherche.

### Les quartiers desservis

```js
coverage: ['Agoè-Nyivé', 'Adidogomé', 'Bè', 'Akodésséwa', ...],
```

Cette liste alimente **trois endroits** : le bandeau défilant de l'accueil, celui de la page Services, et la liste sous la carte. Ajoutez un quartier, il apparaît aux trois endroits.

### Les réseaux sociaux

```js
social: {
  facebook: '#',
  instagram: '#',
  ...
},
```

Remplacez chaque `#` par l'URL complète de votre page, par exemple `'https://facebook.com/keyproservicecenter'`.
Les icônes restent visibles même avec `#` — pensez à les renseigner avant la mise en ligne.

---

## Placer le marqueur sur la carte

Les coordonnées ci-dessous sont celles, exactes, de l'atelier à Adjidogomé Boukarou (fournies par le client).

```js
geo: {
  lat: 6.175450,
  lng: 1.177399,
  zoom: 14,
},
```

Pour obtenir la position exacte :

1. Ouvrez **Google Maps** et trouvez l'atelier.
2. **Clic droit** sur le point exact.
3. En haut du menu, des chiffres apparaissent (par exemple `6,2094, 1,2069`). **Cliquez dessus** pour les copier.
4. Reportez-les dans `lib/site.js`. Attention : remplacez la **virgule décimale par un point** — `6,2094` devient `6.2094`.

Le marqueur, le calcul de distance, le bouton d'itinéraire et les données de référencement se mettent tous à jour automatiquement.

`zoom` va de 1 (planète entière) à 19 (niveau de la rue). 14 montre le quartier, 16 montre la rue.

---

## Modifier les textes

Fichier : **`lib/dictionaries.js`**

Le fichier est organisé par page, puis par section :

```js
export const dictionaries = {
  fr: {
    nav: { ... },          // le menu
    common: { ... },       // boutons et libellés réutilisés
    home: { ... },         // page d'accueil
    services: { ... },     // page services
    about: { ... },        // page à propos
    brands: { ... },       // page marques
    gallery: { ... },      // page galerie
    contact: { ... },      // page contact + carte
    chatbot: { ... },      // réponses de l'assistant
    footer: { ... },       // pied de page
    notFound: { ... },     // page 404
  },
  en: { /* mêmes clés, en anglais */ },
};
```

### Exemple : changer le titre du héros

```js
home: {
  heroTitleTop: 'Technicien',        // la ligne manuscrite
  heroTitleMain: 'AUTOMOBILE',       // le grand mot
  heroSubtitle: "Reproduction et programmation de clés…",
}
```

### Attention aux apostrophes

En JavaScript, une apostrophe dans un texte entouré d'apostrophes casse le fichier :

```js
text: 'L'atelier est ouvert',     // ❌ casse le site
text: "L'atelier est ouvert",     // ✅ guillemets doubles
text: 'L’atelier est ouvert',     // ✅ apostrophe typographique
```

Le plus simple : utilisez des **guillemets doubles** `"..."` dès qu'il y a une apostrophe.

### Ajouter un service

Dans `services.items`, dupliquez un bloc :

```js
{
  slug: 'nouveau-service',        // identifiant unique, sans accent ni espace
  icon: 'key',                    // key · chip · remote · scanner · code · truck
  title: 'Titre du service',
  short: 'Une phrase de résumé.',
  details: ['Point 1', 'Point 2', 'Point 3', 'Point 4'],
},
```

Puis **ajoutez l'image correspondante** dans `lib/images.js`, clé `services`, avec le même `slug`.
Faites-le dans les blocs `fr:` **et** `en:`.

---

## Remplacer les photos

Fichier : **`lib/images.js`**

Les photos actuelles viennent d'Unsplash (licence gratuite, usage commercial autorisé). Pour mettre vos propres photos :

1. Créez le dossier **`public/photos/`**.
2. Déposez-y vos images (format `.jpg` ou `.webp`, 1600 px de large suffisent).
3. Dans `lib/images.js`, remplacez la valeur `src` :

```js
heroWorkshop: {
  src: '/photos/atelier-principal.jpg',       // au lieu de U('photo-…')
  alt: {
    fr: 'Notre atelier à Adjidogomé Boukarou',
    en: 'Our workshop in Adjidogomé Boukarou',
  },
  credit: 'KEYPRO Service Center',
},
```

Le texte `alt` décrit l'image pour les personnes malvoyantes et pour Google — décrivez ce qu'on voit, en une phrase.

### Où va chaque image

| Clé | Emplacement |
|---|---|
| `heroWorkshop`, `heroKey` | Le grand héros de l'accueil |
| `banner*` | Le bandeau en haut de chaque page |
| `services` | Les six cartes de services (indexé par `slug`) |
| `about` | Le collage de quatre photos « À propos » |
| `process` | Les quatre étapes de « Comment nous travaillons » |
| `regions` | Un véhicule par région, section Marques |
| `why` | La grille « Nos avantages » — **la première est la grande cellule** |
| `gallery` | La page Galerie |
| `cta` | Le bandeau d'appel à l'action en bas de page |

### Tableaux indexés

`process`, `regions`, `why` et `about` sont des **tableaux** : le visuel n° 1 va avec le texte n° 1, le n° 2 avec le n° 2, et ainsi de suite.

Si vous ajoutez une cinquième étape dans `dictionaries.js` → `home.process`, ajoutez aussi une cinquième image dans `images.process`. Sinon la cinquième étape réutilisera la première image.

### Conseils pour de bonnes photos

- **Format paysage** pour les bandeaux, **portrait ou carré** pour le collage À propos.
- Compressez avant de déposer ([Squoosh](https://squoosh.app/) est gratuit) : visez moins de 300 Ko par image.
- Évitez les photos où le visage d'un client est reconnaissable sans son accord écrit.
- Les plaques d'immatriculation lisibles sont à floute​r.

---

## Le chatbot

Fichier : **`lib/dictionaries.js`**, clé `chatbot`

Par défaut l'assistant répond avec des réponses préprogrammées — aucun coût, aucune configuration.

```js
answers: [
  {
    keys: ['perdu', 'perdue', 'plus de clé'],     // mots déclencheurs
    text: "Pas de panique. Nous fabriquons…",     // la réponse
  },
  ...
],
```

Le chatbot cherche les mots de `keys` dans la question du visiteur et renvoie la réponse la mieux correspondante. Les accents et les majuscules sont ignorés.

Pour ajouter une réponse, dupliquez un bloc dans les listes `fr:` et `en:`.

`suggestions` contient les quatre questions proposées d'un clic au démarrage.
`fallback` est la réponse quand rien ne correspond.

Pour activer les réponses par intelligence artificielle, voir [`DEPLOIEMENT.md`](DEPLOIEMENT.md#chatbot-ia-optionnel).

---

## Ajouter une langue

1. Dans `lib/dictionaries.js`, dupliquez tout le bloc `en: { … }` et renommez-le, par exemple `ee:` pour l'éwé.
2. Traduisez les valeurs.
3. En bas du fichier, ajoutez le code : `export const locales = ['fr', 'en', 'ee'];`
4. Dans `components/Header.jsx`, ajoutez `'ee'` aux deux listes `['fr', 'en']`.

Le choix de langue est mémorisé dans le navigateur du visiteur.
