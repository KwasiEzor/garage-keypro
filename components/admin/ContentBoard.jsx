'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  Bilingual, Field, Input, PageHead, Panel, SaveButton, Select, Textarea,
} from './ui';
import ImageUpload from './ImageUpload';
import { IconArrow, IconClose } from '@/components/Icons';

const ONGLETS = [
  ['coordonnees', 'Coordonnées'],
  ['textes', 'Textes du site'],
  ['services', 'Services'],
  ['marques', 'Marques'],
  ['sections', 'Étapes & avantages'],
  ['temoignages', 'Témoignages'],
  ['galerie', 'Galerie'],
  ['chatbot', 'Chatbot'],
  ['visuels', 'Visuels'],
];

export default function ContentBoard({ onglet, vide, data }) {
  const router = useRouter();
  const supabase = createClient();
  const refresh = () => router.refresh();

  if (vide) {
    return (
      <>
        <PageHead title="Contenu du site" />
        <Panel title="La base est encore vide">
          <p className="text-small leading-relaxed text-navy-600">
            Le contenu du site vit toujours dans les fichiers <code>lib/</code>. Pour le piloter
            depuis ici, importez-le une première fois :
          </p>
          <pre className="mt-5 overflow-x-auto rounded-xl bg-navy-950 px-5 py-4 text-micro text-white">
{`npm run db:seed`}
          </pre>
          <p className="mt-5 text-micro text-navy-400">
            L&apos;opération est rejouable sans danger. Rechargez cette page ensuite.
          </p>
        </Panel>
      </>
    );
  }

  return (
    <>
      <PageHead
        title="Contenu du site"
        subtitle="Ce que vous modifiez ici s’affiche sur le site public."
      />

      <div className="mb-7 flex flex-wrap gap-2">
        {ONGLETS.map(([v, label]) => (
          <a
            key={v}
            href={`/admin/contenu?onglet=${v}`}
            className={`rounded-full px-4 py-2 text-micro font-semibold transition-colors ${
              onglet === v
                ? 'bg-navy-950 text-white'
                : 'bg-white text-navy-600 ring-1 ring-navy-100 hover:ring-brand'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {onglet === 'coordonnees' && <Coordonnees data={data} supabase={supabase} refresh={refresh} />}
      {onglet === 'textes' && <Textes rows={data.textes} supabase={supabase} refresh={refresh} />}
      {onglet === 'services' && <Services rows={data.services} supabase={supabase} refresh={refresh} />}
      {onglet === 'marques' && <Marques regions={data.regions} marques={data.marques} supabase={supabase} refresh={refresh} />}
      {onglet === 'sections' && <Sections etapes={data.etapes} avantages={data.avantages} supabase={supabase} refresh={refresh} />}
      {onglet === 'temoignages' && <Temoignages rows={data.temoignages} supabase={supabase} refresh={refresh} />}
      {onglet === 'galerie' && <Galerie rows={data.galerie} supabase={supabase} refresh={refresh} />}
      {onglet === 'chatbot' && <Chatbot rows={data.chatbot} supabase={supabase} refresh={refresh} />}
      {onglet === 'visuels' && <Visuels rows={data.medias} supabase={supabase} refresh={refresh} />}
    </>
  );
}

/* ═══════════════ Coordonnées ═══════════════ */
function Coordonnees({ data, supabase, refresh }) {
  const [s, setS] = useState(data.settings);
  const [zones, setZones] = useState(data.zones);
  const [nouvelleZone, setNouvelleZone] = useState('');

  const setHour = (locale, i, j, val) => {
    const h = JSON.parse(JSON.stringify(s.hours));
    h[locale][i][j] = val;
    setS({ ...s, hours: h });
  };

  return (
    <div className="space-y-6">
      <Panel title="Contact" description="Ces valeurs alimentent l’en-tête, le pied de page et la carte.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nom de l’entreprise">
            <Input value={s.business_name} onChange={(e) => setS({ ...s, business_name: e.target.value })} />
          </Field>
          <Field label="E-mail">
            <Input type="email" value={s.email} onChange={(e) => setS({ ...s, email: e.target.value })} />
          </Field>
          <Field label="Indicatif pays">
            <Input className="tnum" value={s.country_code} onChange={(e) => setS({ ...s, country_code: e.target.value })} />
          </Field>
          <Field label="Numéro WhatsApp" hint="Format international sans le +, ex. 22872114444">
            <Input className="tnum" value={s.whatsapp} onChange={(e) => setS({ ...s, whatsapp: e.target.value })} />
          </Field>
        </div>

        <div className="mt-5">
          <span className="label">Numéros de téléphone</span>
          <div className="space-y-2">
            {s.phones.map((p, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  className="tnum"
                  value={p}
                  onChange={(e) => {
                    const next = [...s.phones];
                    next[i] = e.target.value;
                    setS({ ...s, phones: next });
                  }}
                />
                <button
                  onClick={() => setS({ ...s, phones: s.phones.filter((_, k) => k !== i) })}
                  className="shrink-0 rounded-xl border border-navy-200 px-3 text-navy-400 hover:border-brand hover:text-brand"
                  aria-label="Retirer"
                >
                  <IconClose className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setS({ ...s, phones: [...s.phones, ''] })}
              className="text-micro font-bold text-brand"
            >
              + Ajouter un numéro
            </button>
          </div>
        </div>
      </Panel>

      <Panel title="Adresse et position" description="La position GPS place le marqueur sur la carte de la page Contact.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Quartier / rue">
            <Input
              value={s.address.street || ''}
              onChange={(e) => setS({ ...s, address: { ...s.address, street: e.target.value } })}
            />
          </Field>
          <Field label="Ville">
            <Input
              value={s.address.city || ''}
              onChange={(e) => setS({ ...s, address: { ...s.address, city: e.target.value } })}
            />
          </Field>
          <Field label="Adresse complète — français">
            <Input
              value={s.address.full?.fr || ''}
              onChange={(e) =>
                setS({ ...s, address: { ...s.address, full: { ...s.address.full, fr: e.target.value } } })
              }
            />
          </Field>
          <Field label="Adresse complète — anglais">
            <Input
              value={s.address.full?.en || ''}
              onChange={(e) =>
                setS({ ...s, address: { ...s.address, full: { ...s.address.full, en: e.target.value } } })
              }
            />
          </Field>
          <Field label="Latitude" hint="Clic droit sur Google Maps → copier les chiffres. Le séparateur est un point.">
            <Input
              className="tnum"
              value={s.geo.lat}
              onChange={(e) => setS({ ...s, geo: { ...s.geo, lat: parseFloat(e.target.value) || 0 } })}
            />
          </Field>
          <Field label="Longitude">
            <Input
              className="tnum"
              value={s.geo.lng}
              onChange={(e) => setS({ ...s, geo: { ...s.geo, lng: parseFloat(e.target.value) || 0 } })}
            />
          </Field>
        </div>
      </Panel>

      <Panel title="Horaires">
        {['fr', 'en'].map((loc) => (
          <div key={loc} className="mb-6 last:mb-0">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-navy-400">
              {loc === 'fr' ? 'Français' : 'English'}
            </p>
            <div className="space-y-2">
              {(s.hours[loc] || []).map((ligne, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-2">
                  <Input value={ligne[0]} onChange={(e) => setHour(loc, i, 0, e.target.value)} />
                  <Input className="tnum" value={ligne[1]} onChange={(e) => setHour(loc, i, 1, e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Panel>

      <Panel title="Réseaux sociaux" description="Laissez « # » si la page n’existe pas encore.">
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.keys(s.social).map((k) => (
            <Field key={k} label={k}>
              <Input
                value={s.social[k]}
                onChange={(e) => setS({ ...s, social: { ...s.social, [k]: e.target.value } })}
              />
            </Field>
          ))}
        </div>
      </Panel>

      <Panel
        title="Zones desservies"
        description="Affichées sur l’accueil, la page Services et sous la carte."
      >
        <ul className="flex flex-wrap gap-2">
          {zones.map((z) => (
            <li
              key={z.id}
              className="flex items-center gap-2 rounded-full bg-navy-50 px-3.5 py-1.5 text-micro font-semibold text-navy-700"
            >
              {z.name}
              <button
                onClick={async () => {
                  await supabase.from('coverage_zones').delete().eq('id', z.id);
                  setZones((l) => l.filter((x) => x.id !== z.id));
                  refresh();
                }}
                aria-label={`Retirer ${z.name}`}
                className="text-navy-400 hover:text-brand"
              >
                <IconClose className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex gap-2">
          <Input
            value={nouvelleZone}
            onChange={(e) => setNouvelleZone(e.target.value)}
            placeholder="Ajouter un quartier"
            className="sm:w-64"
          />
          <button
            onClick={async () => {
              if (!nouvelleZone.trim()) return;
              const { data: z } = await supabase
                .from('coverage_zones')
                .insert({ name: nouvelleZone.trim(), position: zones.length })
                .select()
                .single();
              if (z) setZones((l) => [...l, z]);
              setNouvelleZone('');
              refresh();
            }}
            className="btn-ghost btn-sm shrink-0"
          >
            Ajouter
          </button>
        </div>
      </Panel>

      <SaveButton
        onSave={async () => {
          const { error } = await supabase
            .from('settings')
            .update({
              business_name: s.business_name,
              email: s.email,
              country_code: s.country_code,
              phones: s.phones.filter(Boolean),
              whatsapp: s.whatsapp,
              address: s.address,
              geo: s.geo,
              hours: s.hours,
              social: s.social,
            })
            .eq('id', true);
          if (!error) refresh();
          return error;
        }}
      />
    </div>
  );
}

/* ═══════════════ Textes ═══════════════ */
function Textes({ rows, supabase, refresh }) {
  const [items, setItems] = useState(rows);
  const [filtre, setFiltre] = useState('');
  const [modifies, setModifies] = useState({});

  const sections = [...new Set(rows.map((r) => r.key.split('.')[0]))];
  const visibles = items.filter(
    (r) =>
      !filtre ||
      r.key.toLowerCase().includes(filtre.toLowerCase()) ||
      r.fr.toLowerCase().includes(filtre.toLowerCase())
  );

  const set = (key, champ, valeur) => {
    setItems((l) => l.map((r) => (r.key === key ? { ...r, [champ]: valeur } : r)));
    setModifies((m) => ({ ...m, [key]: true }));
  };

  return (
    <div className="space-y-6">
      <Panel
        title="Titres et paragraphes"
        description={`${rows.length} textes. Chaque clé indique la page et l’emplacement.`}
      >
        <div className="mb-5 flex flex-wrap gap-2">
          <Input
            value={filtre}
            onChange={(e) => setFiltre(e.target.value)}
            placeholder="Filtrer par page ou par mot…"
            className="sm:w-80"
          />
          {sections.slice(0, 8).map((s) => (
            <button
              key={s}
              onClick={() => setFiltre(s + '.')}
              className="rounded-full bg-navy-50 px-3 py-1.5 text-micro font-semibold text-navy-600 hover:bg-navy-100"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="max-h-[38rem] space-y-6 overflow-y-auto pr-2">
          {visibles.map((r) => (
            <div key={r.key} className="border-b border-navy-50 pb-6 last:border-0">
              <p className="mb-2 font-mono text-[11px] font-semibold text-navy-400">
                {r.key}
                {modifies[r.key] && <span className="ml-2 text-brand">• modifié</span>}
              </p>
              <Bilingual
                label=""
                fr={r.fr}
                en={r.en}
                rows={r.fr.length > 90 ? 3 : undefined}
                onFr={(v) => set(r.key, 'fr', v)}
                onEn={(v) => set(r.key, 'en', v)}
              />
            </div>
          ))}
          {!visibles.length && (
            <p className="py-10 text-center text-small text-navy-400">Aucun texte ne correspond.</p>
          )}
        </div>
      </Panel>

      <SaveButton
        label={`Enregistrer ${Object.keys(modifies).length || ''} modification${
          Object.keys(modifies).length > 1 ? 's' : ''
        }`}
        disabled={!Object.keys(modifies).length}
        onSave={async () => {
          const aEnvoyer = items
            .filter((r) => modifies[r.key])
            .map(({ key, fr, en }) => ({ key, fr, en }));
          const { error } = await supabase.from('page_texts').upsert(aEnvoyer, { onConflict: 'key' });
          if (!error) {
            setModifies({});
            refresh();
          }
          return error;
        }}
      />
    </div>
  );
}

/* ═══════════════ Liste générique ═══════════════ */
function ListeEditable({ titre, description, rows, table, supabase, refresh, champs, vide, etiquette }) {
  const [items, setItems] = useState(rows);
  const [ouvert, setOuvert] = useState(null);

  const maj = (id, champ, valeur) =>
    setItems((l) => l.map((r) => (r.id === id ? { ...r, [champ]: valeur } : r)));

  return (
    <div className="space-y-6">
      <Panel title={titre} description={description}>
        <div className="space-y-3">
          {items.map((r, i) => (
            <div key={r.id} className="rounded-xl border border-navy-100">
              <button
                onClick={() => setOuvert(ouvert === r.id ? null : r.id)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left"
              >
                <span className="tnum text-micro font-bold text-navy-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-semibold text-navy-950">{etiquette(r)}</span>
                {!r.published && (
                  <span className="rounded-full bg-navy-100 px-2 py-0.5 text-[10px] font-bold text-navy-500">
                    masqué
                  </span>
                )}
                <IconArrow
                  className={`ml-auto h-4 w-4 shrink-0 text-navy-300 transition-transform ${
                    ouvert === r.id ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {ouvert === r.id && (
                <div className="space-y-5 border-t border-navy-100 p-5">
                  {champs.map((c) => (
                    <ChampEditable
                      key={c.name}
                      champ={c}
                      row={r}
                      supabase={supabase}
                      onChange={(v) => maj(r.id, c.name, v)}
                    />
                  ))}

                  <label className="flex items-center gap-2.5 text-small font-medium text-navy-700">
                    <input
                      type="checkbox"
                      checked={r.published !== false}
                      onChange={(e) => maj(r.id, 'published', e.target.checked)}
                      className="h-4 w-4 accent-brand"
                    />
                    Visible sur le site
                  </label>

                  <button
                    onClick={async () => {
                      if (!confirm('Supprimer définitivement cet élément ?')) return;
                      await supabase.from(table).delete().eq('id', r.id);
                      setItems((l) => l.filter((x) => x.id !== r.id));
                      refresh();
                    }}
                    className="text-micro font-semibold text-brand"
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          ))}
          {!items.length && (
            <p className="rounded-xl border border-dashed border-navy-200 py-10 text-center text-small text-navy-400">
              {vide}
            </p>
          )}
        </div>
      </Panel>

      <SaveButton
        onSave={async () => {
          const { error } = await supabase.from(table).upsert(items);
          if (!error) refresh();
          return error;
        }}
      />
    </div>
  );
}

function ChampEditable({ champ, row, supabase, onChange }) {
  if (champ.type === 'image') {
    return (
      <Field label={champ.label} hint={champ.hint}>
        <ImageUpload
          value={row[champ.name] || ''}
          onChange={(v) => onChange({ ...row, [champ.name]: v })}
          supabase={supabase}
          folder={champ.folder || 'divers'}
        />
        <Input
          className="mt-2.5"
          value={row[champ.name] || ''}
          onChange={(e) => onChange({ ...row, [champ.name]: e.target.value })}
          placeholder="Ou collez une adresse (https://…)"
        />
      </Field>
    );
  }
  if (champ.type === 'bilingue') {
    return (
      <Bilingual
        label={champ.label}
        hint={champ.hint}
        rows={champ.rows}
        fr={row[champ.name + '_fr']}
        en={row[champ.name + '_en']}
        onFr={(v) => onChange({ ...row, [champ.name + '_fr']: v })}
        onEn={(v) => onChange({ ...row, [champ.name + '_en']: v })}
      />
    );
  }
  if (champ.type === 'liste-bilingue') {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {['fr', 'en'].map((loc) => (
          <Field key={loc} label={`${champ.label} — ${loc === 'fr' ? 'français' : 'anglais'}`} hint="Une ligne par élément.">
            <Textarea
              rows={4}
              value={(row[champ.name + '_' + loc] || []).join('\n')}
              onChange={(e) =>
                onChange({
                  ...row,
                  [champ.name + '_' + loc]: e.target.value.split('\n').filter((x) => x.trim()),
                })
              }
            />
          </Field>
        ))}
      </div>
    );
  }
  return (
    <Field label={champ.label} hint={champ.hint}>
      <Input value={row[champ.name] || ''} onChange={(e) => onChange({ ...row, [champ.name]: e.target.value })} />
    </Field>
  );
}

/* ═══════════════ Onglets spécialisés ═══════════════ */
const patchRow = (setter) => (updated) => setter(updated);

function Services({ rows, supabase, refresh }) {
  return (
    <ListeEditable
      titre="Services"
      description="Les six prestations affichées sur l’accueil et la page Services."
      rows={rows}
      table="services"
      supabase={supabase}
      refresh={refresh}
      etiquette={(r) => r.title_fr}
      vide="Aucun service."
      champs={[
        { name: 'title', type: 'bilingue', label: 'Titre' },
        { name: 'short', type: 'bilingue', label: 'Résumé', rows: 2 },
        { name: 'details', type: 'liste-bilingue', label: 'Points détaillés' },
        { name: 'image_url', type: 'image', folder: 'services', label: 'Image' },
        { name: 'icon', label: 'Icône', hint: 'key · chip · remote · scanner · code · truck' },
      ]}
    />
  );
}

function Sections({ etapes, avantages, supabase, refresh }) {
  return (
    <div className="space-y-10">
      <ListeEditable
        titre="Comment nous travaillons"
        description="Les quatre étapes de la méthode."
        rows={etapes}
        table="process_steps"
        supabase={supabase}
        refresh={refresh}
        etiquette={(r) => r.title_fr}
        vide="Aucune étape."
        champs={[
          { name: 'title', type: 'bilingue', label: 'Titre' },
          { name: 'text', type: 'bilingue', label: 'Texte', rows: 2 },
          { name: 'image_url', type: 'image', folder: 'etapes', label: 'Image' },
        ]}
      />
      <ListeEditable
        titre="Nos avantages"
        description="La première ligne occupe la grande cellule de la grille."
        rows={avantages}
        table="advantages"
        supabase={supabase}
        refresh={refresh}
        etiquette={(r) => r.title_fr}
        vide="Aucun avantage."
        champs={[
          { name: 'title', type: 'bilingue', label: 'Titre' },
          { name: 'text', type: 'bilingue', label: 'Texte', rows: 2 },
          { name: 'image_url', type: 'image', folder: 'avantages', label: 'Image' },
          { name: 'icon', label: 'Icône', hint: 'bolt · tools · globe · sparkle' },
        ]}
      />
    </div>
  );
}

function Temoignages({ rows, supabase, refresh }) {
  return (
    <ListeEditable
      titre="Témoignages"
      description="Affichés sur l’accueil."
      rows={rows}
      table="testimonials"
      supabase={supabase}
      refresh={refresh}
      etiquette={(r) => r.author}
      vide="Aucun témoignage."
      champs={[
        { name: 'author', label: 'Nom du client' },
        { name: 'role', type: 'bilingue', label: 'Quartier et véhicule' },
        { name: 'quote', type: 'bilingue', label: 'Témoignage', rows: 3 },
      ]}
    />
  );
}

function Galerie({ rows, supabase, refresh }) {
  const [items, setItems] = useState([...rows].sort((a, b) => a.position - b.position));
  const [dragIndex, setDragIndex] = useState(null);

  const patch = (id, champ, valeur) =>
    setItems((l) => l.map((r) => (r.id === id ? { ...r, [champ]: valeur } : r)));

  const ajouter = async (url) => {
    const { data, error } = await supabase
      .from('gallery_items')
      .insert({ image_url: url, position: items.length, published: true })
      .select()
      .single();
    if (!error && data) setItems((l) => [...l, data]);
    refresh();
  };

  const supprimer = async (id) => {
    if (!confirm('Supprimer définitivement cette photo ?')) return;
    await supabase.from('gallery_items').delete().eq('id', id);
    setItems((l) => l.filter((x) => x.id !== id));
    refresh();
  };

  const deposer = (index) => {
    if (dragIndex === null || dragIndex === index) return;
    setItems((l) => {
      const suivant = [...l];
      const [deplace] = suivant.splice(dragIndex, 1);
      suivant.splice(index, 0, deplace);
      return suivant.map((r, i) => ({ ...r, position: i }));
    });
    setDragIndex(null);
  };

  return (
    <div className="space-y-6">
      <Panel
        title="Galerie"
        description="Envoyez une photo, glissez une vignette pour changer l’ordre d’affichage."
      >
        <div className="mb-7 rounded-xl border border-dashed border-navy-200 p-5">
          <span className="label">Ajouter une photo</span>
          <div className="mt-2">
            <ImageUpload supabase={supabase} folder="galerie" onChange={ajouter} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <div
              key={r.id}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => deposer(i)}
              className={`rounded-2xl border border-navy-100 bg-white p-4 transition-opacity ${
                dragIndex === i ? 'opacity-40' : ''
              }`}
            >
              <div className="relative aspect-[4/3] cursor-grab overflow-hidden rounded-xl bg-navy-50 active:cursor-grabbing">
                {r.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.image_url} alt="" className="h-full w-full object-cover" />
                )}
                <span className="absolute left-2 top-2 rounded-full bg-navy-950/70 px-2.5 py-1 text-[10px] font-bold text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {!r.published && (
                  <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-navy-600">
                    masqué
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-3.5">
                <Bilingual
                  label="Légende"
                  fr={r.caption_fr}
                  en={r.caption_en}
                  onFr={(v) => patch(r.id, 'caption_fr', v)}
                  onEn={(v) => patch(r.id, 'caption_en', v)}
                />
                <Field label="Crédit photo">
                  <Input value={r.credit || ''} onChange={(e) => patch(r.id, 'credit', e.target.value)} />
                </Field>

                <div className="flex items-center justify-between border-t border-navy-50 pt-3.5">
                  <label className="flex items-center gap-2 text-micro font-medium text-navy-700">
                    <input
                      type="checkbox"
                      checked={r.published !== false}
                      onChange={(e) => patch(r.id, 'published', e.target.checked)}
                      className="h-4 w-4 accent-brand"
                    />
                    Visible
                  </label>
                  <button
                    onClick={() => supprimer(r.id)}
                    className="text-micro font-semibold text-brand"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!items.length && (
          <p className="rounded-xl border border-dashed border-navy-200 py-10 text-center text-small text-navy-400">
            Aucune photo. Ajoutez-en une ci-dessus.
          </p>
        )}
      </Panel>

      <SaveButton
        onSave={async () => {
          const aEnvoyer = items.map(
            ({ id, image_url, caption_fr, caption_en, credit, published, position }) => ({
              id, image_url, caption_fr, caption_en, credit, published, position,
            })
          );
          const { error } = await supabase.from('gallery_items').upsert(aEnvoyer);
          if (!error) refresh();
          return error;
        }}
      />
    </div>
  );
}

