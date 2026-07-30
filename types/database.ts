/**
 * ⚠️ Fichier généré depuis le schéma Supabase — ne pas modifier à la main.
 *
 * Régénérer après chaque migration :
 *   npm run db:types
 *
 * Chaque table expose trois formes :
 *   Row    — ce que la base renvoie
 *   Insert — ce qu'on peut lui envoyer à la création (colonnes à défaut optionnelles)
 *   Update — idem, tout est optionnel
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  __InternalSupabase: { PostgrestVersion: '14.5' };
  public: {
    Tables: {
      /* ─────────────── Exploitation ─────────────── */

      admin_users: {
        Row: {
          created_at: string; email: string | null; full_name: string | null;
          id: string; role: string;
        };
        Insert: {
          created_at?: string; email?: string | null; full_name?: string | null;
          id: string; role?: string;
        };
        Update: {
          created_at?: string; email?: string | null; full_name?: string | null;
          id?: string; role?: string;
        };
        Relationships: [];
      };

      quote_requests: {
        Row: {
          consent: boolean; created_at: string; email: string | null; handled_at: string | null;
          handled_by: string | null; id: string; internal_note: string | null;
          locale: string; message: string; mode: string | null; name: string;
          phone: string; preferred_date: string | null; service: string | null;
          source: string; status: string; vehicle: string | null;
        };
        Insert: {
          consent?: boolean; created_at?: string; email?: string | null; handled_at?: string | null;
          handled_by?: string | null; id?: string; internal_note?: string | null;
          locale?: string; message: string; mode?: string | null; name: string;
          phone: string; preferred_date?: string | null; service?: string | null;
          source?: string; status?: string; vehicle?: string | null;
        };
        Update: {
          consent?: boolean; created_at?: string; email?: string | null; handled_at?: string | null;
          handled_by?: string | null; id?: string; internal_note?: string | null;
          locale?: string; message?: string; mode?: string | null; name?: string;
          phone?: string; preferred_date?: string | null; service?: string | null;
          source?: string; status?: string; vehicle?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'quote_requests_handled_by_fkey';
            columns: ['handled_by'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
        ];
      };

      customers: {
        Row: {
          address: string | null; created_at: string; email: string | null; id: string;
          name: string; note: string | null; phone: string; updated_at: string;
        };
        Insert: {
          address?: string | null; created_at?: string; email?: string | null; id?: string;
          name: string; note?: string | null; phone: string; updated_at?: string;
        };
        Update: {
          address?: string | null; created_at?: string; email?: string | null; id?: string;
          name?: string; note?: string | null; phone?: string; updated_at?: string;
        };
        Relationships: [];
      };

      vehicles: {
        Row: {
          created_at: string; customer_id: string; id: string; key_type: string | null;
          make: string; model: string | null; note: string | null; plate: string | null;
          vin: string | null; year: number | null;
        };
        Insert: {
          created_at?: string; customer_id: string; id?: string; key_type?: string | null;
          make: string; model?: string | null; note?: string | null; plate?: string | null;
          vin?: string | null; year?: number | null;
        };
        Update: {
          created_at?: string; customer_id?: string; id?: string; key_type?: string | null;
          make?: string; model?: string | null; note?: string | null; plate?: string | null;
          vin?: string | null; year?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'vehicles_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
        ];
      };

      jobs: {
        Row: {
          amount_fcfa: number | null; completed_at: string | null; created_at: string;
          customer_id: string | null; description: string | null; id: string;
          is_mobile: boolean; location: string | null; paid: boolean;
          quote_request_id: string | null; reference: string | null; scheduled_at: string | null;
          service_slug: string | null; status: string; technician: string | null;
          title: string; updated_at: string; vehicle_id: string | null;
        };
        Insert: {
          amount_fcfa?: number | null; completed_at?: string | null; created_at?: string;
          customer_id?: string | null; description?: string | null; id?: string;
          is_mobile?: boolean; location?: string | null; paid?: boolean;
          quote_request_id?: string | null; reference?: string | null; scheduled_at?: string | null;
          service_slug?: string | null; status?: string; technician?: string | null;
          title: string; updated_at?: string; vehicle_id?: string | null;
        };
        Update: {
          amount_fcfa?: number | null; completed_at?: string | null; created_at?: string;
          customer_id?: string | null; description?: string | null; id?: string;
          is_mobile?: boolean; location?: string | null; paid?: boolean;
          quote_request_id?: string | null; reference?: string | null; scheduled_at?: string | null;
          service_slug?: string | null; status?: string; technician?: string | null;
          title?: string; updated_at?: string; vehicle_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'jobs_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'jobs_quote_request_id_fkey';
            columns: ['quote_request_id'];
            isOneToOne: false;
            referencedRelation: 'quote_requests';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'jobs_vehicle_id_fkey';
            columns: ['vehicle_id'];
            isOneToOne: false;
            referencedRelation: 'vehicles';
            referencedColumns: ['id'];
          },
        ];
      };

      /* ─────────────── Contenu du site ─────────────── */

      settings: {
        Row: {
          address: Json; business_name: string; country_code: string; currency: string;
          default_locale: string; email: string; geo: Json; hours: Json; id: boolean;
          phones: string[]; social: Json; timezone: string; updated_at: string; whatsapp: string;
        };
        Insert: {
          address?: Json; business_name?: string; country_code?: string; currency?: string;
          default_locale?: string; email: string; geo?: Json; hours?: Json; id?: boolean;
          phones?: string[]; social?: Json; timezone?: string; updated_at?: string; whatsapp: string;
        };
        Update: {
          address?: Json; business_name?: string; country_code?: string; currency?: string;
          default_locale?: string; email?: string; geo?: Json; hours?: Json; id?: boolean;
          phones?: string[]; social?: Json; timezone?: string; updated_at?: string; whatsapp?: string;
        };
        Relationships: [];
      };

      coverage_zones: {
        Row: { id: string; name: string; position: number; published: boolean };
        Insert: { id?: string; name: string; position?: number; published?: boolean };
        Update: { id?: string; name?: string; position?: number; published?: boolean };
        Relationships: [];
      };

      page_texts: {
        Row: { en: string; fr: string; key: string; note: string | null; updated_at: string };
        Insert: { en?: string; fr?: string; key: string; note?: string | null; updated_at?: string };
        Update: { en?: string; fr?: string; key?: string; note?: string | null; updated_at?: string };
        Relationships: [];
      };

      services: {
        Row: {
          details_en: string[]; details_fr: string[]; icon: string; id: string;
          image_alt_en: string | null; image_alt_fr: string | null; image_url: string | null;
          position: number; published: boolean; short_en: string; short_fr: string;
          slug: string; title_en: string; title_fr: string; updated_at: string;
        };
        Insert: {
          details_en?: string[]; details_fr?: string[]; icon?: string; id?: string;
          image_alt_en?: string | null; image_alt_fr?: string | null; image_url?: string | null;
          position?: number; published?: boolean; short_en?: string; short_fr?: string;
          slug: string; title_en: string; title_fr: string; updated_at?: string;
        };
        Update: {
          details_en?: string[]; details_fr?: string[]; icon?: string; id?: string;
          image_alt_en?: string | null; image_alt_fr?: string | null; image_url?: string | null;
          position?: number; published?: boolean; short_en?: string; short_fr?: string;
          slug?: string; title_en?: string; title_fr?: string; updated_at?: string;
        };
        Relationships: [];
      };

      brand_regions: {
        Row: {
          id: string; image_alt_en: string | null; image_alt_fr: string | null;
          image_url: string | null; name_en: string; name_fr: string;
          position: number; published: boolean;
        };
        Insert: {
          id?: string; image_alt_en?: string | null; image_alt_fr?: string | null;
          image_url?: string | null; name_en: string; name_fr: string;
          position?: number; published?: boolean;
        };
        Update: {
          id?: string; image_alt_en?: string | null; image_alt_fr?: string | null;
          image_url?: string | null; name_en?: string; name_fr?: string;
          position?: number; published?: boolean;
        };
        Relationships: [];
      };

      brands: {
        Row: { id: string; name: string; position: number; published: boolean; region_id: string };
        Insert: { id?: string; name: string; position?: number; published?: boolean; region_id: string };
        Update: { id?: string; name?: string; position?: number; published?: boolean; region_id?: string };
        Relationships: [
          {
            foreignKeyName: 'brands_region_id_fkey';
            columns: ['region_id'];
            isOneToOne: false;
            referencedRelation: 'brand_regions';
            referencedColumns: ['id'];
          },
        ];
      };

      process_steps: {
        Row: {
          id: string; image_alt_en: string | null; image_alt_fr: string | null;
          image_url: string | null; position: number; published: boolean;
          text_en: string; text_fr: string; title_en: string; title_fr: string;
        };
        Insert: {
          id?: string; image_alt_en?: string | null; image_alt_fr?: string | null;
          image_url?: string | null; position?: number; published?: boolean;
          text_en?: string; text_fr?: string; title_en: string; title_fr: string;
        };
        Update: {
          id?: string; image_alt_en?: string | null; image_alt_fr?: string | null;
          image_url?: string | null; position?: number; published?: boolean;
          text_en?: string; text_fr?: string; title_en?: string; title_fr?: string;
        };
        Relationships: [];
      };

      advantages: {
        Row: {
          icon: string; id: string; image_alt_en: string | null; image_alt_fr: string | null;
          image_url: string | null; position: number; published: boolean;
          text_en: string; text_fr: string; title_en: string; title_fr: string;
        };
        Insert: {
          icon?: string; id?: string; image_alt_en?: string | null; image_alt_fr?: string | null;
          image_url?: string | null; position?: number; published?: boolean;
          text_en?: string; text_fr?: string; title_en: string; title_fr: string;
        };
        Update: {
          icon?: string; id?: string; image_alt_en?: string | null; image_alt_fr?: string | null;
          image_url?: string | null; position?: number; published?: boolean;
          text_en?: string; text_fr?: string; title_en?: string; title_fr?: string;
        };
        Relationships: [];
      };

      testimonials: {
        Row: {
          author: string; created_at: string; id: string; position: number; published: boolean;
          quote_en: string; quote_fr: string; rating: number;
          role_en: string | null; role_fr: string | null;
        };
        Insert: {
          author: string; created_at?: string; id?: string; position?: number; published?: boolean;
          quote_en: string; quote_fr: string; rating?: number;
          role_en?: string | null; role_fr?: string | null;
        };
        Update: {
          author?: string; created_at?: string; id?: string; position?: number; published?: boolean;
          quote_en?: string; quote_fr?: string; rating?: number;
          role_en?: string | null; role_fr?: string | null;
        };
        Relationships: [];
      };

      gallery_items: {
        Row: {
          caption_en: string; caption_fr: string; credit: string | null; id: string;
          image_url: string; position: number; published: boolean;
        };
        Insert: {
          caption_en?: string; caption_fr?: string; credit?: string | null; id?: string;
          image_url: string; position?: number; published?: boolean;
        };
        Update: {
          caption_en?: string; caption_fr?: string; credit?: string | null; id?: string;
          image_url?: string; position?: number; published?: boolean;
        };
        Relationships: [];
      };

      chatbot_answers: {
        Row: {
          id: string; keys_en: string[]; keys_fr: string[]; position: number;
          published: boolean; text_en: string; text_fr: string;
        };
        Insert: {
          id?: string; keys_en?: string[]; keys_fr?: string[]; position?: number;
          published?: boolean; text_en?: string; text_fr?: string;
        };
        Update: {
          id?: string; keys_en?: string[]; keys_fr?: string[]; position?: number;
          published?: boolean; text_en?: string; text_fr?: string;
        };
        Relationships: [];
      };

      media_slots: {
        Row: {
          alt_en: string | null; alt_fr: string | null; credit: string | null;
          image_url: string; slot: string; updated_at: string;
        };
        Insert: {
          alt_en?: string | null; alt_fr?: string | null; credit?: string | null;
          image_url: string; slot: string; updated_at?: string;
        };
        Update: {
          alt_en?: string | null; alt_fr?: string | null; credit?: string | null;
          image_url?: string; slot?: string; updated_at?: string;
        };
        Relationships: [];
      };
    };

    Views: { [_ in never]: never };

    Functions: {
      is_admin: { Args: never; Returns: boolean };
      is_owner: { Args: never; Returns: boolean };
    };

    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

