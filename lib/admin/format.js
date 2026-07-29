// Fonctions de formatage pures — aucune dépendance au navigateur, donc
// utilisables aussi bien depuis un composant serveur (ex. le tableau de
// bord) que depuis un composant client (les tableaux du back-office).
//
// ⚠️ Ne pas déplacer ces fonctions dans components/admin/ui.jsx : ce fichier
// porte 'use client', et toute fonction qui en est exportée devient une
// référence client — un composant serveur ne peut alors plus l'appeler
// directement (« Attempted to call X() from the server but X is on the
// client »). Elles doivent vivre dans un module sans directive.

export const fcfa = (n) =>
  n === null || n === undefined
    ? '—'
    : `${Number(n).toLocaleString('fr-FR').replace(/ /g, ' ')} FCFA`;

export const dateFr = (d) =>
  d
    ? new Date(d).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—';

export const dateTimeFr = (d) =>
  d
    ? new Date(d).toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';
