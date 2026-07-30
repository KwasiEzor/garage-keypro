'use client';

import { useRef, useState } from 'react';

const BUCKET = 'site-media';
const TAILLE_MAX = 8 * 1024 * 1024; // 8 Mo

/**
 * Envoie une image vers le bucket Supabase Storage « site-media » et
 * renvoie son adresse publique via `onChange`. N'importe quel administrateur
 * peut écrire dans ce bucket (voir la policy « ecriture admin site-media »),
 * la lecture est publique — nécessaire pour l'afficher sur le site.
 *
 * `value` reste une simple chaîne (l'adresse de l'image) : ce composant ne
 * remplace pas le champ URL, il lui donne juste un raccourci d'envoi de
 * fichier. Une adresse externe (Unsplash, etc.) reste acceptée telle quelle.
 */
export default function ImageUpload({ value, onChange, supabase, folder = 'divers' }) {
  const inputRef = useRef(null);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    if (!supabase) {
      setErreur('Base non configurée.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setErreur('Choisissez un fichier image.');
      return;
    }
    if (file.size > TAILLE_MAX) {
      setErreur('Image trop lourde (8 Mo maximum).');
      return;
    }

    setEnvoi(true);
    setErreur('');
    try {
      const extension = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const nom = `${folder}/${crypto.randomUUID()}.${extension}`;
      const { error: erreurEnvoi } = await supabase.storage.from(BUCKET).upload(nom, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (erreurEnvoi) throw erreurEnvoi;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(nom);
      onChange(data.publicUrl);
    } catch (e) {
      setErreur(e.message || 'Échec de l’envoi.');
    } finally {
      setEnvoi(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="h-16 w-24 shrink-0 rounded-lg object-cover ring-1 ring-navy-100"
        />
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={envoi}
        className="btn-ghost btn-sm shrink-0 disabled:opacity-60"
      >
        {envoi ? 'Envoi…' : value ? 'Changer l’image' : 'Envoyer une image'}
      </button>

      {value && !envoi && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="text-micro font-semibold text-brand"
        >
          Retirer
        </button>
      )}

      {erreur && <p className="w-full text-micro font-medium text-brand-700">{erreur}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
