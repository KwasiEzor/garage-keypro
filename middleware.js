import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from '@/lib/supabase/config';

/**
 * Rafraîchit la session à chaque requête et ferme /admin aux visiteurs.
 *
 * Si les clés Supabase ne sont pas renseignées, le middleware se retire
 * complètement : le site public doit continuer de fonctionner. Le tableau
 * de bord affiche alors sa propre page d'explication.
 */
export async function middleware(request) {
  if (!isSupabaseConfigured) return NextResponse.next({ request });

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Ne jamais retirer cet appel : c'est lui qui renouvelle le jeton.
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Base injoignable : on laisse passer, le layout du tableau de bord tranchera.
    return response;
  }

  const { pathname } = request.nextUrl;
  const isAdminArea = pathname.startsWith('/admin');
  const isLogin = pathname === '/admin/connexion';

  if (isAdminArea && !isLogin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/connexion';
    url.searchParams.set('suite', pathname);
    return NextResponse.redirect(url);
  }

  if (isLogin && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    // Tout sauf les fichiers statiques et les images
    '/((?!_next/static|_next/image|favicon.ico|brand/|photos/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest)$).*)',
  ],
};
