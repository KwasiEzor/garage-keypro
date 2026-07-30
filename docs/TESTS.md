# Tests automatisés

Trois suites, trois rôles. Aucune ne remplace les autres.

| Suite | Outil | Ce qu'elle couvre | Réseau / secrets requis | Lancée automatiquement |
|---|---|---|---|---|
| `tests/unit` | Vitest | Fonctions pures de `lib/` : formatage téléphone/dates/FCFA, libellés de statuts, parité FR/EN des dictionnaires | Non | Oui — chaque push/PR |
| `tests/e2e` | Playwright | Parcours réels dans un navigateur : accueil, navigation, bascule de langue, formulaire de contact, page 404, `/admin` sans session, `robots.txt`/`sitemap.xml` | Non (mais un vrai serveur Next doit tourner) | Oui — chaque push/PR |
| `tests/security` | Vitest + `@supabase/supabase-js` | Politiques RLS du vrai projet Supabase : ce qu'un visiteur anonyme peut/ne peut pas lire ou écrire | Oui — `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Non — seulement `workflow_dispatch` manuel |

## Lancer en local

```bash
npm install

npm test              # tests/unit — instantané, aucune dépendance externe
npm run test:e2e       # tests/e2e — lance un serveur Next puis Chromium
npm run test:e2e:ui    # la même chose, avec l'interface de debug Playwright
npm run test:security  # tests/security — nécessite .env.local rempli
npm run test:all       # typecheck + lint + tests/unit + build, dans cet ordre
```

`npm run test:e2e` télécharge les navigateurs Playwright la première fois :

```bash
npx playwright install --with-deps chromium
```

## Pourquoi `tests/security` ne tourne jamais automatiquement

Cette suite **écrit réellement** dans `quote_requests` (et nettoie ensuite via la clé de service). La lancer sur chaque PR risquerait de polluer la base de production avec des données de test si les secrets étaient mal isolés. Elle est donc :

- gardée par un `describe.skipIf` qui s'auto-désactive si les variables d'environnement manquent (jamais un échec silencieux : un message explicite s'affiche) ;
- accessible en CI uniquement via un déclenchement manuel (`workflow_dispatch`) dans `.github/workflows/ci.yml`, jamais sur `push`/`pull_request`.

**Recommandé** : faire pointer ces trois variables d'environnement vers une branche Supabase de développement plutôt que vers le projet de production, pour ne jamais risquer d'y écrire quoi que ce soit. Les outils MCP `create_branch` / `list_branches` sont disponibles si besoin.

## Ce qui est vérifié dans ce dépôt vs. ce qui nécessite votre machine/CI

L'environnement qui a écrit ces tests ne peut pas exécuter `npm install`, `next dev`, `next build`, Vitest ou Playwright (réseau restreint, binaire `next/swc` absent pour Linux). Ce qui a été vérifié malgré tout, sans ces outils :

- **`tsc --noEmit`** : aucune erreur de type sur l'ensemble du projet.
- **Analyse statique manuelle** : chaque fonction/export référencé par un test (`lib/site.js`, `lib/admin/format.js`, `lib/admin/labels.ts`, `lib/dictionaries.js`) a été relu pour confirmer que les assertions correspondent au code réel, pas à une supposition.
- **Vérification live des politiques RLS** : chaque scénario de `tests/security/rls.test.js` a d'abord été rejoué à la main via `execute_sql` (`set local role anon; …; rollback;`) directement contre le projet Supabase, avant d'être encodé en test — les résultats obtenus (rejet 42501 sur les insertions non conformes, lignes vides plutôt qu'erreur sur les lectures/écritures bloquées) sont ceux qui figurent dans les commentaires du fichier.
- **`node --check`** sur tous les fichiers de test et de configuration : aucune erreur de syntaxe.

Ce qui reste à faire **de votre côté**, une seule fois :

```bash
npm install
npm run test:all
npx playwright install --with-deps chromium
npm run test:e2e
```

Si tout est vert, poussez sur `main` : la CI (voir ci-dessous) rejoue exactement les mêmes commandes à chaque changement.

## Intégration continue

`.github/workflows/ci.yml` définit trois jobs :

1. **`quality`** (chaque push/PR) : `npm ci` → typecheck → lint → `tests/unit` → build. Aucun secret nécessaire.
2. **`e2e`** (chaque push/PR, après `quality`) : build + serveur de prod + Playwright/Chromium. Fonctionne même sans secrets Supabase (l'espace admin affiche alors l'écran « non configuré » plutôt que le formulaire de connexion — les tests acceptent les deux cas).
3. **`security`** (déclenchement manuel uniquement) : `tests/security`, avec les trois secrets Supabase renseignés dans les réglages du dépôt GitHub (Settings → Secrets and variables → Actions).

## Ajouter un test

- Une fonction pure dans `lib/` → `tests/unit/`.
- Un parcours utilisateur (clic, navigation, formulaire) → `tests/e2e/`.
- Une politique RLS ou un comportement propre à Supabase → `tests/security/`, en vérifiant d'abord le comportement réel via SQL avant de l'encoder (les erreurs RLS ne sont pas toujours ce qu'on imagine : une lecture bloquée renvoie un tableau vide, pas une erreur ; seule une écriture qui viole un `WITH CHECK` lève une vraie erreur `42501`).
