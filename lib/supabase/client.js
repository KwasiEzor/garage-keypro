'use client';

import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './config';

/**
 * Client Supabase pour le navigateur. Soumis aux règles de sécurité (RLS).
 * Renvoie `null` si les clés ne sont pas renseignées.
 */
export function createClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
