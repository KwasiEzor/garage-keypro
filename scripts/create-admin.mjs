/**
 * Crée un compte d'accès au tableau de bord.
 *
 *   npm run db:admin -- kwasi@exemple.com "Mot de passe" "Kwasi Ezor" owner
 *
 * Arguments : e-mail, mot de passe, nom complet (optionnel), rôle (owner|staff).
 * Le premier compte doit être « owner » — lui seul peut ensuite en créer d'autres.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'node:fs';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const [email, password, fullName = '', role = 'owner'] = process.argv.slice(2);

if (!url || !key) {
  console.error('✗ NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requis dans .env.local');
  process.exit(1);
}

if (!email || !password) {
  console.error(`
Usage :
  npm run db:admin -- <e-mail> <mot-de-passe> [nom complet] [owner|staff]

Exemple :
  npm run db:admin -- kwasi@exemple.com "MotDePasseSolide!" "Kwasi Ezor" owner
`);
  process.exit(1);
}

if (password.length < 10) {
  console.error('✗ Le mot de passe doit faire au moins 10 caractères.');
  process.exit(1);
}

if (!['owner', 'staff'].includes(role)) {
  console.error('✗ Le rôle doit être « owner » ou « staff ».');
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });

// L'utilisateur existe-t-il déjà ?
const { data: list } = await db.auth.admin.listUsers({ perPage: 1000 });
let user = list?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());

if (user) {
  console.log(`ℹ Le compte ${email} existe déjà — mise à jour du mot de passe.`);
  const { error } = await db.auth.admin.updateUserById(user.id, { password });
  if (error) {
    console.error(`✗ ${error.message}`);
    process.exit(1);
  }
} else {
  const { data, error } = await db.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });
  if (error) {
    console.error(`✗ ${error.message}`);
    process.exit(1);
  }
  user = data.user;
  console.log(`✓ Compte créé : ${email}`);
}

const { error: profileError } = await db
  .from('admin_users')
  .upsert({ id: user.id, full_name: fullName || email.split('@')[0], role });

if (profileError) {
  console.error(`✗ Profil administrateur — ${profileError.message}`);
  process.exit(1);
}

console.log(`✓ Accès « ${role} » accordé.

  Connectez-vous sur /admin/connexion
  E-mail : ${email}
`);
