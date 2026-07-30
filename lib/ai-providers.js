// Fournisseurs IA disponibles pour le chatbot — liste partagée entre
// l'interface d'administration (menu déroulant dans /admin/parametres) et
// la route serveur qui les appelle (app/api/chat/route.js).
//
// Volontairement SANS clé ici : les clés d'API vivent uniquement en
// variable d'environnement (voir .env.example), jamais en base — la table
// `settings` est lisible par n'importe quel visiteur anonyme (RLS "lecture
// publique"), donc jamais l'endroit où stocker un secret.
export const AI_PROVIDERS = [
  { id: 'anthropic', label: 'Claude (Anthropic)' },
  { id: 'openai', label: 'GPT (OpenAI)' },
  { id: 'google', label: 'Gemini (Google)' },
  { id: 'gemma', label: 'Gemma (Google)' },
  { id: 'grok', label: 'Grok (xAI)' },
  { id: 'kimi', label: 'Kimi (Moonshot AI)' },
  { id: 'qwen', label: 'Qwen (Alibaba Cloud)' },
];

export const AI_PROVIDER_IDS = AI_PROVIDERS.map((p) => p.id);
