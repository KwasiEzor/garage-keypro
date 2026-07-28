import { createClient } from '@/lib/supabase/server';
import QuotesBoard from '@/components/admin/QuotesBoard';

export const dynamic = 'force-dynamic';

export default async function QuotesPage({ searchParams }) {
  const params = await searchParams;
  const statut = params?.statut || 'toutes';

  const supabase = await createClient();
  if (!supabase) return null; // le layout affiche déjà la page de configuration
  let query = supabase.from('quote_requests').select('*').order('created_at', { ascending: false }).limit(300);
  if (statut !== 'toutes') query = query.eq('status', statut);

  const { data, error } = await query;

  return <QuotesBoard initial={data || []} statut={statut} error={error?.message || null} />;
}