/* ═══════════════ Raccourcis ═══════════════
 *
 * Remplacent les génériques verbeux produits par Supabase.
 *
 *   type Devis = Row<'quote_requests'>
 *   type NouveauClient = Insert<'customers'>
 *   type MajIntervention = Update<'jobs'>
 */

type PublicTables = Database['public']['Tables'];

export type TableName = keyof PublicTables;

export type Row<T extends TableName> = PublicTables[T]['Row'];
export type Insert<T extends TableName> = PublicTables[T]['Insert'];
export type Update<T extends TableName> = PublicTables[T]['Update'];

/* ═══════════════ Valeurs contraintes ═══════════════
 *
 * PostgreSQL les impose par des contraintes CHECK ; TypeScript ne peut pas
 * les déduire. On les redit ici pour bénéficier de l'autocomplétion.
 * ⚠️ À tenir à jour avec supabase/schema.sql.
 */

export type QuoteStatus =
  | 'nouvelle' | 'en_cours' | 'devis_envoye' | 'acceptee' | 'refusee' | 'close';

export type QuoteSource = 'site' | 'whatsapp' | 'telephone' | 'visite';

export type JobStatus = 'planifiee' | 'en_cours' | 'terminee' | 'facturee' | 'annulee';

export type KeyType = 'mecanique' | 'transpondeur' | 'smart_key' | 'telecommande' | 'inconnu';

export type AdminRole = 'owner' | 'staff';

export type Locale = 'fr' | 'en';
