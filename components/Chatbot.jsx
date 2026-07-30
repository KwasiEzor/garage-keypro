'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';
import { useLanguage } from './LanguageProvider';
import { IconChat, IconClose, IconSend, IconWhatsapp } from './Icons';
import Logo from './Logo';

const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

function localAnswer(question, dict) {
  const q = normalize(question);
  let best = null;
  let bestScore = 0;
  for (const entry of dict.answers) {
    const score = entry.keys.reduce(
      (acc, k) => (q.includes(normalize(k)) ? acc + normalize(k).length : acc),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return best ? best.text : dict.fallback;
}

export default function Chatbot() {
  const { t, locale } = useLanguage();
  const dict = t.chatbot;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);
  const dialogRef = useRef(null);
  const toggleRef = useRef(null);
  const inputRef = useRef(null);

  // Réinitialise le message d'accueil au changement de langue
  useEffect(() => {
    setMessages([{ role: 'bot', text: dict.greeting }]);
  }, [dict.greeting]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // Gestion du focus : à l'ouverture, on envoie le focus dans la fenêtre
  // (champ de saisie) ; à la fermeture, on le rend au bouton flottant —
  // sans quoi le clavier/lecteur d'écran perd le fil.
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(id);
    }
    toggleRef.current?.focus();
  }, [open]);

  /** Échap referme la fenêtre ; Tab reste piégé à l'intérieur pendant
   *  qu'elle est ouverte (fenêtre modale flottante, pas de superposition
   *  qui bloque le reste de la page). */
  function onDialogKeyDown(e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      setOpen(false);
      return;
    }
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const focusables = Array.from(
      dialogRef.current.querySelectorAll('button:not(:disabled), [href], input, select, textarea')
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  async function send(text) {
    const question = text.trim();
    if (!question || busy) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: question }]);
    setBusy(true);

    let reply = null;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, locale }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.reply) reply = data.reply;
      }
    } catch {
      // API indisponible : on bascule sur les réponses locales
    }

    if (!reply) {
      await new Promise((r) => setTimeout(r, 450));
      reply = localAnswer(question, dict);
    }

    setMessages((m) => [...m, { role: 'bot', text: reply }]);
    setBusy(false);
  }

  const waHref = `https://wa.me/${site.whatsapp}`;

  return (
    <>
      {/* Bouton flottant */}
      <button
        ref={toggleRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={dict.title}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-glow transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-brand-700"
      >
        {open ? <IconClose className="h-6 w-6" /> : <IconChat className="h-6 w-6" />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-white ring-2 ring-brand" />
          </span>
        )}
      </button>

      {/* Fenêtre de chat */}
      <div
        ref={dialogRef}
        onKeyDown={onDialogKeyDown}
        inert={!open ? '' : undefined}
        className={`fixed bottom-24 right-6 z-40 flex w-[min(390px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-lift transition-all duration-500 ease-smooth ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={dict.title}
      >
        <div className="flex items-center gap-3 bg-navy-900 px-4 py-3.5 text-white">
          <Logo variant="icon" className="h-9 w-9 rounded-[10px]" decorative />
          <div className="min-w-0">
            <p className="font-heading text-small font-bold leading-tight">{dict.title}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-micro text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              {dict.subtitle}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Fermer"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div
          role="log"
          aria-live="polite"
          aria-atomic="false"
          className="max-h-[46vh] min-h-[220px] space-y-3 overflow-y-auto bg-navy-50/50 px-4 py-4"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <p
                className={`max-w-[86%] whitespace-pre-line rounded-2xl px-4 py-3 text-small leading-relaxed ${
                  m.role === 'user'
                    ? 'rounded-br-sm bg-brand text-white'
                    : 'rounded-bl-sm border border-navy-100 bg-white text-navy-800'
                }`}
              >
                {m.text}
              </p>
            </div>
          ))}
          {busy && (
            <div className="flex justify-start">
              <span className="flex gap-1 rounded-2xl rounded-bl-sm border border-navy-100 bg-white px-4 py-3">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-300"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {messages.length <= 1 && (
          <div className="flex gap-2 overflow-x-auto border-t border-navy-100 bg-white px-4 py-3 no-scrollbar">
            {dict.suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="shrink-0 rounded-full border border-navy-200 px-3.5 py-2 text-micro font-medium text-navy-700 transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-navy-100 bg-white px-3 py-3"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={dict.placeholder}
            aria-label={dict.placeholder}
            className="flex-1 rounded-full border border-navy-200 px-4 py-3 text-small outline-none transition-colors focus:border-brand"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-700 disabled:opacity-40"
            aria-label="Envoyer"
          >
            <IconSend className="h-5 w-5" />
          </button>
        </form>

        <div className="flex items-center justify-between gap-2 border-t border-navy-100 bg-navy-50/60 px-4 py-2.5">
          <p className="text-[10px] leading-tight text-navy-400">{dict.disclaimer}</p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 text-micro font-semibold text-[#25D366]"
          >
            <IconWhatsapp className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
