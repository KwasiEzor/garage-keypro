// Route du chatbot.
// Sans clé API pour le fournisseur choisi, elle renvoie 204 : le composant
// bascule automatiquement sur les réponses locales de lib/dictionaries.js.
//
// Le FOURNISSEUR (Claude, GPT, Gemini, Gemma, Grok, Kimi, Qwen) se choisit
// depuis /admin/parametres, sans redéploiement. Les CLÉS, elles, restent
// toujours en variable d'environnement — jamais en base, jamais envoyées
// au navigateur (voir .env.example pour la liste complète).

import { createHash } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from '@/lib/supabase/config';
import { site } from '@/lib/site';
import { AI_PROVIDER_IDS } from '@/lib/ai-providers';

export const runtime = 'nodejs';

// Cette route proxy des fournisseurs IA payants à l'appel : sans garde-fou,
// n'importe quel visiteur (ou script) peut faire gonfler la facture. La
// fonction rate_limit_check() (voir supabase/schema.sql) est appelée avec la
// clé de service, jamais exposée au navigateur — elle contourne RLS, ce qui
// est voulu ici : c'est un compteur d'abus, pas une donnée métier.
const CHAT_RATE_LIMIT = 20; // messages
const CHAT_RATE_WINDOW = '10 minutes';

/** IP du visiteur, hachée avant stockage — jamais l'adresse en clair. */
function clientIpHash(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = (forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip')) || 'inconnue';
  return createHash('sha256').update(ip.trim()).digest('hex');
}

/**
 * `true` si la requête peut continuer. En cas de doute (base non
 * configurée, clé de service absente, erreur réseau), on laisse passer :
 * un chatbot qui refuse de répondre à cause d'un souci technique est pire
 * qu'un chatbot qui, au pire, se fait un peu abuser.
 */
async function withinRateLimit(ipHash) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured || !serviceKey) return true;

  try {
    const admin = createClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false } });
    const { data, error } = await admin.rpc('rate_limit_check', {
      p_scope: 'chat',
      p_key: ipHash,
      p_limit: CHAT_RATE_LIMIT,
      p_window: CHAT_RATE_WINDOW,
    });
    if (error) return true;
    return data !== false;
  } catch {
    return true;
  }
}

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

/** Anthropic — API "Messages", forme qui lui est propre. */
async function callAnthropic({ apiKey, model, system, message }) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 400,
      system,
      messages: [{ role: 'user', content: message }],
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.content?.[0]?.text?.trim() || null;
}

/**
 * Forme "chat completions" popularisée par OpenAI et reprise telle quelle
 * par la plupart des autres fournisseurs — un seul adaptateur sert donc
 * OpenAI, Grok (xAI), Kimi (Moonshot AI) et Qwen (Alibaba Cloud, mode
 * compatible), seuls l'URL, la clé et le modèle changent.
 */
async function callOpenAICompatible({ apiKey, model, system, message, baseURL }) {
  const res = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 400,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: message },
      ],
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.choices?.[0]?.message?.content?.trim() || null;
}

/** Google — API "Generative Language", commune à Gemini et Gemma. */
async function callGoogle({ apiKey, model, system, message }) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: message }] }],
        generationConfig: { maxOutputTokens: 400 },
      }),
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
}

// Modèles par défaut au 2026-07, réglables sans redéploiement via la
// variable d'environnement indiquée (modelEnvVar) si un fournisseur change
// ses identifiants de modèle entre-temps.
const PROVIDERS = {
  anthropic: {
    envKey: 'ANTHROPIC_API_KEY',
    modelEnvVar: 'ANTHROPIC_MODEL',
    defaultModel: 'claude-haiku-4-5-20251001',
    call: callAnthropic,
  },
  openai: {
    envKey: 'OPENAI_API_KEY',
    modelEnvVar: 'OPENAI_MODEL',
    defaultModel: 'gpt-4o-mini',
    baseURL: 'https://api.openai.com/v1/chat/completions',
    call: callOpenAICompatible,
  },
  grok: {
    envKey: 'XAI_API_KEY',
    modelEnvVar: 'XAI_MODEL',
    defaultModel: 'grok-3-mini',
    baseURL: 'https://api.x.ai/v1/chat/completions',
    call: callOpenAICompatible,
  },
  kimi: {
    envKey: 'MOONSHOT_API_KEY',
    modelEnvVar: 'MOONSHOT_MODEL',
    defaultModel: 'moonshot-v1-8k',
    baseURL: 'https://api.moonshot.ai/v1/chat/completions',
    call: callOpenAICompatible,
  },
  qwen: {
    envKey: 'DASHSCOPE_API_KEY',
    modelEnvVar: 'DASHSCOPE_MODEL',
    defaultModel: 'qwen-plus',
    baseURL: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions',
    call: callOpenAICompatible,
  },
  google: {
    envKey: 'GOOGLE_API_KEY',
    modelEnvVar: 'GOOGLE_MODEL',
    defaultModel: 'gemini-2.5-flash',
    call: callGoogle,
  },
  gemma: {
    // Gemma se sert depuis la même API Google AI Studio que Gemini : même clé.
    envKey: 'GOOGLE_API_KEY',
    modelEnvVar: 'GOOGLE_GEMMA_MODEL',
    defaultModel: 'gemma-3-27b-it',
    call: callGoogle,
  },
};

/**
 * Lit le fournisseur choisi dans /admin/parametres (colonne
 * settings.ai_provider). Repli sur 'anthropic' si la base n'est pas
 * configurée, injoignable, ou si la valeur stockée est invalide — pour ne
 * jamais casser une installation existante qui n'a encore que
 * ANTHROPIC_API_KEY.
 */
async function currentProviderId() {
  if (!isSupabaseConfigured) return 'anthropic';
  try {
    const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
    const { data } = await db.from('settings').select('ai_provider').maybeSingle();
    return AI_PROVIDER_IDS.includes(data?.ai_provider) ? data.ai_provider : 'anthropic';
  } catch {
    return 'anthropic';
  }
}

export async function POST(request) {
  const ipHash = clientIpHash(request);
  if (!(await withinRateLimit(ipHash))) {
    return Response.json(
      { error: 'Trop de messages envoyés. Réessayez dans quelques minutes.' },
      { status: 429 }
    );
  }

  const providerId = await currentProviderId();
  const provider = PROVIDERS[providerId];
  const apiKey = process.env[provider.envKey];
  if (!apiKey) return new Response(null, { status: 204 });

  try {
    const { message, locale = 'fr' } = await request.json();
    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message manquant' }, { status: 400 });
    }

    const model = process.env[provider.modelEnvVar] || provider.defaultModel;
    const reply = await provider.call({
      apiKey,
      model,
      baseURL: provider.baseURL,
      system: SYSTEM(locale),
      message: message.slice(0, 1000),
    });

    if (!reply) return new Response(null, { status: 204 });
    return Response.json({ reply });
  } catch {
    return new Response(null, { status: 204 });
  }
}
