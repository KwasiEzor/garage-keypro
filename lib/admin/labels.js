/** Libellés et couleurs des statuts, partagés par tout le tableau de bord. */

export const QUOTE_STATUS = {
  nouvelle:     { label: 'Nouvelle',      tone: 'danger' },
  en_cours:     { label: 'En cours',      tone: 'attente' },
  devis_envoye: { label: 'Devis envoyé',  tone: 'info' },
  acceptee:     { label: 'Acceptée',      tone: 'succes' },
  refusee:      { label: 'Refusée',       tone: 'neutre' },
  close:        { label: 'Classée',       tone: 'neutre' },
};

export const JOB_STATUS = {
  planifiee: { label: 'Planifiée', tone: 'info' },
  en_cours:  { label: 'En cours',  tone: 'attente' },
  terminee:  { label: 'Terminée',  tone: 'succes' },
  facturee:  { label: 'Facturée',  tone: 'succes' },
  annulee:   { label: 'Annulée',   tone: 'neutre' },
};

export const KEY_TYPES = {
  mecanique:    'Clé mécanique',
  transpondeur: 'Clé à transpondeur',
  smart_key:    'Smart key',
  telecommande: 'Télécommande',
  inconnu:      'Non renseigné',
};

export const QUOTE_SOURCES = {
  site:      'Site web',
  whatsapp:  'WhatsApp',
  telephone: 'Téléphone',
  visite:    'Visite à l’atelier',
};
