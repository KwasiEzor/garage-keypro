'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { JOB_STATUS } from '@/lib/admin/labels';
import { dateFr, fcfa } from '@/lib/admin/format';
import {
  Badge, Cell, Field, Input, Modal, PageHead, Panel, Row, Select,
  Table, Textarea,
} from './ui';
import { IconArrow } from '@/components/Icons';

const FILTRES = [
  ['ouvertes', 'Ouvertes'],
  ['planifiee', 'Planifiées'],
  ['en_cours', 'En cours'],
  ['terminee', 'Terminées'],
  ['facturee', 'Facturées'],
  ['toutes', 'Toutes'],
];

const VIDE = {
  title: '',
  description: '',
  customer_id: '',
  vehicle_id: '',
  service_slug: '',
  status: 'planifiee',
  location: '',
  is_mobile: false,
  amount_fcfa: '',
  paid: false,
  technician: '',
  scheduled_at: '',
};

export default function JobsBoard({
  initial, customers, vehicles, services, statut, fromQuote, error,
}) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [recherche, setRecherche] = useState('');

  // Arrivée depuis une demande de devis : on pré-remplit
  useEffect(() => {
    if (!fromQuote) return;
    setForm({
      ...VIDE,
      title: fromQuote.service || 'Intervention',
      description: fromQuote.message || '',
      quote_request_id: fromQuote.id,
      is_mobile: (fromQuote.mode || '').toLowerCase().includes('domicile'),
      _client: { name: fromQuote.name, phone: fromQuote.phone },
    });
  }, [fromQuote]);

  const visibles = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.reference, r.title, r.technician, r.customers?.name, r.vehicles?.plate, r.vehicles?.make]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [rows, recherche]);

  const vehiculesDuClient = useMemo(
    () => vehicles.filter((v) => !form?.customer_id || v.customer_id === form.customer_id),
    [vehicles, form?.customer_id]
  );

  async function save() {
    setBusy(true);
    setMsg('');
    const supabase = createClient();

    let customerId = form.customer_id || null;

    // Créer le client au vol si on vient d'une demande de devis
    if (!customerId && form._client?.name) {
      const { data: c, error: e1 } = await supabase
        .from('customers')
        .insert({ name: form._client.name, phone: form._client.phone })
        .select('id')
        .single();
      if (e1) {
        setBusy(false);
        setMsg(`Client : ${e1.message}`);
        return;
      }
      customerId = c.id;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description?.trim() || null,
      customer_id: customerId,
      vehicle_id: form.vehicle_id || null,
      quote_request_id: form.quote_request_id || null,
      service_slug: form.service_slug || null,
      status: form.status,
      location: form.location?.trim() || null,
      is_mobile: !!form.is_mobile,
      amount_fcfa: form.amount_fcfa === '' ? null : Number(form.amount_fcfa),
      paid: !!form.paid,
      technician: form.technician?.trim() || null,
      scheduled_at: form.scheduled_at || null,
      completed_at:
        ['terminee', 'facturee'].includes(form.status) && !form.completed_at
          ? new Date().toISOString()
          : form.completed_at || null,
    };

    const req = form.id
      ? supabase.from('jobs').update(payload).eq('id', form.id)
      : supabase.from('jobs').insert(payload);

    const { data, error: err } = await req
      .select('*, customers(id, name, phone), vehicles(id, make, model, year, plate)')
      .single();

    setBusy(false);

    if (err) {
      setMsg(err.message);
      return;
    }

    setRows((list) => (form.id ? list.map((r) => (r.id === data.id ? data : r)) : [data, ...list]));
    setForm(null);
    router.refresh();
  }

  return (
    <>
      <PageHead
        title="Interventions"
        subtitle="Le registre des travaux, par véhicule et par client."
        action={
          <button onClick={() => setForm({ ...VIDE })} className="btn-primary btn-sm">
            Nouvelle intervention
            <IconArrow className="h-3.5 w-3.5" />
          </button>
        }
      />

      {error && (
        <p className="mb-6 rounded-xl bg-brand/10 px-4 py-3 text-small text-brand-700">
          Lecture impossible : {error}
        </p>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTRES.map(([v, label]) => (
            <a
              key={v}
              href={`/admin/interventions?statut=${v}`}
              className={`rounded-full px-4 py-2 text-micro font-semibold transition-colors ${
                statut === v
                  ? 'bg-navy-950 text-white'
                  : 'bg-white text-navy-600 ring-1 ring-navy-100 hover:ring-brand'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
        <input
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Référence, client, plaque…"
          className="field ml-auto w-full sm:w-64"
        />
      </div>

      <Panel>
        <Table
          head={['Référence', 'Intervention', 'Client', 'Véhicule', 'Montant', 'Statut']}
          empty="Aucune intervention dans ce filtre."
        >
          {visibles.length
            ? visibles.map((j) => {
                const s = JOB_STATUS[j.status] || { label: j.status, tone: 'neutre' };
                return (
                  <Row
                    key={j.id}
                    onClick={() =>
                      setForm({
                        ...j,
                        amount_fcfa: j.amount_fcfa ?? '',
                        scheduled_at: j.scheduled_at ? j.scheduled_at.slice(0, 16) : '',
                        customer_id: j.customer_id || '',
                        vehicle_id: j.vehicle_id || '',
                        service_slug: j.service_slug || '',
                      })
                    }
                  >
                    <Cell className="tnum whitespace-nowrap font-semibold text-navy-950">
                      {j.reference}
                    </Cell>
                    <Cell>
                      <span className="font-medium text-navy-900">{j.title}</span>
                      {j.is_mobile && (
                        <span className="ml-2 text-[10px] font-bold uppercase text-brand">
                          mobile
                        </span>
                      )}
                      <span className="mt-0.5 block text-micro text-navy-400">
                        {dateFr(j.scheduled_at || j.created_at)}
                      </span>
                    </Cell>
                    <Cell className="text-navy-600">{j.customers?.name || '—'}</Cell>
                    <Cell className="text-navy-600">
                      {j.vehicles
                        ? `${j.vehicles.make} ${j.vehicles.model || ''} ${
                            j.vehicles.plate ? `· ${j.vehicles.plate}` : ''
                          }`
                        : '—'}
                    </Cell>
                    <Cell className="tnum whitespace-nowrap text-navy-700">
                      {fcfa(j.amount_fcfa)}
                      {j.paid && <span className="ml-1.5 text-emerald-600">✓</span>}
                    </Cell>
                    <Cell>
                      <Badge tone={s.tone}>{s.label}</Badge>
                    </Cell>
                  </Row>
                );
              })
            : null}
        </Table>
      </Panel>

      {/* ——— Formulaire ——— */}
      <Modal
        open={!!form}
        onClose={() => setForm(null)}
        title={form?.id ? `Intervention ${form.reference}` : 'Nouvelle intervention'}
        wide
      >
        {form && (
          <div className="space-y-5">
            {form._client && (
              <p className="rounded-xl bg-navy-50 px-4 py-3 text-small text-navy-600">
                Nouveau client créé à l’enregistrement :{' '}
                <strong className="text-navy-950">{form._client.name}</strong> · {form._client.phone}
              </p>
            )}

            <Field label="Intitulé" required>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Fabrication clé Toyota Corolla"
              />
            </Field>

            <Field label="Description">
              <Textarea
                rows={3}
                value={form.description || ''}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              {!form._client && (
                <Field label="Client">
                  <Select
                    value={form.customer_id}
                    onChange={(e) =>
                      setForm({ ...form, customer_id: e.target.value, vehicle_id: '' })
                    }
                  >
                    <option value="">—</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} · {c.phone}
                      </option>
                    ))}
                  </Select>
                </Field>
              )}

              <Field label="Véhicule">
                <Select
                  value={form.vehicle_id}
                  onChange={(e) => setForm({ ...form, vehicle_id: e.target.value })}
                >
                  <option value="">—</option>
                  {vehiculesDuClient.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.make} {v.model || ''} {v.year || ''} {v.plate ? `· ${v.plate}` : ''}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Prestation">
                <Select
                  value={form.service_slug}
                  onChange={(e) => setForm({ ...form, service_slug: e.target.value })}
                >
                  <option value="">—</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title_fr}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Statut">
                <Select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  {Object.entries(JOB_STATUS).map(([v, s]) => (
                    <option key={v} value={v}>
                      {s.label}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Technicien">
                <Input
                  value={form.technician || ''}
                  onChange={(e) => setForm({ ...form, technician: e.target.value })}
                />
              </Field>

              <Field label="Date prévue">
                <Input
                  type="datetime-local"
                  value={form.scheduled_at || ''}
                  onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
                />
              </Field>

              <Field label="Montant (FCFA)">
                <Input
                  type="number"
                  min="0"
                  className="tnum"
                  value={form.amount_fcfa}
                  onChange={(e) => setForm({ ...form, amount_fcfa: e.target.value })}
                />
              </Field>

              <Field label="Lieu" hint="Quartier ou adresse si intervention mobile.">
                <Input
                  value={form.location || ''}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </Field>
            </div>

            <div className="flex flex-wrap gap-6 border-t border-navy-100 pt-5">
              <label className="flex items-center gap-2.5 text-small font-medium text-navy-700">
                <input
                  type="checkbox"
                  checked={!!form.is_mobile}
                  onChange={(e) => setForm({ ...form, is_mobile: e.target.checked })}
                  className="h-4 w-4 accent-brand"
                />
                Intervention mobile
              </label>
              <label className="flex items-center gap-2.5 text-small font-medium text-navy-700">
                <input
                  type="checkbox"
                  checked={!!form.paid}
                  onChange={(e) => setForm({ ...form, paid: e.target.checked })}
                  className="h-4 w-4 accent-brand"
                />
                Payée
              </label>
            </div>

            {msg && (
              <p role="alert" className="rounded-xl bg-brand/10 px-4 py-3 text-small text-brand-700">
                {msg}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 border-t border-navy-100 pt-5">
              <button
                onClick={save}
                disabled={busy || !form.title.trim()}
                className="btn-primary disabled:opacity-60"
              >
                {busy ? 'Enregistrement…' : form.id ? 'Mettre à jour' : 'Créer l’intervention'}
              </button>
              <button onClick={() => setForm(null)} className="btn-ghost">
                Annuler
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
