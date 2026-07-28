import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './config';

/**
 * Client Supabase côté serveur, lié aux cookies de session.
 * Renvoie `null` si les clés ne sont pas renseignées — chaque appelant
 * doit gérer ce cas plutôt que de laisser l'application tomber.
 */
export async function createClient() {
  if (!isSupabaseConfigured) return null;

  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Appelé depuis un composant serveur : le proxy rafraîchit
          // déjà la session, on peut ignorer.
        }
      },
    },
  });
}

/**
 * L'utilisateur courant est-il administrateur ?
 * `configured: false` signale que les clés manquent.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) return { configured: false, user: null, profile: null, supabase: null };

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { configured: true, user: null, profile: null, supabase };

    const { data: profile } = await supabase
      .from('admin_users')
      .select('id, full_name, role')
      .eq('id', user.id)
      .maybeSingle();

    return { configured: true, user, profile, supabase };
  } catch {
    return { configured: true, user: null, profile: null, supabase, unreachable: true };
  }
}
