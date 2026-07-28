/**
 * Les clés Supabase sont facultatives.
 *
 * Sans elles, le site public fonctionne normalement en lisant le contenu
 * des fichiers de lib/. Seul le tableau de bord est indisponible, et il le
 * dit clairement plutôt que de faire tomber l'application.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_URL.startsWith('http')
);
