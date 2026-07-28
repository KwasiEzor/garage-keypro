import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Client Supabase côté serveur, lié aux cookies de session.
 * Soumis aux règles de sécurité (RLS) comme le client navigateur.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
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
            // Appelé depuis un composant serveur : le middleware rafraîchit
            // déjà la session, on peut ignorer.
          }
        },
      },
    }
  );
}

/** L'utilisateur courant est-il administrateur ? */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null, supabase };

  const { data: profile } = await supabase
    .from('admin_users')
    .select('id, full_name, role')
    .eq('id', user.id)
    .maybeSingle();

  return { user, profile, supabase };
}
