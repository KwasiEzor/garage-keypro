import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

/**
 * Rafraîchit la session à chaque requête et ferme /admin aux visiteurs.
 *
 * La vérification « est-ce un administrateur ? » est refaite dans le layout
 * du tableau de bord et surtout par les règles de sécurité de la base.
 * Le middleware ne fait qu'éviter d'afficher une page vide.
 */
export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
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
    }
  );

  // Ne jamais retirer cet appel : c'est lui qui renouvelle le jeton.
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
