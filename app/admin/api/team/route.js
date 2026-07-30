import { NextResponse } from 'next/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { requireAdmin } from '@/lib/supabase/server';
import { SUPABASE_URL } from '@/lib/supabase/config';

/**
 * Crée un compte d'accès au tableau de bord depuis l'interface — l'équivalent
 * de `npm run db:admin`, réservé au responsable (owner).
 *
 * Pourquoi une route serveur et pas un appel direct depuis le navigateur :
 * créer un compte dans auth.users exige la clé de service (SUPABASE_SERVICE_
 * ROLE_KEY), qui contourne toutes les règles de sécurité et ne doit jamais
 * atteindre le navigateur. Cette route la lit côté serveur, l'utilise une
 * fois, et ne la renvoie jamais dans la réponse.
 */
export async function POST(request) {
  const { configured, user, profile } = await requireAdmin();

  if (!configured || !user) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }
  if (!profile || profile.role !== 'owner') {
    return NextResponse.json(
      { error: 'Réservé au responsable du tableau de bord.' },
      { status: 403 }
    );
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY est absent des variables d’environnement du serveur.' },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const email = body?.email?.trim().toLowerCase() || '';
  const password = body?.password || '';
  const fullName = body?.fullName?.trim() || '';
  const role = body?.role === 'owner' ? 'owner' : 'staff';

  if (!email.includes('@')) {
    return NextResponse.json({ error: 'Adresse e-mail invalide.' }, { status: 400 });
  }
  if (password.length < 10) {
    return NextResponse.json(
      { error: 'Le mot de passe doit faire au moins 10 caractères.' },
      { status: 400 }
    );
  }

  const admin = createServiceClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false } });

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (createError) {
    const message = /already.*registered|already exists/i.test(createError.message)
      ? 'Un compte existe déjà avec cette adresse.'
      : createError.message;
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { error: profileError } = await admin
    .from('admin_users')
    .insert({ id: created.user.id, email, full_name: fullName || email.split('@')[0], role });

  if (profileError) {
    // Compte créé mais profil impossible à écrire : on ne laisse pas un
    // compte auth orphelin, sans accès au tableau de bord et invisible.
    await admin.auth.admin.deleteUser(created.user.id);
    return NextResponse.json({ error: profileError.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
