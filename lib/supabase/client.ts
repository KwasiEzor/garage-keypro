'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './config';

/**
 * Client Supabase pour le navigateur. Soumis aux règles de sécurité (RLS).
 * Renvoie `null` si les clés ne sont pas renseignées.
 *
 * Le type `Database` donne l'autocomplétion sur les tables et les colonnes,
 * et signale à la compilation une colonne mal orthographiée.
 */
export function createClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient<Database>(SUPABASE_URL!, SUPABASE_ANON_KEY!);
}

/** Type du client, pour annoter une variable ou un paramètre. */
export type SupabaseBrowserClient = NonNullable<ReturnType<typeof createClient>>;
