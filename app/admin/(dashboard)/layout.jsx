import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/supabase/server';
import AdminShell from '@/components/admin/AdminShell';
import SetupNotice from '@/components/admin/SetupNotice';

export const metadata = {
  title: 'Tableau de bord — KEYPRO',
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }) {
  const { configured, unreachable, user, profile } = await requireAdmin();

  // Clés absentes ou base en panne : on explique, on ne casse pas.
  if (!configured || unreachable) return <SetupNotice unreachable={unreachable} />;

  if (!user) redirect('/admin/connexion');

  // Compte authentifié mais sans droits : on le dit clairement.
  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-navy-50 px-5">
        <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-lift">
          <h1 className="text-h3">Accès non autorisé</h1>
          <p className="mt-4 text-small leading-relaxed text-navy-500">
            Ce compte existe mais n&apos;a pas de droits sur le tableau de bord.
            Lancez <code className="rounded bg-navy-50 px-1.5 py-0.5">npm run db:admin</code>{' '}
            avec cette adresse, ou demandez au responsable de vous ajouter.
          </p>
          <form action="/admin/deconnexion" method="post" className="mt-8">
            <button className="btn-ghost w-full">Se déconnecter</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <AdminShell profile={profile} email={user.email}>
      {children}
    </AdminShell>
  );
}
