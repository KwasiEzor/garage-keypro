// Route du chatbot.
// Sans clé API, elle renvoie 204 : le composant bascule automatiquement
// sur les réponses locales définies dans lib/dictionaries.js.
// Pour activer l'IA, ajoutez ANTHROPIC_API_KEY dans .env.local.

import { site } from '@/lib/site';

export const runtime = 'nodejs';

const SYSTEM = (locale) => `Tu es l'assistant virtuel de ${site.name}, un centre technique automobile spécialisé dans :
- la reproduction et la programmation de clés auto (mécaniques, transpondeur, smart keys)
- la réparation de télécommandes et de systèmes électroniques
- le diagnostic électronique (OBD, calculateurs, capteurs)
- le codage et la programmation véhicule
- l'assistance automobile mobile (domicile, bureau, bord de route)

Marques couvertes : japonaises, européennes, américaines, chinoises.
Horaires : lundi à samedi 08h00-19h00 ; dimanche urgences uniquement.
Téléphones : ${site.phones.map((p) => `${site.countryCode} ${p}`).join(', ')}. E-mail : ${site.email}.

Règles :
- Réponds en ${locale === 'en' ? 'anglais' : 'français'}.
- Sois bref (3 phrases maximum), concret et chaleureux.
- Ne donne jamais de prix ferme : invite à envoyer marque, modèle et année pour un devis.
- Pour toute urgence, oriente vers le téléphone ou WhatsApp.
- Écris toujours les numéros avec l'indicatif du Togo : ${site.countryCode}.
- L'atelier est à ${site.address.full.fr} ; l'intervention mobile couvre le Grand Lomé.`;

export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(null, { status: 204 });
  }

  try {
    const { message, locale = 'fr' } = await request.json();
    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message manquant' }, { status: 400 });
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: SYSTEM(locale),
        messages: [{ role: 'user', content: message.slice(0, 1000) }],
      }),
    });

    if (!res.ok) return new Response(null, { status: 204 });

    const data = await res.json();
    const reply = data?.content?.[0]?.text?.trim();
    if (!reply) return new Response(null, { status: 204 });

    return Response.json({ reply });
  } catch {
    return new Response(null, { status: 204 });
  }
}
