'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { createClient } from '@/lib/supabase/client';
import { IconArrow } from '@/components/Icons';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const suite = params.get('suite') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError(
        authError.message === 'Invalid login credentials'
          ? 'E-mail ou mot de passe incorrect.'
          : authError.message
      );
      setBusy(false);
      return;
    }

    router.replace(suite);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-9 space-y-5">
      <div>
        <label className="label" htmlFor="email">
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          className="field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="label" htmlFor="password">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          className="field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-brand/10 px-4 py-3 text-small font-medium text-brand-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
        {busy ? 'Connexion…' : 'Se connecter'}
        {!busy && <IconArrow className="h-4 w-4" />}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-5 py-16">
      <div className="absolute inset-0 bg-grid-pattern [background-size:46px_46px]" />
      <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/20 blur-[130px]" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mx-auto block w-fit">
          <Logo theme="light" className="h-11 w-auto" />
        </Link>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-lift sm:p-10">
          <p className="eyebrow eyebrow-start">Espace privé</p>
          <h1 className="mt-4 text-h2">Tableau de bord</h1>
          <p className="mt-3 text-small text-navy-500">
            Réservé à l&apos;équipe KEYPRO.
          </p>

          <Suspense fallback={<div className="mt-9 h-64" />}>
            <LoginForm />
          </Suspense>
        </div>

        <Link
          href="/"
          className="mx-auto mt-7 block w-fit text-small text-white/45 transition-colors hover:text-white"
        >
          ← Retour au site
        </Link>
      </div>
    </main>
  );
}
