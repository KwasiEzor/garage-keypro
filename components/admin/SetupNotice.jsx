import Link from 'next/link';
import Logo from '@/components/Logo';

/** Affiché quand les clés Supabase manquent ou que la base est injoignable. */
export default function SetupNotice({ unreachable }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-950 px-5 py-16">
      <div className="w-full max-w-xl">
        <Link href="/" className="mx-auto block w-fit">
          <Logo theme="light" className="h-10 w-auto" />
        </Link>

        <div className="mt-9 rounded-2xl bg-white p-8 shadow-lift sm:p-10">
          <p className="eyebrow eyebrow-start">Configuration</p>
          <h1 className="mt-4 text-h2">
            {unreachable ? 'Base injoignable' : 'Tableau de bord non configuré'}
          </h1>

          {unreachable ? (
            <p className="mt-4 text-small leading-relaxed text-navy-600">
              Les clés sont bien renseignées, mais la base ne répond pas. Vérifiez votre
              connexion, puis que le projet Supabase n&apos;est pas en pause — l&apos;offre
              gratuite met les projets inactifs en veille au bout d&apos;une semaine.
            </p>
          ) : (
            <>
              <p className="mt-4 text-small leading-relaxed text-navy-600">
                Le site public fonctionne normalement : il lit son contenu dans les fichiers
                de <code className="rounded bg-navy-50 px-1.5 py-0.5 text-[12px]">lib/</code>.
                Le tableau de bord, lui, a besoin d&apos;une base de données.
              </p>

              <ol className="mt-7 space-y-5 text-small text-navy-700">
                <li>
                  <p className="font-semibold text-navy-950">1. Créer le fichier de clés</p>
                  <p className="mt-1 text-navy-500">
                    À la racine du projet, copiez{' '}
                    <code className="rounded bg-navy-50 px-1.5 py-0.5 text-[12px]">.env.example</code>{' '}
                    en{' '}
                    <code className="rounded bg-navy-50 px-1.5 py-0.5 text-[12px]">.env.local</code>.
                  </p>
                  <pre className="mt-2.5 overflow-x-auto rounded-xl bg-navy-950 px-4 py-3 text-[12px] leading-relaxed text-white">
{`cp .env.example .env.local`}
                  </pre>
                </li>

                <li>
                  <p className="font-semibold text-navy-950">2. Compléter la clé de service</p>
                  <p className="mt-1 text-navy-500">
                    Dans Supabase → Project Settings → API, copiez la clé{' '}
                    <code className="rounded bg-navy-50 px-1.5 py-0.5 text-[12px]">service_role</code>{' '}
                    dans{' '}
                    <code className="rounded bg-navy-50 px-1.5 py-0.5 text-[12px]">
                      SUPABASE_SERVICE_ROLE_KEY
                    </code>
                    . L&apos;URL et la clé publique sont déjà pré-remplies.
                  </p>
                </li>

                <li>
                  <p className="font-semibold text-navy-950">
                    3. Redémarrer, importer le contenu, créer votre compte
                  </p>
                  <pre className="mt-2.5 overflow-x-auto rounded-xl bg-navy-950 px-4 py-3 text-[12px] leading-relaxed text-white">
{`npm run db:seed
npm run db:admin -- vous@email.com "MotDePasse" "Votre Nom" owner`}
                  </pre>
                  <p className="mt-2 text-navy-500">
                    Les variables d&apos;environnement ne sont lues qu&apos;au démarrage :
                    arrêtez le serveur (Ctrl+C) et relancez{' '}
                    <code className="rounded bg-navy-50 px-1.5 py-0.5 text-[12px]">npm run dev</code>.
                  </p>
                </li>
              </ol>
            </>
          )}

          <div className="mt-9 flex flex-wrap gap-3 border-t border-navy-100 pt-7">
            <Link href="/" className="btn-ghost btn-sm">
              ← Retour au site
            </Link>
            <a
              href="https://supabase.com/dashboard/project/kmsriyxbxkmxsyxwxjjf/settings/api"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-sm"
            >
              Ouvrir les réglages Supabase
            </a>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center text-micro text-white/40">
          Guide complet dans docs/TABLEAU-DE-BORD.md
        </p>
      </div>
    </main>
  );
}
