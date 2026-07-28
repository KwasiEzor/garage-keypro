import { createClient } from '@/lib/supabase/server';
import CustomersBoard from '@/components/admin/CustomersBoard';

export const dynamic = 'force-dynamic';

export default async function CustomersPage() {
  const supabase = await createClient();
  if (!supabase) return null; // le layout affiche déjà la page de configuration

  const [customers, vehicles, jobs] = await Promise.all([
    supabase.from('customers').select('*').order('created_at', { ascending: false }).limit(500),
    supabase.from('vehicles').select('*').order('created_at', { ascending: false }),
    supabase
      .from('jobs')
      .select('id, reference, title, status, amount_fcfa, paid, customer_id, vehicle_id, created_at')
      .order('created_at', { ascending: false }),
  ]);

  return (
    <CustomersBoard
      initialCustomers={customers.data || []}
      initialVehicles={vehicles.data || []}
      jobs={jobs.data || []}
      error={customers.error?.message || null}
    />
  );
}
