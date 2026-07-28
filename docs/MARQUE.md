# Identité de marque

---

## Le logo

Une **clé à anneau hexagonal**. L'hexagone évoque la tête de boulon et le boîtier d'une puce électronique — deux signaux qui situent KEYPRO du côté de la mécanique et de l'électronique embarquée, et non de la serrurerie de bâtiment.

Le dessin est monoligne, d'épaisseur constante, construit sur une grille de 64 × 64.

**Le nom est vectorisé.** « KEYPRO » et « SERVICE CENTER » sont convertis en courbes dans tous les fichiers : votre imprimeur, votre brodeur ou votre enseigniste n'a **aucune police à installer**, et le rendu est strictement identique partout.

---

## Dans le code

```jsx
import Logo from '@/components/Logo';

<Logo theme="color"  className="h-10 w-auto" />          // fond clair
<Logo theme="light"  variant="stacked" />                // fond sombre, empilé
<Logo variant="icon" className="h-9 w-9" decorative />   // pastille
<Logo theme="mono-dark" />                               // une seule couleur
```

| Propriété | Valeurs | Défaut |
|---|---|---|
| `variant` | `horizontal` · `stacked` · `symbol` · `icon` | `horizontal` |
| `theme` | `color` · `light` · `mono-dark` · `mono-white` | `color` |
| `className` | classes Tailwind — utilisez `h-*` et `w-auto` | `h-11 w-auto` |
| `decorative` | `true` masque le logo aux lecteurs d'écran (quand un texte le nomme déjà à côté) | `false` |

La géométrie vit dans **`lib/logo.js`**. Le composant React et les fichiers SVG lisent **les mêmes tracés** — ils ne peuvent donc pas diverger.

> `lib/logo.js` est un fichier **généré**. Ne le modifiez pas à la main : toute retouche du logo doit être répercutée dans les SVG de `public/brand/` en même temps.

---

## Les fichiers livrés

| Besoin | Fichier |
|---|---|
| Imprimeur, carrossier, enseigniste | `public/brand/logo-horizontal.svg` |
| Support sombre (polo, kakémono, bâche) | `public/brand/logo-horizontal-white.svg` |
| Broderie, gravure, tampon | `public/brand/logo-horizontal-mono-dark.svg` |
| Formats carrés | `public/brand/logo-stacked.svg` |
| Symbole seul | `public/brand/logo-symbol.svg` |
| Photo de profil réseaux sociaux | `public/icon-512.png` |
| Aperçu de lien partagé (WhatsApp, Facebook) | `public/og-image.png` |
| Onglet du navigateur | `public/favicon.ico` + `favicon.svg` |
| Écran d'accueil iPhone / Android | `apple-touch-icon.png` · `icon-192.png` |

---

## Couleurs

| Couleur | Écran | Impression (approx.) | Pantone (approx.) |
|---|---|---|---|
| Rouge KEYPRO | `#E4032E` | C0 M100 J85 N0 | ≈ 186 C |
| Marine | `#0B1024` | C92 M84 J52 N72 | ≈ 296 C |
| Gris clair | `#F2F4FA` | — | — |
| Gris texte | `#7B8AB8` | — | — |

> Les valeurs CMJN et Pantone sont des **équivalences approximatives**. Le rouge `#E4032E` est vif et se décale facilement en quadrichromie : demandez un **BAT couleur** à votre imprimeur avant tout tirage important.

Dans le code, ces couleurs sont les palettes `brand` et `navy` de `tailwind.config.js`.

---

## Règles d'usage

**À faire**

- Réserver autour du logo une marge égale à la **hauteur du symbole**.
- Utiliser la version blanche dès que le fond est sombre.
- Descendre au symbole seul en dessous de 24 px de haut.

**À ne pas faire**

- Étirer, déformer, incliner ou faire pivoter le logo.
- Ajouter une ombre, un relief, un contour ou un dégradé.
- Poser la version foncée sur un fond sombre, ou l'inverse.
- Poser le logo sur une couleur vive ou une photo chargée sans voile assombrissant.
- Redessiner le logo à la main ou en faire une capture d'écran — partez toujours des fichiers.

**Tailles minimales**

| Support | Minimum |
|---|---|
| Verrouillage complet, écran | 24 px de haut |
| Verrouillage complet, impression | 10 mm de haut |
| Symbole seul | 16 px de haut |

La charte complète, avec les visuels : **`public/charte-de-marque.html`** — ouvrez-la dans un navigateur, ou envoyez l'URL `/charte-de-marque.html` à votre prestataire une fois le site en ligne.

---

## Typographie

| Rôle | Police | Variable CSS |
|---|---|---|
| Logo (vectorisé) | Poppins Bold / Medium | — |
| Titres du site | Sora 600–800 | `--font-heading` |
| Texte courant | Inter 400–700 | `--font-sans` |
| Grand mot du héros et 404 | Anton | `--font-display` |
| Ligne manuscrite du héros | Great Vibes | `--font-script` |

Toutes sont chargées via `next/font` : elles sont servies depuis votre propre domaine, sans requête vers Google au moment de la visite.

L'échelle typographique est **fluide** — définie avec `clamp()` dans `tailwind.config.js`, elle s'adapte progressivement à la largeur de l'écran sans paliers brusques.

Classes disponibles : `text-display-xl`, `text-display-lg`, `text-h1` → `text-h4`, `text-lead`, `text-body`, `text-small`, `text-micro`, `text-eyebrow`.

---

## Régénérer le logo

Si le dessin doit évoluer, les fichiers SVG et `lib/logo.js` doivent être régénérés **ensemble** pour rester synchronisés. La géométrie source est :

```js
// lib/logo.js
SYMBOL_PATHS = [
  'M24 17.5 36.5 24.7 36.5 39.3 24 46.5 11.5 39.3 11.5 24.7Z',  // anneau hexagonal
  'M36.5 32 H52',    // hampe
  'M42 32 V40.5',    // dent 1
  'M49 32 V44.5',    // dent 2
];
SYMBOL_STROKE = 6;
```

Le nom est vectorisé depuis **Poppins Bold** (KEYPRO) et **Poppins Medium** (SERVICE CENTER), avec un interlettrage de 0,02 em et 0,34 em respectivement, la baseline calée sur la largeur exacte de « KEYPRO ».
