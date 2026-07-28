# Mise en ligne

---

## Avant de publier

Cochez ces points — les trois premiers sont des espaces réservés à corriger impérativement.

- [ ] **Coordonnées GPS exactes** de l'atelier dans `lib/site.js` → `geo` (voir [`CONTENU.md`](CONTENU.md#placer-le-marqueur-sur-la-carte))
- [ ] **Liens des réseaux sociaux** dans `lib/site.js` → `social` (actuellement des `#`)
- [ ] **Vraies photos** de l'atelier dans `lib/images.js` (actuellement Unsplash)
- [ ] `metadataBase` dans `app/layout.jsx` **et** `BASE_URL` dans `app/sitemap.js` et `app/robots.js` pointent vers le vrai domaine
- [ ] Numéro WhatsApp vérifié — envoyez-vous un message test depuis le bouton flottant
- [ ] Formulaire de contact testé : l'e-mail arrive bien, la demande apparaît dans `/admin`, et le consentement est bien enregistré
- [ ] Horaires à jour dans `lib/site.js` **et** dans `openingHoursSpecification` de `app/layout.jsx`
- [ ] Hébergeur choisi et reporté dans `/mentions-legales` (voir [`CONFORMITE.md`](CONFORMITE.md#ce-qui-reste-à-faire-manuellement))
- [ ] `npm run build` passe sans erreur
- [ ] Testé sur téléphone — c'est là que viendra la majorité des visiteurs

---

## Héberger sur Vercel

Le plus direct pour un projet Next.js, et gratuit pour ce volume.

1. Poussez le dépôt sur GitHub.
2. Sur [vercel.com](https://vercel.com), **Add New → Project**, importez le dépôt.
3. Vercel détecte Next.js seul. Laissez les réglages par défaut :
   - Build Command : `npm run build`
   - Output Directory : `.next`
4. **Deploy**.

Chaque `git push` sur la branche principale redéploie automatiquement.

---

## Héberger sur Netlify

1. Poussez le dépôt sur GitHub.
2. Sur [netlify.com](https://netlify.com), **Add new site → Import an existing project**.
3. Build command : `npm run build` — Publish directory : `.next`
4. Installez le plugin officiel **Next.js Runtime** quand Netlify le propose.

---

## Nom de domaine

Une fois le site en ligne :

1. Achetez le domaine (`keyproservicecenter.com`, `keypro.tg`…).
2. Dans Vercel : **Settings → Domains → Add**, puis suivez les instructions DNS.
3. Le certificat HTTPS est émis automatiquement, sous quelques minutes.
4. **Mettez à jour `metadataBase`** dans `app/layout.jsx` :

```js
metadataBase: new URL('https://votre-domaine.com'),
```

Sans cette étape, les aperçus de lien partagés sur WhatsApp et Facebook pointeront vers la mauvaise adresse.

---

## Variables d'environnement

Créez un fichier `.env.local` à la racine (jamais versionné) :

```bash
ANTHROPIC_API_KEY=votre_clé
# ANTHROPIC_MODEL=claude-haiku-4-5-20251001   # optionnel
```

Sur Vercel ou Netlify, déclarez la même variable dans **Settings → Environment Variables**.

Le fichier `.env.example` versionné sert de modèle — il ne contient aucune valeur réelle.

---

## Chatbot IA (optionnel)

Sans clé, le chatbot fonctionne déjà avec ses réponses préprogrammées. Aucun coût.

Pour activer les réponses par intelligence artificielle :

1. Créez une clé sur [console.anthropic.com](https://console.anthropic.com).
2. Ajoutez `ANTHROPIC_API_KEY` dans `.env.local` et dans les variables de votre hébergeur.
3. Redéployez.

Le prompt est déjà renseigné avec vos services, marques, horaires, téléphones et adresse — voir `app/api/chat/route.js`. Si l'API échoue, le site bascule silencieusement sur les réponses locales.

**Surveillez la consommation.** Un chatbot public peut être sollicité en boucle. Posez une limite de dépense mensuelle dans la console Anthropic dès l'activation.

---

## Après la mise en ligne

**Google Search Console** — [search.google.com/search-console](https://search.google.com/search-console), ajoutez le domaine, soumettez `/sitemap.xml` (généré automatiquement par `app/sitemap.js`) et demandez l'indexation. Les données structurées `AutoRepair` du site permettent d'afficher horaires et téléphone directement dans les résultats. Détails du référencement mis en place : [`CONFORMITE.md`](CONFORMITE.md).

**Fiche Google Business Profile** — c'est ce qui fait apparaître le garage dans Google Maps quand quelqu'un cherche « clé auto Lomé ». Utilisez exactement la même adresse et les mêmes horaires que sur le site : Google compare, et une incohérence pénalise le classement.

**Analytics** — Vercel Analytics s'active en un clic dans le tableau de bord, sans cookie ni bandeau de consentement.

---

## Sauvegarde

Le dépôt Git **est** la sauvegarde. Poussez-le sur GitHub, GitLab ou Bitbucket — un dépôt privé suffit et reste gratuit.

Ce qui n'est pas dans Git : `node_modules` et `.next` se régénèrent avec `npm install` et `npm run build`. Le fichier `.env.local` n'est pas versionné : **notez vos clés API ailleurs**, en lieu sûr.
