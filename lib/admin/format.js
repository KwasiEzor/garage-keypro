// Fonctions de formatage pures — aucune dépendance au navigateur, donc
// utilisables aussi bien depuis un composant serveur (ex. le tableau de
// bord) que depuis un composant client (les tableaux du back-office).
//
// ⚠️ Ne pas déplacer ces fonctions dans components/admin/ui.jsx : ce fichier
// porte 'use client', et toute fonction qui en est exportée devient une
// référence client — un composant serveur ne peut alors plus l'appeler
// directement (« Attempted to call X() from the server but X is on the
// client »). Elles doivent vivre dans un module sans directive.

import { site } from '../site';

export const fcfa = (n) =>
  n === null || n === undefined
    ? '—'
    : `${Number(n).toLocaleString('fr-FR').replace(/ /g, ' ')} FCFA`;

// Les dates sont affichées dans le fuseau horaire réglé depuis
// /admin/parametres (site.timezone), pas celui du serveur qui exécute le
// code — sans quoi une intervention "planifiée à 9h" pourrait s'afficher
// à une autre heure selon où l'hébergeur fait tourner la fonction.
export const dateFr = (d) =>
  d
    ? new Date(d).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: site.timezone,
      })
    : '—';

export const dateTimeFr = (d) =>
  d
    ? new Date(d).toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: site.timezone,
      })
    : '—';
