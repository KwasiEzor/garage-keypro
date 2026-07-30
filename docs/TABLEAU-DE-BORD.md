# Tableau de bord

Un espace privé sur `/admin` pour gérer le contenu du site, les demandes de devis, les interventions, le fichier client, l'équipe et les réglages — depuis un ordinateur ou un téléphone.

---

## Mise en route

### 1. Renseigner les clés

Copiez `.env.example` en `.env.local` et complétez :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://kmsriyxbxkmxsyxwxjjf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_vD2ZRIwGfQOcsumruN8GDQ_CrBlMDb3
SUPABASE_SERVICE_ROLE_KEY=<à récupérer>
```

La **clé de service** se trouve dans Supabase → *Project Settings* → *API* → `service_role`. Elle contourne toutes les règles de sécurité : elle ne doit jamais aller dans le navigateur, ni dans git. Elle sert aux deux scripts ci-dessous, ainsi qu'à la route serveur qui crée un compte d'équipe depuis `/admin/parametres` — jamais côté client.

### 2. Installer et importer le contenu

```bash
npm install
npm run db:seed
```

> **Les variables d'environnement ne sont lues qu'au démarrage.** Après avoir créé
> ou modifié `.env.local`, arrêtez le serveur (`Ctrl+C`) et relancez `npm run dev`.

L'import recopie les textes, services, marques, photos et horaires des fichiers `lib/` vers la base. **L'opération est rejouable** : relancer met à jour, ne duplique pas.

### 3. Créer votre compte

```bash
npm run db:admin -- votre@email.com "UnMotDePasseSolide" "Votre Nom" owner
```

Le premier compte doit être `owner` — lui seul peut ensuite ajouter d'autres personnes.

### 4. Se connecter

```bash
npm run dev
```

Puis ouvrez **http://localhost:3000/admin**

---

## Les six espaces

### Vue d'ensemble

Demandes à traiter, interventions ouvertes, activité du mois, encaissements, et les huit dernières demandes reçues.

### Demandes de devis

Chaque envoi du formulaire du site arrive ici. Filtres par statut, recherche par nom, numéro ou véhicule.

En ouvrant une demande : le détail complet, le changement de statut, une note interne, et trois raccourcis — **répondre sur WhatsApp** avec un message pré-rempli, appeler, ou répondre par e-mail. Le bouton **« Créer une intervention »** reprend la demande et crée le client au passage.

Statuts : Nouvelle → En cours → Devis envoyé → Acceptée / Refusée → Classée.

### Interventions

Le registre des travaux. Chaque intervention reçoit une référence automatique du type `KP-2026-0001`.

On y renseigne le client, le véhicule, la prestation, le technicien, la date, le montant en FCFA et le règlement. Passer une intervention en « Terminée » horodate automatiquement l'achèvement.

### Clients & véhicules

Le fichier de l'atelier. Un client peut avoir plusieurs véhicules ; chaque véhicule porte sa marque, son modèle, son année, sa plaque, son numéro de châssis et **son type de clé** — l'information la plus utile pour préparer une intervention.

La fiche client affiche l'historique complet des interventions.

La recherche fonctionne aussi par plaque et par marque.

### Contenu du site

Neuf onglets :

| Onglet | Ce qu'il pilote |
|---|---|
| Coordonnées | Téléphones, e-mail, WhatsApp, adresse, **position GPS de la carte**, horaires, réseaux sociaux, quartiers desservis |
| Textes du site | Les 147 titres et paragraphes, en français et en anglais, avec filtre par page |
| Services | Les six prestations : titre, résumé, points détaillés, image, icône |
| Marques | Un visuel par région et la liste des marques |
| Étapes & avantages | La méthode en quatre étapes et la grille d'avantages |
| Témoignages | Les avis clients |
| Galerie | Les photos de la page Galerie — réorganisables par glisser-déposer |
| Chatbot | Les mots déclencheurs et les réponses de l'assistant |
| Visuels | Les images du héros, des bandeaux de page et du collage |

Chaque texte se saisit **en français et en anglais côte à côte**. Si l'anglais reste vide, le français prend le relais.

Les éléments ont une case **« Visible sur le site »** : décochez-la pour masquer sans supprimer.

### Envoyer une image depuis l'ordinateur

Partout où une image est demandée (Services, Étapes & avantages, Marques, Visuels, Galerie), un bouton **« Envoyer une image »** téléverse un fichier directement depuis l'ordinateur ou le téléphone — plus besoin de trouver une adresse (URL) au préalable. Le fichier part vers le bucket Supabase Storage `site-media` (8 Mo maximum).

Le champ adresse reste disponible juste en dessous : une image déjà en ligne (Unsplash, un autre site) peut toujours être collée telle quelle.

Dans l'onglet **Galerie**, l'ajout se fait directement en haut de page, et chaque vignette se réordonne en la faisant glisser à un autre emplacement.

### Paramètres

Trois sections, réunies sur `/admin/parametres` :

- **Équipe** — la liste des personnes autorisées à ouvrir le tableau de bord. Le responsable (`owner`) peut y ajouter un nouveau membre (e-mail, mot de passe provisoire, rôle), changer le rôle de quelqu'un, ou lui retirer l'accès. Un membre `staff` voit la liste sans pouvoir la modifier.
- **Mon compte** — chaque personne connectée peut y changer son propre mot de passe.
- **Préférences générales** — devise, fuseau horaire et langue par défaut du site (utilisée quand le navigateur d'un visiteur n'indique ni français ni anglais).

---

## Comment le site lit ce contenu

À chaque affichage, le site interroge la base et fusionne le résultat avec les fichiers de `lib/`. La base l'emporte, le fichier comble les trous.

**Si la base est vide, injoignable ou non configurée, le site retombe silencieusement sur les fichiers.** Il n'affiche jamais de page cassée pour une panne de base de données. C'est aussi ce qui permet de développer sans connexion.

Le chargement se fait dans `lib/content.js`, appelé une fois par le layout racine.

### Une nuance à connaître

`site`, `images` et `dictionaries` sont importés directement par une vingtaine de composants. Plutôt que de câbler des propriétés partout, `lib/runtime.js` **remplace le contenu de ces objets en place** au chargement.

C'est sans risque ici parce que le contenu est le même pour tous les visiteurs. En revanche, **ne mettez jamais de donnée propre à un utilisateur dans ces objets** : elle serait visible par tout le monde.

---

## Sécurité

La base applique une sécurité au niveau des lignes (*Row Level Security*). Ce n'est pas l'interface qui protège les données, c'est la base elle-même — même quelqu'un qui appellerait l'API directement se heurterait aux mêmes règles.

| Table | Visiteur du site | Administrateur |
|---|---|---|
| Contenu publié | Lecture seule | Lecture et écriture |
| Demandes de devis | **Dépôt uniquement** — ne peut jamais relire | Tout |
| Clients, véhicules, interventions | Aucun accès | Tout |
| Comptes d'administration | Aucun accès | Lecture ; création, modification et suppression réservées au responsable |
| Images envoyées (bucket `site-media`) | Lecture (URL publique) | Envoi, remplacement et suppression |

Le dépôt d'une demande est borné : le visiteur ne choisit ni le statut, ni l'affectation, ni la note interne, et les champs sont limités en longueur.

### Limite de débit du formulaire

Un déclencheur en base pose deux garde-fous sur les dépôts venant du site :

- **3 demandes par heure** pour un même numéro de téléphone ;
- **20 demandes par tranche de 10 minutes**, toutes origines confondues.

Les demandes saisies par l'équipe depuis le tableau de bord n'y sont pas soumises — seule la source `site` est concernée.

Le blocage est **invisible pour le visiteur** : le client web ignore l'erreur, et les relais e-mail et WhatsApp continuent de fonctionner. Quelqu'un de légitime qui insiste ne se retrouve donc jamais face à un mur.

Pour ajuster les seuils, modifiez la fonction `limiter_debit_devis()` dans `supabase/schema.sql`, puis appliquez la version modifiée.

> C'est un garde-fou, pas un rempart. Un attaquant décidé changera de numéro. Si le spam devient réellement gênant, ajoutez un CAPTCHA (hCaptcha ou Turnstile, tous deux gratuits) sur le formulaire.

### Ce qui reste à faire côté Supabase

**Activer la protection contre les mots de passe compromis.** Supabase peut vérifier chaque mot de passe contre la base HaveIBeenPwned et refuser ceux qui ont fuité. C'est désactivé par défaut.

*Authentication* → *Sign In / Providers* → section **Password** → cocher **Prevent use of leaked passwords**.

Pendant que vous y êtes, portez la longueur minimale à 10 caractères pour qu'elle corresponde à ce qu'impose déjà le script `db:admin`.

**Un avertissement de sécurité subsiste volontairement** dans Supabase : les fonctions `is_admin()` et `is_owner()` sont appelables par les comptes connectés. Elles ne révèlent rien — elles répondent seulement « cette personne est-elle administratrice / responsable ? » à propos d'elle-même — et les règles de sécurité en dépendent.

### Récursion dans les politiques : le piège à connaître

Une politique posée sur `admin_users` **ne doit jamais interroger `admin_users` directement**. Postgres réévalue la politique pour lire la table, ce qui relance la politique, à l'infini :

```
ERROR: infinite recursion detected in policy for relation "admin_users"
```

Le symptôme est trompeur : la connexion réussit, `last_sign_in_at` se met à jour, mais toute lecture du profil échoue — donc le tableau de bord répond « Accès non autorisé » alors que le compte est parfaitement valide.

La parade est de passer par une fonction `SECURITY DEFINER`, qui s'exécute avec les droits de son propriétaire et contourne donc la sécurité au niveau des lignes :

```sql
create function public.is_owner() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (
  select 1 from public.admin_users where id = auth.uid() and role = 'owner'
); $$;
```

Les politiques de lecture et d'écriture sont aussi **séparées** : les règles d'écriture ne sont jamais évaluées lors d'un simple `select`.

Si vous ajoutez un jour une politique sur `admin_users`, appuyez-vous sur `is_admin()` ou `is_owner()`, jamais sur une sous-requête directe.

---

## Ajouter une personne à l'équipe

**Depuis l'interface** (le plus simple) : `/admin/parametres` → **Équipe** → *Ajouter un membre*, réservé au responsable (`owner`). Le mot de passe saisi est provisoire — la personne le change ensuite depuis **Mon compte**.

**En ligne de commande**, utile pour le tout premier compte ou en cas de souci d'accès :

```bash
npm run db:admin -- collegue@email.com "MotDePasse" "Prénom Nom" staff
```

Les rôles `owner` et `staff` ont aujourd'hui les mêmes droits sur le contenu et l'exploitation ; seul `owner` peut gérer les comptes et les préférences de l'équipe. Si vous voulez restreindre `staff` — par exemple lui interdire l'accès aux montants — cela se fait dans les règles de sécurité de la base, pas dans l'interface.

La création d'un compte passe par une route serveur (`app/admin/api/team/route.js`) qui utilise la clé de service — jamais exposée au navigateur — pour créer le compte d'authentification puis son profil. Retirer un membre ou changer son rôle, en revanche, se fait directement depuis le navigateur : ce ne sont que des écritures sur `admin_users`, déjà protégées par ses politiques de sécurité (réservées au responsable).

---

## Sauvegarde

Supabase sauvegarde automatiquement la base sur l'offre gratuite, avec 7 jours d'historique. Pour une copie que vous maîtrisez : *Database* → *Backups* → téléchargement manuel, ou `pg_dump` depuis votre machine.

Le dépôt git ne contient **pas** les données d'exploitation — clients, devis et interventions vivent uniquement dans la base.

### Le schéma est versionné

`supabase/schema.sql` décrit la **structure complète** : 17 tables, 38 politiques de sécurité (dont 3 sur le stockage des images), les index, fonctions et déclencheurs. Il ne contient **aucune donnée client** — c'est délibéré, ces informations n'ont rien à faire dans un dépôt git.

Pour recréer la base à zéro sur un nouveau projet Supabase :

1. Coller `supabase/schema.sql` dans l'éditeur SQL et exécuter
2. `npm run db:seed` — importe le contenu du site
3. `npm run db:admin -- …` — crée le premier compte

> Le fichier est prévu pour une **base vide**. Le relancer sur une base existante échouera sur les politiques, que PostgreSQL ne sait pas créer « si elles n'existent pas ». Pour modifier une base en service, écrivez une migration ciblée.

### Ce que couvre la sauvegarde automatique

L'offre gratuite conserve **7 jours** de sauvegardes quotidiennes. C'est suffisant pour rattraper une fausse manœuvre, pas pour un archivage long. Si le fichier client prend de la valeur, exportez-le périodiquement : *Database* → *Backups*, ou `pg_dump` depuis votre machine.

---

## En cas de problème

### Le site tourne-t-il sans Supabase ?

Oui. Les clés sont **facultatives** :

- sans elles, le site public lit le contenu des fichiers `lib/` et fonctionne normalement ;
- `/admin` affiche alors une page expliquant comment configurer, au lieu de planter.

C'est aussi ce qui permet de travailler hors connexion, et ce qui évite qu'une panne de base de données ne fasse tomber le site vitrine.

### Tableau des pannes

| Symptôme | Cause probable |
|---|---|
| `Your project's URL and Key are required` | Ancienne version : mettez à jour, les clés sont désormais facultatives |
| `/admin` affiche « Tableau de bord non configuré » | `.env.local` absent, ou serveur non redémarré après sa création |
| `/admin` affiche « Base injoignable » | Projet Supabase en pause — l'offre gratuite endort les projets inactifs au bout d'une semaine |
| `/admin` renvoie sans cesse à la connexion | Cookies bloqués, ou variables `NEXT_PUBLIC_*` absentes |
| « Accès non autorisé » alors que le compte existe bien | Voir « Récursion » ci-dessous |
| « Accès non autorisé » après connexion | Le compte existe mais `npm run db:admin` n'a pas été lancé |
| L'onglet Contenu dit que la base est vide | `npm run db:seed` n'a pas encore tourné |
| Le site affiche l'ancien contenu | Le layout est mis en cache — relancez le serveur, ou déployez |
| Le formulaire ne remonte pas dans le tableau de bord | Vérifiez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` en production |
