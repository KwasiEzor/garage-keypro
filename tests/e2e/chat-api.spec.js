import { test, expect } from '@playwright/test';

/**
 * Le chatbot est masqué par défaut (site.showChatbot = false), donc on ne
 * peut pas compter sur son bouton flottant pour être visible dans un
 * environnement de test générique. On teste directement la route
 * /api/chat : c'est elle qui doit toujours se dégrader proprement
 * (composants/Chatbot.jsx bascule sur les réponses locales de
 * lib/dictionaries.js dès que cette route ne renvoie pas 200 avec un champ
 * `reply`), jamais planter avec une erreur serveur.
 */
test.describe('/api/chat — dégradation gracieuse', () => {
  test('rejette un message vide avec 400', async ({ request }) => {
    const res = await request.post('/api/chat', { data: { message: '' } });
    expect(res.status()).toBe(400);
  });

  test('répond ou se dégrade proprement sur un message valide, jamais une erreur serveur', async ({
    request,
  }) => {
    const res = await request.post('/api/chat', {
      data: { message: 'Bonjour, quels sont vos horaires ?', locale: 'fr' },
    });

    // 204 : aucun fournisseur IA configuré (ou fournisseur indisponible) —
    // le composant bascule alors sur les réponses locales.
    // 200 : une réponse IA a bien été générée.
    expect([200, 204]).toContain(res.status());

    if (res.status() === 200) {
      const data = await res.json();
      expect(typeof data.reply).toBe('string');
      expect(data.reply.length).toBeGreaterThan(0);
    }
  });

  test('ne plante jamais (jamais 5xx), même avec un corps invalide', async ({ request }) => {
    const res = await request.post('/api/chat', {
      data: 'ceci n’est pas du JSON',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status()).toBeLessThan(500);
  });
});
