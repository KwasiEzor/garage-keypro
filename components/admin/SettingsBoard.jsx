'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Field, Input, PageHead, Panel, SaveButton, Select } from './ui';
import { IconClose } from '@/components/Icons';

const FUSEAUX = ['Africa/Lome', 'Africa/Accra', 'Africa/Abidjan', 'UTC'];

export default function SettingsBoard({ settings, equipe, isOwner, moi }) {
  const router = useRouter();
  const supabase = createClient();
  const refresh = () => router.refresh();

  return (
    <>
      <PageHead title="Paramètres" subtitle="Équipe, mot de passe et préférences générales." />

      <div className="space-y-8">
        <Equipe equipe={equipe} isOwner={isOwner} moi={moi} supabase={supabase} refresh={refresh} />
        <MonCompte supabase={supabase} />
        <Preferences settings={settings} supabase={supabase} refresh={refresh} />
      </div>
    </>
  );
}

/* ═══════════════ Équipe ═══════════════ */
const FORM_VIDE = { email: '', password: '', fullName: '', role: 'staff' };

function Equipe({ equipe: initial, isOwner, moi, supabase, refresh }) {
  const [equipe, setEquipe] = useState(initial);
  const [ouvert, setOuvert] = useState(false);
  const [form, setForm] = useState(FORM_VIDE);
  const [erreur, setErreur] = useState('');
  const [envoi, setEnvoi] = useState(false);

  const changerRole = async (id, role) => {
    await supabase.from('admin_users').update({ role }).eq('id', id);
    setEquipe((l) => l.map((m) => (m.id === id ? { ...m, role } : m)));
    refresh();
  };

  const retirer = async (id) => {
    if (!confirm('Retirer l’accès de cette personne au tableau de bord ?')) return;
    await supabase.from('admin_users').delete().eq('id', id);
    setEquipe((l) => l.filter((m) => m.id !== id));
    refresh();
  };

  const ajouter = async (e) => {
    e.preventDefault();
    setErreur('');
    setEnvoi(true);
    try {
      const res = await fetch('/admin/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErreur(data.error || 'Échec de la création du compte.');
        return;
      }
      setEquipe((l) => [
        ...l,
        {
          id: `provisoire-${Date.now()}`,
          email: form.email,
          full_name: form.fullName || form.email,
          role: form.role,
        },
      ]);
      setForm(FORM_VIDE);
      setOuvert(false);
      refresh();
    } catch {
      setErreur('Connexion impossible. Réessayez.');
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <Panel title="Équipe" description="Les personnes autorisées à ouvrir le tableau de bord.">
      <div className="space-y-3">
        {equipe.map((m) => (
          <div
            key={m.id}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-navy-100 px-4 py-3.5"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-navy-950">{m.full_name || m.email}</p>
              <p className="truncate text-micro text-navy-400">{m.email}</p>
            </div>

            {isOwner ? (
              <select
                value={m.role}
                onChange={(e) => changerRole(m.id, e.target.value)}
                disabled={m.id === moi}
                className="field w-auto py-1.5 text-micro disabled:opacity-50"
                aria-label={`Rôle de ${m.full_name || m.email}`}
              >
                <option value="owner">Responsable</option>
                <option value="staff">Équipe</option>
              </select>
            ) : (
              <span className="shrink-0 rounded-full bg-navy-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-600">
                {m.role === 'owner' ? 'Responsable' : 'Équipe'}
              </span>
            )}

            {isOwner && m.id !== moi && (
              <button
                onClick={() => retirer(m.id)}
                aria-label={`Retirer ${m.full_name || m.email}`}
                className="shrink-0 text-navy-400 hover:text-brand"
              >
                <IconClose className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {isOwner && (
        <div className="mt-6 border-t border-navy-100 pt-6">
          {!ouvert ? (
            <button onClick={() => setOuvert(true)} className="btn-ghost btn-sm">
              + Ajouter un membre
            </button>
          ) : (
            <form onSubmit={ajouter} className="grid gap-4 sm:grid-cols-2">
              <Field label="Nom complet">
                <Input
                  value={form.fullName}
                  onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                />
              </Field>
              <Field label="E-mail">
                <Input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </Field>
              <Field
                label="Mot de passe provisoire"
                hint="10 caractères minimum. La personne pourra le changer depuis Mon compte, ci-dessous."
              >
                <Input
                  required
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                />
              </Field>
              <Field label="Rôle">
                <Select
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                >
                  <option value="staff">Équipe</option>
                  <option value="owner">Responsable</option>
                </Select>
              </Field>

              {erreur && (
                <p className="rounded-xl bg-brand/10 px-4 py-3 text-small font-medium text-brand-700 sm:col-span-2">
                  {erreur}
                </p>
              )}

              <div className="flex gap-3 sm:col-span-2">
                <button
                  type="submit"
                  disabled={envoi}
                  className="btn-primary btn-sm disabled:opacity-60"
                >
                  {envoi ? 'Création…' : 'Créer le compte'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOuvert(false);
                    setErreur('');
                    setForm(FORM_VIDE);
                  }}
                  className="btn-ghost btn-sm"
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </Panel>
  );
}

/* ═══════════════ Mon compte ═══════════════ */
function MonCompte({ supabase }) {
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmation, setConfirmation] = useState('');

  return (
    <Panel title="Mon compte" description="Changer le mot de passe de votre propre session.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nouveau mot de passe" hint="10 caractères minimum.">
          <Input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            autoComplete="new-password"
          />
        </Field>
        <Field label="Confirmer le mot de passe">
          <Input
            type="password"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            autoComplete="new-password"
          />
        </Field>
      </div>

      <div className="mt-5">
        <SaveButton
          label="Mettre à jour le mot de passe"
          onSave={async () => {
            if (motDePasse.length < 10) return 'Le mot de passe doit faire au moins 10 caractères.';
            if (motDePasse !== confirmation) return 'Les deux mots de passe ne correspondent pas.';
            const { error } = await supabase.auth.updateUser({ password: motDePasse });
            if (!error) {
              setMotDePasse('');
              setConfirmation('');
            }
            return error;
          }}
        />
      </div>
    </Panel>
  );
}

/* ═══════════════ Préférences ═══════════════ */
function Preferences({ settings, supabase, refresh }) {
  const [s, setS] = useState({
    currency: settings?.currency || 'FCFA',
    timezone: settings?.timezone || 'Africa/Lome',
    default_locale: settings?.default_locale || 'fr',
    show_whatsapp_button: settings?.show_whatsapp_button ?? true,
    show_chatbot: settings?.show_chatbot ?? true,
  });

  return (
    <Panel
      title="Préférences générales"
      description="Devise, fuseau horaire, langue par défaut et boutons flottants du site."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Devise" hint="Utilisée dans le tableau de bord (montants des interventions).">
          <Input value={s.currency} onChange={(e) => setS({ ...s, currency: e.target.value })} />
        </Field>

        <Field label="Fuseau horaire">
          <Select
            value={s.timezone}
            onChange={(e) => setS({ ...s, timezone: e.target.value })}
          >
            {FUSEAUX.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Langue par défaut du site"
          hint="Utilisée si la langue du navigateur du visiteur n’est ni le français ni l’anglais."
        >
          <Select
            value={s.default_locale}
            onChange={(e) => setS({ ...s, default_locale: e.target.value })}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </Select>
        </Field>
      </div>

      <div className="mt-6 border-t border-navy-100 pt-6">
        <span className="label">Boutons flottants du site public</span>
        <div className="mt-3 space-y-3">
          <label className="flex items-center gap-2.5 text-small font-medium text-navy-700">
            <input
              type="checkbox"
              checked={s.show_whatsapp_button}
              onChange={(e) => setS({ ...s, show_whatsapp_button: e.target.checked })}
              className="h-4 w-4 accent-brand"
            />
            Bouton WhatsApp
          </label>
          <label className="flex items-center gap-2.5 text-small font-medium text-navy-700">
            <input
              type="checkbox"
              checked={s.show_chatbot}
              onChange={(e) => setS({ ...s, show_chatbot: e.target.checked })}
              className="h-4 w-4 accent-brand"
            />
            Assistant IA (chatbot)
          </label>
        </div>
        <p className="mt-2.5 text-[11px] text-navy-400">
          Décochez pour retirer complètement le bouton du site — pas seulement le masquer.
        </p>
      </div>

      <div className="mt-5">
        <SaveButton
          onSave={async () => {
            const { error } = await supabase
              .from('settings')
              .update({
                currency: s.currency,
                timezone: s.timezone,
                default_locale: s.default_locale,
                show_whatsapp_button: s.show_whatsapp_button,
                show_chatbot: s.show_chatbot,
              })
              .eq('id', true);
            if (!error) refresh();
            return error;
          }}
        />
      </div>
    </Panel>
  );
}
