import { createClient, requireAdmin } from '@/lib/supabase/server';
import SettingsBoard from '@/components/admin/SettingsBoard';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const { profile } = await requireAdmin();

  const supabase = await createClient();
  if (!supabase) return null; // le layout affiche déjà la page de configuration

  const [settings, equipe] = await Promise.all([
    supabase.from('settings').select('*').maybeSingle(),
    supabase.from('admin_users').select('id, email, full_name, role, created_at').order('created_at'),
  ]);

  return (
    <SettingsBoard
      settings={settings.data}
      equipe={equipe.data || []}
      isOwner={profile?.role === 'owner'}
      moi={profile?.id}
    />
  );
}