function Chatbot({ rows, supabase, refresh }) {
  return (
    <ListeEditable
      titre="Réponses du chatbot"
      description="L’assistant cherche les mots déclencheurs dans la question du visiteur."
      rows={rows}
      table="chatbot_answers"
      supabase={supabase}
      refresh={refresh}
      etiquette={(r) => (r.keys_fr || []).slice(0, 3).join(', ')}
      vide="Aucune réponse."
      champs={[
        { name: 'keys', type: 'liste-bilingue', label: 'Mots déclencheurs' },
        { name: 'text', type: 'bilingue', label: 'Réponse', rows: 3 },
      ]}
    />
  );
}

function Marques({ regions, marques, supabase, refresh }) {
  const [items, setItems] = useState(regions);
  const [liste, setListe] = useState(marques);

  const marquesDe = (id) => liste.filter((m) => m.region_id === id);

  return (
    <div className="space-y-6">
      <Panel title="Marques par région" description="Chaque région a son visuel et sa liste de marques.">
        <div className="space-y-5">
          {items.map((r) => (
            <div key={r.id} className="rounded-xl border border-navy-100 p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom — français">
                  <Input
                    value={r.name_fr}
                    onChange={(e) =>
                      setItems((l) => l.map((x) => (x.id === r.id ? { ...x, name_fr: e.target.value } : x)))
                    }
                  />
                </Field>
                <Field label="Nom — anglais">
                  <Input
                    value={r.name_en}
                    onChange={(e) =>
                      setItems((l) => l.map((x) => (x.id === r.id ? { ...x, name_en: e.target.value } : x)))
                    }
                  />
                </Field>
              </div>

              <Field label="Image de la région">
                <ImageUpload
                  value={r.image_url || ''}
                  supabase={supabase}
                  folder="marques"
                  onChange={(v) =>
                    setItems((l) => l.map((x) => (x.id === r.id ? { ...x, image_url: v } : x)))
                  }
                />
                <Input
                  className="mt-2.5"
                  value={r.image_url || ''}
                  onChange={(e) =>
                    setItems((l) => l.map((x) => (x.id === r.id ? { ...x, image_url: e.target.value } : x)))
                  }
                  placeholder="Ou collez une adresse (https://…)"
                />
              </Field>

              <div className="mt-4">
                <span className="label">Marques ({marquesDe(r.id).length})</span>
                <Textarea
                  rows={3}
                  value={marquesDe(r.id).map((m) => m.name).join(', ')}
                  onChange={(e) => {
                    const noms = e.target.value.split(',').map((x) => x.trim()).filter(Boolean);
                    setListe((l) => [
                      ...l.filter((m) => m.region_id !== r.id),
                      ...noms.map((name, position) => ({
                        id: `tmp-${r.id}-${position}`,
                        region_id: r.id,
                        name,
                        position,
                        published: true,
                      })),
                    ]);
                  }}
                />
                <p className="mt-1.5 text-[11px] text-navy-400">Séparez les marques par une virgule.</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <SaveButton
        onSave={async () => {
          const e1 = (await supabase.from('brand_regions').upsert(items)).error;
          if (e1) return e1;

          for (const r of items) {
            await supabase.from('brands').delete().eq('region_id', r.id);
          }
          const aInserer = liste.map(({ region_id, name, position }) => ({ region_id, name, position }));
          const e2 = (await supabase.from('brands').insert(aInserer)).error;
          if (!e2) refresh();
          return e2;
        }}
      />
    </div>
  );
}

function Visuels({ rows, supabase, refresh }) {
  const [items, setItems] = useState(rows);

  return (
    <div className="space-y-6">
      <Panel
        title="Visuels nommés"
        description="Héros, bandeaux de page et collage « À propos »."
      >
        <div className="space-y-5">
          {items.map((m) => (
            <div key={m.slot} className="rounded-xl border border-navy-100 p-5">
              <p className="mb-3 font-mono text-[11px] font-semibold text-navy-400">{m.slot}</p>
              <div className="space-y-4">
                <Field label="Image">
                  <ImageUpload
                    value={m.image_url}
                    supabase={supabase}
                    folder="visuels"
                    onChange={(v) =>
                      setItems((l) => l.map((x) => (x.slot === m.slot ? { ...x, image_url: v } : x)))
                    }
                  />
                  <Input
                    className="mt-2.5"
                    value={m.image_url}
                    onChange={(e) =>
                      setItems((l) =>
                        l.map((x) => (x.slot === m.slot ? { ...x, image_url: e.target.value } : x))
                      )
                    }
                    placeholder="Ou collez une adresse (https://…)"
                  />
                </Field>
                <Bilingual
                  label="Description de l’image"
                  hint="Lue par les lecteurs d’écran et par Google."
                  fr={m.alt_fr}
                  en={m.alt_en}
                  onFr={(v) => setItems((l) => l.map((x) => (x.slot === m.slot ? { ...x, alt_fr: v } : x)))}
                  onEn={(v) => setItems((l) => l.map((x) => (x.slot === m.slot ? { ...x, alt_en: v } : x)))}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <SaveButton
        onSave={async () => {
          const { error } = await supabase.from('media_slots').upsert(items, { onConflict: 'slot' });
          if (!error) refresh();
          return error;
        }}
      />
    </div>
  );
}
