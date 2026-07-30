# Audit avant mise en production

Revue technique du 30 juillet 2026 — architecture, sécurité, UX/UI et préparation au déploiement. Deux failles trouvées ici ont déjà été corrigées (voir § Corrigé pendant l'audit) ; le reste est une liste priorisée, pas encore appliquée.

---

## Ce qui est solide

**La sécurité repose sur la base, pas sur l'interface.** 38 politiques RLS, des fonctions `SECURITY DEFINER` correctement isolées pour éviter la récursion (piège déjà rencontré et documenté), et une règle constante : même quelqu'un qui appellerait l'API Supabase directement, en contournant complètement le site, se heurnerait aux mêmes règles. C'est la bonne architecture, et peu de projets de cette taille l'appliquent aussi systématiquement.

**La clé de service ne fuit jamais.** Vérifié par grep sur tout le dépôt : elle n'apparaît que dans `scripts/create-admin.mjs`, `scripts/seed.mjs` et `app/admin/api/team/route.js` — trois fichiers strictement serveur. Aucun composant client n'y touche.

**Le site se dégrade gracieusement, partout.** Sans clés Supabase : le site public tourne quand même sur les fichiers `lib/`. Sans clé Anthropic : le chatbot bascule sur ses réponses locales. Base injoignable : `/admin` l'explique au lieu de planter. C'est le genre de discipline qui évite les pannes en cascade, et elle est appliquée de façon cohérente sur tout le projet plutôt qu'à moitié.

**RGPD et SEO déjà traités sérieusement** (sessions précédentes) : consentement imposé par une contrainte RLS et pas seulement une case à cocher, pages légales bilingues, métadonnées par page, sitemap, données structurées, `noindex` sur `/admin` à trois niveaux indépendants.

**Documentation à jour et alignée avec le code.** `schema.sql` reflète l'état réel de la base (vérifié par requête), les docs métier (`TABLEAU-DE-BORD.md`, `CONFORMITE.md`) sont détaillées et cohérentes avec ce qui existe vraiment — pas une aspiration.

**Adoption pragmatique de TypeScript** : uniquement sur la couche base de données, sans réécrire 49 fichiers `.js` qui fonctionnent déjà. Bon rapport effort/bénéfice.

---

## Corrigé pendant cet audit

Deux problèmes trouvés en creusant, réglés immédiatement car ce sont des régressions pures (aucune ambiguïté sur le correctif) :

1. **`next.config.mjs` n'autorisait pas le domaine Supabase Storage.** Toute image envoyée depuis `/admin` (fonctionnalité livrée la session précédente) aurait fait planter `next/image` en production avec *"hostname not configured"*. Invisible en développement, certain en production. → `remotePatterns` complété.
2. **Le bucket `site-media` n'imposait aucune limite côté serveur.** La limite de 8 Mo et les types de fichiers acceptés n'existaient que dans `ImageUpload.jsx` — contournables par un appel direct à l'API. → Le bucket lui-même refuse maintenant tout fichier hors JPEG/PNG/WebP/GIF/AVIF ou au-delà de 8 Mo. `schema.sql` mis à jour pour qu'une base recréée à neuf soit dans le même état.

---

## À corriger avant la mise en ligne (P0)

| # | Constat | Pourquoi ça compte | Effort |
|---|---|---|---|
| 1 | **Aucun en-tête de sécurité** (CSP, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) — `next.config.mjs` n'a pas de bloc `headers()` | Protection de base contre le clickjacking et l'injection de contenu. Standard sur tout site en production. | ~30 min |
| 2 | **`/api/chat` n'a aucune limite de débit** | Si `ANTHROPIC_API_KEY` est activée, n'importe qui peut appeler cette route en boucle — coût réel, sans plafond technique. La doc dit « surveillez la consommation », mais rien ne l'impose. | ~1 h (même mécanisme que le trigger sur `quote_requests`, adapté à une route API) |
| 3 | **Zéro test automatisé** | Le bug `fcfa() from the server` corrigé récemment aurait été attrapé par un test d'intégration minimal sur les pages admin. Pour un système qui touche à l'argent (montants d'intervention) et aux données personnelles, s'appuyer uniquement sur la relecture manuelle est fragile à mesure que le projet grossit. | Variable — voir recommandation ci-dessous |

## Important, mais pas bloquant (P1)

| # | Constat | Recommandation |
|---|---|---|
| 4 | Pas de `error.jsx` / `global-error.jsx` dans l'arborescence `app/` (seul `not-found.jsx` existe) | Ajouter un `error.jsx` par groupe de routes (`(site)` et `admin`) pour afficher un écran de secours plutôt que l'écran d'erreur générique de Next.js |
| 5 | Pas de `loading.jsx` — `/admin` et `/admin/contenu` lancent chacun une dizaine de requêtes Supabase en parallèle et n'affichent rien tant que tout n'a pas répondu | Un simple squelette (`loading.jsx`) change beaucoup la perception de vitesse, en particulier sur connexion mobile — le public visé selon vos propres docs |
| 6 | Les fenêtres modales du tableau de bord (`components/admin/ui.jsx` → `Modal`, utilisées 5 fois dans Devis/Clients/Interventions) ne se ferment pas avec **Échap** et ne gèrent pas le focus clavier | Corriger une fois dans `Modal` bénéficie aux cinq écrans instantanément |
| 7 | Le formulaire de contact n'affiche aucun état « envoi en cours » — le bouton reste cliquable pendant l'insertion en base | Désactiver le bouton pendant `handleSubmit`, comme le fait déjà `SaveButton` côté admin |
| 8 | Le champ newsletter du pied de page ne fait rien (`e.preventDefault()` sans envoi réel) | Le brancher ou le retirer avant le lancement — un visiteur qui s'inscrit et ne reçoit jamais rien nuit à la confiance |
| 9 | Pas de suivi d'erreurs (Sentry ou équivalent) ni de journal d'audit sur les actions admin (qui a supprimé quel client, modifié quel montant) | Acceptable à un seul utilisateur ; à prévoir dès que l'équipe dépasse 1-2 personnes |
| 10 | Aucun pipeline CI (`.github/workflows` absent) | Même minimal — `npm run typecheck` + `npm run build` sur chaque push — ça empêche un code cassé d'atteindre `main` |
| 11 | Impossible de lancer `npm audit` depuis cet environnement (registre bloqué) | À faire une fois localement avant le déploiement : `npm audit --audit-level=high` |

## Cosmétique / à surveiller (P2)

- **Politiques RLS redondantes** sur une douzaine de tables de contenu (`services`, `settings`, `testimonials`…) : la politique `ecriture admin` (`FOR ALL`) et `lecture publique` s'exécutent toutes les deux pour un administrateur qui lit ces tables. Sans impact mesurable au volume actuel ; à corriger en séparant lecture/écriture (même schéma que ce qui a déjà été fait sur `admin_users`) si la charge augmente.
- Deux clés étrangères sans index (`jobs.quote_request_id`, `quote_requests.handled_by`) — signalées par l'outil d'analyse Supabase, impact négligeable au volume actuel.
- Versions de dépendances très récentes (Next 16.2, React 19) : bon pour la durée de vie, mais moins de retours d'expérience communautaire en cas de bug obscur. Envisager de figer les versions exactes (sans `^`) avant le premier déploiement, pour ne pas hériter d'une mise à jour mineure inattendue.
- Les avertissements Supabase déjà connus restent ouverts : protection contre les mots de passe compromis (2 clics dans le tableau de bord Supabase, voir `TABLEAU-DE-BORD.md`), et les fonctions `is_admin()`/`is_owner()` appelables par un compte connecté (sans risque, elles ne répondent que « cette personne est-elle admin ? » à propos d'elle-même).

---

## Sur les tests, concrètement

Vu la taille du projet, je ne recommande pas une suite exhaustive du jour au lendemain. Un ordre de priorité réaliste :

1. **Un test par politique RLS critique** (le dépôt public de `quote_requests` sans consentement doit échouer, un `staff` ne doit jamais lire les clients d'un autre… ce genre de garantie). C'est la partie qui protège des données réelles.
2. **Un test end-to-end du parcours de devis** (formulaire → dépôt en base → apparition dans `/admin/devis`) — c'est le chemin qui génère du chiffre d'affaires.
3. Le reste (composants UI, animations) peut attendre — ce sont les parties les plus visibles mais les moins risquées si elles cassent.

---

## Ce que je recommande de faire maintenant

Si vous voulez avancer tout de suite, je peux implémenter, par ordre d'impact :

1. Les en-têtes de sécurité (`next.config.mjs`) — rapide, sans risque.
2. La limite de débit sur `/api/chat`.
3. `error.jsx` + `loading.jsx` pour les deux groupes de routes, et le correctif Échap/focus sur `Modal` (un seul fichier, cinq écrans améliorés).
4. Désactiver le bouton du formulaire de contact pendant l'envoi.

Dites-moi lesquels lancer — je peux les faire tous à la suite ou un par un selon ce que vous voulez valider en premier.
