'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { JOB_STATUS, KEY_TYPES } from '@/lib/admin/labels';
import { dateFr, fcfa } from '@/lib/admin/format';
import {
  Badge, Cell, Field, Input, Modal, PageHead, Panel, Row, Select,
  Table, Textarea,
} from './ui';
import { IconArrow, IconPhone, IconWhatsapp } from '@/components/Icons';

const CLIENT_VIDE = { name: '', phone: '', email: '', address: '', note: '' };
const VEHICULE_VIDE = {
  make: '', model: '', year: '', plate: '', vin: '', key_type: 'inconnu', note: '',
};

export default function CustomersBoard({ initialCustomers, initialVehicles, jobs, error }) {
  const router = useRouter();
  const [customers, setCustomers] = useState(initialCustomers);
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [recherche, setRecherche] = useState('');
  const [fiche, setFiche] = useState(null);      // client ouvert
  const [formClient, setFormClient] = useState(null);
  const [formVehicule, setFormVehicule] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const visibles = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    if (!q) return customers;
    const plaques = new Set(
      vehicles
        .filter((v) => [v.plate, v.make, v.model].filter(Boolean).some((x) => x.toLowerCase().includes(q)))
        .map((v) => v.customer_id)
    );
    return customers.filter(
      (c) =>
        plaques.has(c.id) ||
        [c.name, c.phone, c.email].filter(Boolean).some((v) => v.toLowerCase().includes(q))
    );
  }, [customers, vehicles, recherche]);

  const vehiculesDe = (id) => vehicles.filter((v) => v.customer_id === id);
  const jobsDe = (id) => jobs.filter((j) => j.customer_id === id);

  async function saveClient() {
    setBusy(true);
    setMsg('');
    const supabase = createClient();
    const payload = {
      name: formClient.name.trim(),
      phone: formClient.phone.trim(),
      email: formClient.email?.trim() || null,
      address: formClient.address?.trim() || null,
      note: formClient.note?.trim() || null,
    };
    const req = formClient.id
      ? supabase.from('customers').update(payload).eq('id', formClient.id)
      : supabase.from('customers').insert(payload);
    const { data, error: err } = await req.select().single();
    setBusy(false);

    if (err) return setMsg(err.message);

    setCustomers((l) => (formClient.id ? l.map((c) => (c.id === data.id ? data : c)) : [data, ...l]));
    if (fiche?.id === data.id) setFiche(data);
    setFormClient(null);
    router.refresh();
  }

  async function saveVehicule() {
    setBusy(true);
    setMsg('');
    const supabase = createClient();
    const payload = {
      customer_id: formVehicule.customer_id,
      make: formVehicule.make.trim(),
      model: formVehicule.model?.trim() || null,
      year: formVehicule.year === '' ? null : Number(formVehicule.year),
      plate: formVehicule.plate?.trim().toUpperCase() || null,
      vin: formVehicule.vin?.trim() || null,
      key_type: formVehicule.key_type || 'inconnu',
      note: formVehicule.note?.trim() || null,
    };
    const req = formVehicule.id
      ? supabase.from('vehicles').update(payload).eq('id', formVehicule.id)
      : supabase.from('vehicles').insert(payload);
    const { data, error: err } = await req.select().single();
    setBusy(false);

    if (err) return setMsg(err.message);

    setVehicles((l) => (formVehicule.id ? l.map((v) => (v.id === data.id ? data : v)) : [data, ...l]));
    setFormVehicule(null);
    router.refresh();
  }

  const wa = (phone) => {
    const n = phone.replace(/[^\d]/g, '').replace(/^0+/, '');
    return `https://wa.me/${n.startsWith('228') ? n : `228${n}`}`;
  };

  return (
    <>
      <PageHead
        title="Clients & véhicules"
        subtitle="Le fichier client de l’atelier, avec l’historique par véhicule."
        action={
          <button onClick={() => setFormClient({ ...CLIENT_VIDE })} className="btn-primary btn-sm">
            Nouveau client
            <IconArrow className="h-3.5 w-3.5" />
          </button>
        }
      />

      {error && (
        <p className="mb-6 rounded-xl bg-brand/10 px-4 py-3 text-small text-brand-700">
          Lecture impossible : {error}
        </p>
      )}

      <div className="mb-6">
        <input
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Nom, téléphone, plaque, marque…"
          className="field w-full sm:w-96"
        />
      </div>

      <Panel>
        <Table
          head={['Client', 'Téléphone', 'Véhicules', 'Interventions', 'Depuis']}
          empty={recherche ? 'Aucun résultat.' : 'Aucun client enregistré.'}
        >
          {visibles.length
            ? visibles.map((c) => (
                <Row key={c.id} onClick={() => setFiche(c)}>
                  <Cell className="font-semibold text-navy-950">{c.name}</Cell>
                  <Cell className="tnum whitespace-nowrap text-navy-600">{c.phone}</Cell>
                  <Cell className="text-navy-600">{vehiculesDe(c.id).length}</Cell>
                  <Cell className="text-navy-600">{jobsDe(c.id).length}</Cell>
                  <Cell className="whitespace-nowrap text-navy-500">{dateFr(c.created_at)}</Cell>
                </Row>
              ))
            : null}
        </Table>
      </Panel>

      {/* ——— Fiche client ——— */}
      <Modal open={!!fiche} onClose={() => setFiche(null)} title={fiche?.name || ''} wide>
        {fiche && (
          <div className="space-y-7">
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${fiche.phone.replace(/\s/g, '')}`} className="btn-ghost btn-sm">
                <IconPhone className="h-4 w-4" />
                {fiche.phone}
              </a>
              <a href={wa(fiche.phone)} target="_blank" rel="noopener noreferrer" className="btn-wa btn-sm">
                <IconWhatsapp className="h-4 w-4" />
                WhatsApp
              </a>
              <button
                onClick={() => setFormClient({ ...fiche })}
                className="btn-ghost btn-sm ml-auto"
              >
                Modifier la fiche
              </button>
            </div>

            {(fiche.email || fiche.address || fiche.note) && (
              <div className="grid gap-3 rounded-xl bg-navy-50 p-4 text-small text-navy-600 sm:grid-cols-2">
                {fiche.email && <p>✉ {fiche.email}</p>}
                {fiche.address && <p>📍 {fiche.address}</p>}
                {fiche.note && <p className="sm:col-span-2">📝 {fiche.note}</p>}
              </div>
            )}

            {/* Véhicules */}
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-h4 font-bold">Véhicules</h3>
                <button
                  onClick={() => setFormVehicule({ ...VEHICULE_VIDE, customer_id: fiche.id })}
                  className="text-micro font-bold text-brand"
                >
                  + Ajouter
                </button>
              </div>

              {vehiculesDe(fiche.id).length ? (
                <ul className="space-y-2">
                  {vehiculesDe(fiche.id).map((v) => (
                    <li
                      key={v.id}
                      className="flex flex-wrap items-center gap-3 rounded-xl border border-navy-100 px-4 py-3"
                    >
                      <span className="font-semibold text-navy-950">
                        {v.make} {v.model} {v.year}
                      </span>
                      {v.plate && (
                        <span className="tnum rounded-md bg-navy-100 px-2 py-0.5 text-micro font-bold text-navy-700">
                          {v.plate}
                        </span>
                      )}
                      <span className="text-micro text-navy-400">{KEY_TYPES[v.key_type]}</span>
                      <button
                        onClick={() => setFormVehicule({ ...v, year: v.year ?? '' })}
                        className="ml-auto text-micro font-semibold text-brand"
                      >
                        Modifier
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-xl border border-dashed border-navy-200 px-4 py-6 text-center text-small text-navy-400">
                  Aucun véhicule enregistré.
                </p>
              )}
            </section>

            {/* Historique */}
            <section>
              <h3 className="mb-3 text-h4 font-bold">Historique des interventions</h3>
              {jobsDe(fiche.id).length ? (
                <ul className="space-y-2">
                  {jobsDe(fiche.id).map((j) => {
                    const s = JOB_STATUS[j.status] || { label: j.status, tone: 'neutre' };
                    return (
                      <li
                        key={j.id}
                        className="flex flex-wrap items-center gap-3 rounded-xl border border-navy-100 px-4 py-3"
                      >
                        <span className="tnum text-micro font-bold text-navy-400">{j.reference}</span>
                        <span className="font-medium text-navy-900">{j.title}</span>
                        <Badge tone={s.tone}>{s.label}</Badge>
                        <span className="tnum ml-auto text-small text-navy-600">
                          {fcfa(j.amount_fcfa)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="rounded-xl border border-dashed border-navy-200 px-4 py-6 text-center text-small text-navy-400">
                  Aucune intervention.
                </p>
              )}
            </section>
          </div>
        )}
      </Modal>

      {/* ——— Formulaire client ——— */}
      <Modal
        open={!!formClient}
        onClose={() => setFormClient(null)}
        title={formClient?.id ? 'Modifier le client' : 'Nouveau client'}
      >
        {formClient && (
          <div className="space-y-5">
            <Field label="Nom complet" required>
              <Input
                value={formClient.name}
                onChange={(e) => setFormClient({ ...formClient, name: e.target.value })}
              />
            </Field>
            <Field label="Téléphone" required hint="Avec l’indicatif, ex. +228 72 11 44 44">
              <Input
                className="tnum"
                value={formClient.phone}
                onChange={(e) => setFormClient({ ...formClient, phone: e.target.value })}
              />
            </Field>
            <Field label="E-mail">
              <Input
                type="email"
                value={formClient.email || ''}
                onChange={(e) => setFormClient({ ...formClient, email: e.target.value })}
              />
            </Field>
            <Field label="Adresse">
              <Input
                value={formClient.address || ''}
                onChange={(e) => setFormClient({ ...formClient, address: e.target.value })}
              />
            </Field>
            <Field label="Note">
              <Textarea
                rows={2}
                value={formClient.note || ''}
                onChange={(e) => setFormClient({ ...formClient, note: e.target.value })}
              />
            </Field>

            {msg && <p className="rounded-xl bg-brand/10 px-4 py-3 text-small text-brand-700">{msg}</p>}

            <div className="flex gap-3">
              <button
                onClick={saveClient}
                disabled={busy || !formClient.name.trim() || !formClient.phone.trim()}
                className="btn-primary disabled:opacity-60"
              >
                {busy ? 'Enregistrement…' : 'Enregistrer'}
              </button>
              <button onClick={() => setFormClient(null)} className="btn-ghost">
                Annuler
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ——— Formulaire véhicule ——— */}
      <Modal
        open={!!formVehicule}
        onClose={() => setFormVehicule(null)}
        title={formVehicule?.id ? 'Modifier le véhicule' : 'Nouveau véhicule'}
      >
        {formVehicule && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Marque" required>
                <Input
                  value={formVehicule.make}
                  onChange={(e) => setFormVehicule({ ...formVehicule, make: e.target.value })}
                  placeholder="Toyota"
                />
              </Field>
              <Field label="Modèle">
                <Input
                  value={formVehicule.model || ''}
                  onChange={(e) => setFormVehicule({ ...formVehicule, model: e.target.value })}
                  placeholder="Corolla"
                />
              </Field>
              <Field label="Année">
                <Input
                  type="number"
                  className="tnum"
                  value={formVehicule.year}
                  onChange={(e) => setFormVehicule({ ...formVehicule, year: e.target.value })}
                />
              </Field>
              <Field label="Immatriculation">
                <Input
                  className="tnum uppercase"
                  value={formVehicule.plate || ''}
                  onChange={(e) => setFormVehicule({ ...formVehicule, plate: e.target.value })}
                />
              </Field>
              <Field label="Type de clé">
                <Select
                  value={formVehicule.key_type}
                  onChange={(e) => setFormVehicule({ ...formVehicule, key_type: e.target.value })}
                >
                  {Object.entries(KEY_TYPES).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Numéro de châssis (VIN)">
                <Input
                  className="tnum"
                  value={formVehicule.vin || ''}
                  onChange={(e) => setFormVehicule({ ...formVehicule, vin: e.target.value })}
                />
              </Field>
            </div>

            <Field label="Note">
              <Textarea
                rows={2}
                value={formVehicule.note || ''}
                onChange={(e) => setFormVehicule({ ...formVehicule, note: e.target.value })}
              />
            </Field>

            {msg && <p className="rounded-xl bg-brand/10 px-4 py-3 text-small text-brand-700">{msg}</p>}

            <div className="flex gap-3">
              <button
                onClick={saveVehicule}
                disabled={busy || !formVehicule.make.trim()}
                className="btn-primary disabled:opacity-60"
              >
                {busy ? 'Enregistrement…' : 'Enregistrer'}
              </button>
              <button onClick={() => setFormVehicule(null)} className="btn-ghost">
                Annuler
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
