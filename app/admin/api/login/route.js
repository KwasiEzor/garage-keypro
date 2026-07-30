import { NextResponse } from 'next/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { createHash } from 'node:crypto';
import { createClient } from '@/lib/supabase/server';
import { SUPABASE_URL, isSupabaseConfigured } from '@/lib/supabase/config';

/**
 * Connexion au tableau de bord, en passant par le serveur plutôt que par un
 * appel direct depuis le navigateur — uniquement pour pouvoir poser un
 * garde-fou anti-brute-force devant Supabase Auth (qui limite déjà les
 * tentatives, mais sans jamais bloquer par IP à l'échelle de l'application).
 *
 * La session reste gérée exactement comme avant : ce sont les mêmes cookies
 * Supabase (via @supabase/ssr) qui sont posés, ici depuis une route serveur
 * au lieu d'un composant client.
 */
const LOGIN_RATE_LIMIT = 8; // tentatives
const LOGIN_RATE_WINDOW = '15 minutes';

function clientIpHash(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = (forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip')) || 'inconnue';
  return createHash('sha256').update(ip.trim()).digest('hex');
}

/** Comme pour /api/chat : en cas de doute technique, on ne bloque jamais. */
async function withinRateLimit(ipHash) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured || !serviceKey) return true;

  try {
    const admin = createServiceClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false } });
    const { data, error } = await admin.rpc('rate_limit_check', {
      p_scope: 'admin_login',
      p_key: ipHash,
      p_limit: LOGIN_RATE_LIMIT,
      p_window: LOGIN_RATE_WINDOW,
    });
    if (error) return true;
    return data !== false;
  } catch {
    return true;
  }
}

export async function POST(request) {
  const ipHash = clientIpHash(request);
  if (!(await withinRateLimit(ipHash))) {
    return NextResponse.json(
      { error: 'Trop de tentatives de connexion. Réessayez dans une quinzaine de minutes.' },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const email = body?.email?.trim() || '';
  const password = body?.password || '';

  if (!email || !password) {
    return NextResponse.json({ error: 'E-mail et mot de passe requis.' }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Le tableau de bord n’est pas encore configuré.' },
      { status: 503 }
    );
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const message =
      error.message === 'Invalid login credentials'
        ? 'E-mail ou mot de passe incorrect.'
        : error.message;
    return NextResponse.json({ error: message }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
