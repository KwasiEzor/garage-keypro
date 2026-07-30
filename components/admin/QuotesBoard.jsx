'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { QUOTE_SOURCES, QUOTE_STATUS } from '@/lib/admin/labels';
import { dateTimeFr } from '@/lib/admin/format';
import {
  Badge, Cell, Field, Modal, PageHead, Panel, Row, Select,
  Table, Textarea,
} from './ui';
import { IconArrow, IconMail, IconPhone, IconWhatsapp } from '@/components/Icons';

const FILTRES = [
  ['toutes', 'Toutes'],
  ['nouvelle', 'Nouvelles'],
  ['en_cours', 'En cours'],
  ['devis_envoye', 'Devis envoyé'],
  ['acceptee', 'Acceptées'],
  ['close', 'Classées'],
];

export default function QuotesBoard({ initial, statut, error }) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [active, setActive] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [busy, setBusy] = useState(false);
  const [patchError, setPatchError] = useState('');

  const visibles = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.name, r.phone, r.email, r.vehicle, r.service, r.message]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    );
  }, [rows, recherche]);

  async function patch(id, changes) {
    setBusy(true);
    setPatchError('');
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from('quote_requests')
      .update({ ...changes, handled_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    setBusy(false);

    if (err) {
      setPatchError(`Échec de la mise à jour : ${err.message}`);
      return;
    }
    setRows((list) => list.map((r) => (r.id === id ? data : r)));
    setActive((a) => (a && a.id === id ? data : a));
    router.refresh();
  }

  const waLink = (r) => {
    const num = r.phone.replace(/[^\d]/g, '').replace(/^0+/, '');
    const inter = num.startsWith('228') ? num : `228${num}`;
    const texte = `Bonjour ${r.name}, KEYPRO Service Center suite à votre demande${
      r.service ? ` concernant « ${r.service} »` : ''
    }.`;
    return `https://wa.me/${inter}?text=${encodeURIComponent(texte)}`;
  };

  return (
    <>
      <PageHead
        title="Demandes de devis"
        subtitle="Chaque envoi du formulaire du site arrive ici."
      />

      {error && (
        <p className="mb-6 rounded-xl bg-brand/10 px-4 py-3 text-small text-brand-700">
          Lecture impossible : {error}
        </p>
      )}

      {/* Filtres */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTRES.map(([valeur, label]) => (
            <a
              key={valeur}
              href={valeur === 'toutes' ? '/admin/devis' : `/admin/devis?statut=${valeur}`}
              className={`rounded-full px-4 py-2 text-micro font-semibold transition-colors ${
                statut === valeur
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
          placeholder="Rechercher un nom, un numéro, un véhicule…"
          className="field ml-auto w-full sm:w-72"
        />
      </div>

      <Panel>
        <Table
          head={['Reçue le', 'Client', 'Téléphone', 'Véhicule', 'Service', 'Statut']}
          empty={
            recherche
              ? 'Aucun résultat pour cette recherche.'
              : 'Aucune demande dans ce filtre.'
          }
        >
          {visibles.length
            ? visibles.map((r) => {
                const s = QUOTE_STATUS[r.status] || { label: r.status, tone: 'neutre' };
                return (
                  <Row
                    key={r.id}
                    onClick={() => {
                      setActive(r);
                      setPatchError('');
                    }}
                  >
                    <Cell className="whitespace-nowrap text-navy-500">
                      {dateTimeFr(r.created_at)}
                    </Cell>
                    <Cell className="font-semibold text-navy-950">{r.name}</Cell>
                    <Cell className="tnum whitespace-nowrap text-navy-600">{r.phone}</Cell>
                    <Cell className="text-navy-600">{r.vehicle || '—'}</Cell>
                    <Cell className="text-navy-600">{r.service || '—'}</Cell>
                    <Cell>
                      <Badge tone={s.tone}>{s.label}</Badge>
                    </Cell>
                  </Row>
                );
              })
            : null}
        </Table>
      </Panel>

      {/* ——— Fiche détaillée ——— */}
      <Modal open={!!active} onClose={() => setActive(null)} title="Demande de devis" wide>
        {active && (
          <div className="space-y-6">
            {patchError && (
              <p role="alert" className="rounded-xl bg-brand/10 px-4 py-3 text-small font-medium text-brand-700">
                {patchError}
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <Info label="Client" value={active.name} />
              <Info label="Reçue le" value={dateTimeFr(active.created_at)} />
              <Info label="Téléphone" value={active.phone} tnum />
              <Info label="E-mail" value={active.email || '—'} />
              <Info label="Véhicule" value={active.vehicle || '—'} />
              <Info label="Service demandé" value={active.service || '—'} />
              <Info label="Type d’intervention" value={active.mode || '—'} />
              <Info
                label="Date souhaitée"
                value={active.preferred_date || '—'}
              />
              <Info label="Source" value={QUOTE_SOURCES[active.source] || active.source} />
              <Info label="Langue" value={active.locale === 'en' ? 'Anglais' : 'Français'} />
              <Info label="Consentement RGPD" value={active.consent ? 'Accepté' : 'Non renseigné'} />
            </div>

            <div>
              <p className="label">Message</p>
              <p className="whitespace-pre-line rounded-xl bg-navy-50 p-4 text-small leading-relaxed text-navy-700">
                {active.message}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Statut">
                <Select
                  value={active.status}
                  onChange={(e) => patch(active.id, { status: e.target.value })}
                  disabled={busy}
                >
                  {Object.entries(QUOTE_STATUS).map(([v, s]) => (
                    <option key={v} value={v}>
                      {s.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <Field label="Note interne" hint="Visible par l’équipe uniquement.">
              <Textarea
                rows={3}
                defaultValue={active.internal_note || ''}
                disabled={busy}
                onBlur={(e) =>
                  e.target.value !== (active.internal_note || '') &&
                  patch(active.id, { internal_note: e.target.value })
                }
              />
            </Field>

            <div className="flex flex-wrap gap-3 border-t border-navy-100 pt-6">
              <a
                href={waLink(active)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa btn-sm"
              >
                <IconWhatsapp className="h-4 w-4" />
                Répondre sur WhatsApp
              </a>
              <a href={`tel:${active.phone.replace(/\s/g, '')}`} className="btn-ghost btn-sm">
                <IconPhone className="h-4 w-4" />
                Appeler
              </a>
              {active.email && (
                <a
                  href={`mailto:${active.email}?subject=${encodeURIComponent(
                    `KEYPRO Service Center — votre demande${active.service ? ` (${active.service})` : ''}`
                  )}`}
                  className="btn-ghost btn-sm"
                >
                  <IconMail className="h-4 w-4" />
                  Répondre par e-mail
                </a>
              )}
              <a
                href={`/admin/interventions?depuis=${active.id}`}
                className="btn-navy btn-sm ml-auto"
              >
                Créer une intervention
                <IconArrow className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

function Info({ label, value, tnum }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest2 text-navy-400">{label}</p>
      <p className={`mt-1 text-small font-semibold text-navy-900 ${tnum ? 'tnum' : ''}`}>
        {value}
      </p>
    </div>
  );
}
