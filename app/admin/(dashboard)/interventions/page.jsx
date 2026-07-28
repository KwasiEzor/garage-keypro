import { createClient } from '@/lib/supabase/server';
import JobsBoard from '@/components/admin/JobsBoard';

export const dynamic = 'force-dynamic';

export default async function JobsPage({ searchParams }) {
  const params = await searchParams;
  const statut = params?.statut || 'ouvertes';
  const depuis = params?.depuis || null;

  const supabase = await createClient();

  let query = supabase
    .from('jobs')
    .select('*, customers(id, name, phone), vehicles(id, make, model, year, plate)')
    .order('created_at', { ascending: false })
    .limit(300);

  if (statut === 'ouvertes') query = query.in('status', ['planifiee', 'en_cours']);
  else if (statut !== 'toutes') query = query.eq('status', statut);

  const [jobs, customers, vehicles, services, origine] = await Promise.all([
    query,
    supabase.from('customers').select('id, name, phone').order('name'),
    supabase.from('vehicles').select('id, customer_id, make, model, year, plate').order('make'),
    supabase.from('services').select('slug, title_fr').order('position'),
    depuis
      ? supabase.from('quote_requests').select('*').eq('id', depuis).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  return (
    <JobsBoard
      initial={jobs.data || []}
      customers={customers.data || []}
      vehicles={vehicles.data || []}
      services={services.data || []}
      statut={statut}
      fromQuote={origine.data || null}
      error={jobs.error?.message || null}
    />
  );
}
