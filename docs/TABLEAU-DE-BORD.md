# Tableau de bord

Un espace privé sur `/admin` pour gérer le contenu du site, les demandes de devis, les interventions et le fichier client — depuis un ordinateur ou un téléphone.

---

## Mise en route

### 1. Renseigner les clés

Copiez `.env.example` en `.env.local` et complétez :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://kmsriyxbxkmxsyxwxjjf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_vD2ZRIwGfQOcsumruN8GDQ_CrBlMDb3
SUPABASE_SERVICE_ROLE_KEY=<à récupérer>
```

La **clé de service** se trouve dans Supabase → *Project Settings* → *API* → `service_role`. Elle contourne toutes les règles de sécurité : elle ne doit jamais aller dans le navigateur, ni dans git. Elle ne sert qu'aux deux scripts ci-dessous.

### 2. Installer et importer le contenu

```bash
npm install
npm run db:seed
```

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

## Les cinq espaces

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
| Galerie | Les images de la page Galerie |
| Chatbot | Les mots déclencheurs et les réponses de l'assistant |
| Visuels | Les images du héros, des bandeaux de page et du collage |

Chaque texte se saisit **en français et en anglais côte à côte**. Si l'anglais reste vide, le français prend le relais.

Les éléments ont une case **« Visible sur le site »** : décochez-la pour masquer sans supprimer.

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
| Comptes d'administration | Aucun accès | Lecture ; création réservée au responsable |

Le dépôt d'une demande est borné : le visiteur ne choisit ni le statut, ni l'affectation, ni la note interne, et les champs sont limités en longueur.

### Ce qui reste à surveiller

**Le formulaire public n'a pas de limite de débit.** Rien n'empêche aujourd'hui quelqu'un d'envoyer des centaines de demandes. Si cela devient un problème, ajoutez un CAPTCHA (hCaptcha, Turnstile) ou une limite par adresse IP via une Edge Function.

**Un avertissement de sécurité subsiste volontairement** dans Supabase : la fonction `is_admin()` est appelable par les comptes connectés. Elle ne révèle rien — elle répond seulement « cette personne est-elle administratrice ? » à propos d'elle-même — et les règles de sécurité en dépendent.

---

## Ajouter une personne à l'équipe

```bash
npm run db:admin -- collegue@email.com "MotDePasse" "Prénom Nom" staff
```

Les rôles `owner` et `staff` ont aujourd'hui les mêmes droits sur le contenu et l'exploitation ; seul `owner` peut gérer les comptes. Si vous voulez restreindre `staff` — par exemple lui interdire l'accès aux montants — cela se fait dans les règles de sécurité de la base, pas dans l'interface.

---

## Sauvegarde

Supabase sauvegarde automatiquement la base sur l'offre gratuite, avec 7 jours d'historique. Pour une copie que vous maîtrisez : *Database* → *Backups* → téléchargement manuel, ou `pg_dump` depuis votre machine.

Le dépôt git ne contient **pas** les données d'exploitation — clients, devis et interventions vivent uniquement dans la base.

---

## En cas de problème

| Symptôme | Cause probable |
|---|---|
| `/admin` renvoie sans cesse à la connexion | Cookies bloqués, ou variables `NEXT_PUBLIC_*` absentes |
| « Accès non autorisé » après connexion | Le compte existe mais `npm run db:admin` n'a pas été lancé |
| L'onglet Contenu dit que la base est vide | `npm run db:seed` n'a pas encore tourné |
| Le site affiche l'ancien contenu | Le layout est mis en cache — relancez le serveur, ou déployez |
| Le formulaire ne remonte pas dans le tableau de bord | Vérifiez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` en production |
