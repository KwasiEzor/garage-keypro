'use client';

import { useState } from 'react';
import { IconArrow, IconCheck, IconClose } from '@/components/Icons';

/* ═══════════ En-tête de page ═══════════ */
export function PageHead({ title, subtitle, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-h2">{title}</h1>
        {subtitle && <p className="mt-2 text-small text-navy-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* ═══════════ Carte ═══════════ */
export function Panel({ title, description, children, footer, className = '' }) {
  return (
    <section className={`rounded-2xl bg-white shadow-soft ring-1 ring-navy-100 ${className}`}>
      {(title || description) && (
        <header className="border-b border-navy-100 px-6 py-5">
          {title && <h2 className="text-h4 font-bold">{title}</h2>}
          {description && <p className="mt-1 text-micro text-navy-400">{description}</p>}
        </header>
      )}
      <div className="p-6">{children}</div>
      {footer && <footer className="border-t border-navy-100 px-6 py-4">{footer}</footer>}
    </section>
  );
}

/* ═══════════ Champs ═══════════ */
export function Field({ label, hint, children, required }) {
  return (
    <label className="block">
      <span className="label">
        {label} {required && <span className="text-brand">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-[11px] text-navy-400">{hint}</span>}
    </label>
  );
}

export function Input(props) {
  return <input {...props} className={`field ${props.className || ''}`} />;
}

export function Textarea(props) {
  return <textarea {...props} className={`field resize-y ${props.className || ''}`} />;
}

export function Select({ children, ...props }) {
  return (
    <select {...props} className={`field ${props.className || ''}`}>
      {children}
    </select>
  );
}

/** Deux champs côte à côte, français et anglais */
export function Bilingual({ label, hint, fr, en, onFr, onEn, rows }) {
  const Comp = rows ? Textarea : Input;
  return (
    <div>
      <span className="label">{label}</span>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-navy-400">
            Français
          </span>
          <Comp value={fr ?? ''} rows={rows} onChange={(e) => onFr(e.target.value)} />
        </div>
        <div>
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-navy-400">
            English
          </span>
          <Comp value={en ?? ''} rows={rows} onChange={(e) => onEn(e.target.value)} />
        </div>
      </div>
      {hint && <p className="mt-1.5 text-[11px] text-navy-400">{hint}</p>}
    </div>
  );
}

/* ═══════════ Badge de statut ═══════════ */
const TONES = {
  neutre: 'bg-navy-100 text-navy-700',
  info: 'bg-blue-100 text-blue-800',
  attente: 'bg-amber-100 text-amber-800',
  succes: 'bg-emerald-100 text-emerald-800',
  danger: 'bg-brand/12 text-brand-700',
};

export function Badge({ tone = 'neutre', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${TONES[tone] || TONES.neutre}`}
    >
      {children}
    </span>
  );
}

/* ═══════════ Bouton d'enregistrement avec retour visuel ═══════════ */
export function SaveButton({ onSave, label = 'Enregistrer', disabled }) {
  const [state, setState] = useState('idle'); // idle | saving | done | error
  const [message, setMessage] = useState('');

  async function handle() {
    setState('saving');
    setMessage('');
    try {
      const error = await onSave();
      if (error) {
        setState('error');
        setMessage(typeof error === 'string' ? error : error.message);
      } else {
        setState('done');
        setTimeout(() => setState('idle'), 2400);
      }
    } catch (e) {
      setState('error');
      setMessage(e.message);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handle}
        disabled={disabled || state === 'saving'}
        className="btn-primary disabled:opacity-60"
      >
        {state === 'saving' ? 'Enregistrement…' : label}
        {state === 'idle' && <IconArrow className="h-4 w-4" />}
        {state === 'done' && <IconCheck className="h-4 w-4" />}
      </button>

      {state === 'done' && (
        <span role="status" className="text-small font-semibold text-emerald-700">
          Enregistré
        </span>
      )}
      {state === 'error' && (
        <span role="alert" className="text-small font-medium text-brand-700">
          {message || 'Échec de l’enregistrement'}
        </span>
      )}
    </div>
  );
}

/* ═══════════ Tableau ═══════════ */
export function Table({ head, children, empty }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[38rem] border-collapse text-small">
        <thead>
          <tr className="border-b border-navy-100">
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-navy-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children || (
            <tr>
              <td colSpan={head.length} className="px-4 py-14 text-center text-navy-400">
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Row({ children, onClick }) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-navy-50 last:border-0 ${
        onClick ? 'cursor-pointer transition-colors hover:bg-navy-50/70' : ''
      }`}
    >
      {children}
    </tr>
  );
}

export const Cell = ({ children, className = '' }) => (
  <td className={`px-4 py-3.5 align-middle ${className}`}>{children}</td>
);

/* ═══════════ Fenêtre modale ═══════════ */
export function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-navy-950/70 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`my-auto w-full rounded-2xl bg-white shadow-lift ${wide ? 'max-w-3xl' : 'max-w-xl'}`}
      >
        <header className="flex items-center justify-between gap-4 border-b border-navy-100 px-6 py-5">
          <h2 className="text-h4 font-bold">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-lg p-1.5 text-navy-400 transition-colors hover:bg-navy-50 hover:text-navy-900"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* ═══════════ Statistique ═══════════ */
export function Stat({ label, value, tone = 'navy', href }) {
  const inner = (
    <>
      <p className="text-[10px] font-bold uppercase tracking-widest2 text-navy-400">{label}</p>
      <p
        className={`tnum mt-2 font-heading text-3xl font-extrabold ${
          tone === 'brand' ? 'text-brand' : 'text-navy-950'
        }`}
      >
        {value}
      </p>
    </>
  );

  const cls =
    'block rounded-2xl bg-white p-6 shadow-soft ring-1 ring-navy-100 transition-all duration-300';

  if (!href) return <div className={cls}>{inner}</div>;

  return (
    <a href={href} className={`${cls} hover:-translate-y-1 hover:shadow-lift`}>
      {inner}
    </a>
  );
}

/* ═══════════ Formatage ═══════════ */
export const fcfa = (n) =>
  n === null || n === undefined
    ? '—'
    : `${Number(n).toLocaleString('fr-FR').replace(/ /g, ' ')} FCFA`;

export const dateFr = (d) =>
  d
    ? new Date(d).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—';

export const dateTimeFr = (d) =>
  d
    ? new Date(d).toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';
