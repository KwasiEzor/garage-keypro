import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Badge, Cell, Panel, Row, Stat, Table } from '@/components/admin/ui';
import { dateTimeFr, fcfa } from '@/lib/admin/format';
import { QUOTE_STATUS } from '@/lib/admin/labels';

export const dynamic = 'force-dynamic';

export default async function DashboardHome() {
  const supabase = await createClient();
  if (!supabase) return null; // le layout affiche déjà la page de configuration

  const debutDuMois = new Date();
  debutDuMois.setDate(1);
  debutDuMois.setHours(0, 0, 0, 0);

  const [nouvelles, enCours, interventionsMois, recettes, dernieres] = await Promise.all([
    supabase.from('quote_requests').select('id', { count: 'exact', head: true }).eq('status', 'nouvelle'),
    supabase.from('jobs').select('id', { count: 'exact', head: true }).in('status', ['planifiee', 'en_cours']),
    supabase
      .from('jobs')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', debutDuMois.toISOString()),
    supabase
      .from('jobs')
      .select('amount_fcfa')
      .eq('paid', true)
      .gte('completed_at', debutDuMois.toISOString()),
    supabase
      .from('quote_requests')
      .select('id, created_at, name, phone, service, status')
      .order('created_at', { ascending: false })
      .limit(8),
  ]);

  const total = (recettes.data || []).reduce((sum, j) => sum + (j.amount_fcfa || 0), 0);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-h2">Vue d’ensemble</h1>
        <p className="mt-2 text-small text-navy-500">
          L’essentiel de l’activité, mis à jour en direct.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Demandes à traiter"
          value={nouvelles.count ?? 0}
          tone={nouvelles.count ? 'brand' : 'navy'}
          href="/admin/devis?statut=nouvelle"
        />
        <Stat label="Interventions ouvertes" value={enCours.count ?? 0} href="/admin/interventions" />
        <Stat label="Interventions ce mois" value={interventionsMois.count ?? 0} />
        <Stat label="Encaissé ce mois" value={fcfa(total)} />
      </div>

      <div className="mt-8">
        <Panel
          title="Dernières demandes de devis"
          description="Les huit plus récentes, toutes sources confondues."
          footer={
            <Link href="/admin/devis" className="text-small font-semibold text-brand">
              Voir toutes les demandes →
            </Link>
          }
        >
          <Table
            head={['Reçue le', 'Client', 'Téléphone', 'Service', 'Statut']}
            empty="Aucune demande pour le moment."
          >
            {(dernieres.data || []).length
              ? dernieres.data.map((q) => {
                  const s = QUOTE_STATUS[q.status] || { label: q.status, tone: 'neutre' };
                  return (
                    <Row key={q.id}>
                      <Cell className="whitespace-nowrap text-navy-500">
                        {dateTimeFr(q.created_at)}
                      </Cell>
                      <Cell className="font-semibold text-navy-950">{q.name}</Cell>
                      <Cell className="tnum whitespace-nowrap text-navy-600">{q.phone}</Cell>
                      <Cell className="text-navy-600">{q.service || '—'}</Cell>
                      <Cell>
                        <Badge tone={s.tone}>{s.label}</Badge>
                      </Cell>
                    </Row>
                  );
                })
              : null}
          </Table>
        </Panel>
      </div>
    </>
  );
}
