import type { JobStatus, KeyType, QuoteSource, QuoteStatus } from '@/types/database';

/**
 * Libellés et couleurs des statuts, partagés par tout le tableau de bord.
 *
 * Les clés sont typées contre les unions de types/database.ts : ajouter un
 * statut en base sans l'ajouter ici devient une erreur de compilation.
 */

type Etiquette = { label: string; tone: 'neutre' | 'info' | 'attente' | 'succes' | 'danger' };

export const QUOTE_STATUS: Record<QuoteStatus, Etiquette> = {
  nouvelle:     { label: 'Nouvelle',     tone: 'danger' },
  en_cours:     { label: 'En cours',     tone: 'attente' },
  devis_envoye: { label: 'Devis envoyé', tone: 'info' },
  acceptee:     { label: 'Acceptée',     tone: 'succes' },
  refusee:      { label: 'Refusée',      tone: 'neutre' },
  close:        { label: 'Classée',      tone: 'neutre' },
};

export const JOB_STATUS: Record<JobStatus, Etiquette> = {
  planifiee: { label: 'Planifiée', tone: 'info' },
  en_cours:  { label: 'En cours',  tone: 'attente' },
  terminee:  { label: 'Terminée',  tone: 'succes' },
  facturee:  { label: 'Facturée',  tone: 'succes' },
  annulee:   { label: 'Annulée',   tone: 'neutre' },
};

export const KEY_TYPES: Record<KeyType, string> = {
  mecanique:    'Clé mécanique',
  transpondeur: 'Clé à transpondeur',
  smart_key:    'Smart key',
  telecommande: 'Télécommande',
  inconnu:      'Non renseigné',
};

export const QUOTE_SOURCES: Record<QuoteSource, string> = {
  site:      'Site web',
  whatsapp:  'WhatsApp',
  telephone: 'Téléphone',
  visite:    'Visite à l’atelier',
};
