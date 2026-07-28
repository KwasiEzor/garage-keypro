# SEO et RGPD

Ce document réunit tout ce qui a été mis en place pour le référencement et la protection des données, et ce qu'il reste à faire manuellement.

---

## Référencement (SEO)

### Métadonnées par page

Chaque page publique est désormais un composant serveur (`page.jsx`) qui exporte ses propres `title`, `description`, `alternates.canonical` et `openGraph`, et délègue l'affichage à un composant client (`*Client.jsx`). Avant ce changement, toutes les pages partageaient le même titre et la même description — celui de l'accueil — ce qui nuit au classement de chaque page dans les résultats de recherche.

| Page | Fichier serveur | Contenu interactif |
|---|---|---|
| Accueil | `app/(site)/page.jsx` | `HomeClient.jsx` |
| Services | `app/(site)/services/page.jsx` | `ServicesClient.jsx` |
| À propos | `app/(site)/a-propos/page.jsx` | `AboutClient.jsx` |
| Marques | `app/(site)/marques/page.jsx` | `BrandsClient.jsx` |
| Galerie | `app/(site)/galerie/page.jsx` | `GalleryClient.jsx` |
| Contact | `app/(site)/contact/page.jsx` | `ContactClient.jsx` |

**Pour modifier un titre ou une description**, éditez directement l'objet `metadata` en haut du fichier `page.jsx` concerné — ce n'est pas piloté par le tableau de bord.

### Sitemap et robots.txt

- `app/sitemap.js` génère `/sitemap.xml` : la liste des pages publiques avec leur priorité et leur fréquence de mise à jour.
- `app/robots.js` génère `/robots.txt` : autorise tout le site, à l'exception de `/admin` et `/api`, et pointe vers le sitemap.

Le tableau de bord est protégé à trois niveaux indépendants : il exige une connexion (`proxy.js`), il porte un `robots: noindex` (`app/admin/layout.jsx`), et il est exclu du robots.txt. Une seule de ces protections suffirait déjà à l'exclure des moteurs de recherche.

### Données structurées (JSON-LD)

- `app/layout.jsx` : un bloc `AutoRepair` (schema.org) sur tout le site — nom, adresse, coordonnées GPS, horaires, zones desservies. C'est ce qui permet à Google d'afficher horaires et téléphone directement dans les résultats.
- `components/BreadcrumbJsonLd.jsx` : un fil d'Ariane structuré sur chaque page, cohérent avec le fil d'Ariane visuel déjà affiché par `PageHero`.

### Après la mise en ligne

Reportez-vous à [`DEPLOIEMENT.md`](DEPLOIEMENT.md#après-la-mise-en-ligne) : Google Search Console, fiche Google Business Profile, cohérence de l'adresse et des horaires entre le site et la fiche Google.

**Un point à ne pas oublier** : une fois le nom de domaine définitif choisi, mettez à jour `BASE_URL` dans `app/sitemap.js` et `app/robots.js`, ainsi que `metadataBase` dans `app/layout.jsx` — les trois doivent pointer vers la même adresse.

---

## Protection des données (RGPD et loi togolaise)

KEYPRO SERVICE CENTER est basé au Togo, où la loi n°2019-014 encadre la protection des données à caractère personnel (autorité de contrôle : l'IPDCP). Le site applique par ailleurs les principes du RGPD, pour rester cohérent avec les standards internationaux et couvrir les visiteurs de l'Union européenne.

### Ce qui a été mis en place

**Consentement explicite sur le formulaire de devis.** Une case à cocher, obligatoire, précède l'envoi : *« J'accepte que KEYPRO SERVICE CENTER utilise mes données pour traiter cette demande »*, avec un lien vers la politique de confidentialité. Ce consentement est enregistré en base (colonne `consent` sur `quote_requests`) et la base **refuse techniquement** tout dépôt sans consentement — voir la politique « depot public borne » dans `supabase/schema.sql`. Ce n'est donc pas qu'une case à l'écran : c'est une règle imposée par la base de données elle-même.

**Deux pages légales**, bilingues, accessibles depuis le pied de page :
- `/politique-confidentialite` — responsable du traitement, données collectées, finalités, base légale, durée de conservation, cookies, droits des personnes, sécurité.
- `/mentions-legales` — éditeur, hébergement, base de données, crédits, propriété intellectuelle.

Le contenu de ces deux pages vit dans `lib/dictionaries.js` (clés `privacy` et `legal`), au même titre que le reste des textes du site — modifiable sans toucher au code.

**Bandeau d'information sur les cookies**, non bloquant. Le site n'utilise ni cookie publicitaire ni traceur de mesure d'audience : la langue choisie est mémorisée sur l'appareil du visiteur (`localStorage`, jamais transmis à un serveur), et un cookie de session n'est déposé que lorsqu'un membre de l'équipe se connecte au tableau de bord. En l'absence de cookies non essentiels, aucun consentement n'est requis — seule une information transparente l'est, ce que fait ce bandeau (`components/CookieNotice.jsx`). Il se referme une fois vu et ne réapparaît pas.

**Traçabilité côté tableau de bord.** La fiche de chaque demande de devis affiche désormais si le consentement a bien été donné, utile en cas de contrôle.

### Comment répondre à une demande d'un client (droit d'accès, de rectification ou d'effacement)

1. Ouvrez `/admin` → **Demandes de devis** ou **Clients & véhicules** selon le cas.
2. Pour rectifier : modifiez directement le champ concerné.
3. Pour effacer : supprimez la fiche depuis le tableau de bord — cela déclenche une suppression réelle en base (pas une simple mise en corbeille).
4. Répondez à la personne à l'adresse qu'elle a utilisée pour vous contacter, en confirmant l'action réalisée.

### Ce qui reste à faire manuellement

- **Mentions légales — hébergeur.** La page `/mentions-legales` mentionne Vercel ou Netlify au conditionnel, tant que l'hébergement définitif n'est pas choisi (voir [`DEPLOIEMENT.md`](DEPLOIEMENT.md)). Une fois l'hébergeur choisi, retirez l'option non retenue dans `lib/dictionaries.js` (clé `legal.sections`, section « Hébergement »).
- **Analytics.** Si vous activez un jour un outil de mesure d'audience (Vercel Analytics, Google Analytics...), vérifiez s'il dépose des cookies non essentiels : si oui, le bandeau `CookieNotice.jsx` devra devenir un vrai bandeau de consentement (accepter/refuser), et non plus une simple information. Vercel Analytics, cité dans `DEPLOIEMENT.md`, ne dépose aucun cookie et ne change donc rien à ce qui est en place.
- **Registre des traitements.** Ce document tient lieu de base, mais un responsable de traitement togolais doit, en principe, tenir un registre plus formel. Les informations nécessaires (finalités, catégories de données, durées) sont déjà réunies dans `/politique-confidentialite` — il s'agit surtout de les recopier dans un format adapté si l'IPDCP ou un client l'exige.
- **Relecture juridique.** Les textes de `/politique-confidentialite` et `/mentions-legales` ont été rédigés avec soin mais ne remplacent pas un avis d'avocat, en particulier si l'activité se développe (embauche, nouveaux services, partenaires).
