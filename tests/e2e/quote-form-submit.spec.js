import { test, expect } from '@playwright/test';

/**
 * Contrairement à tests/e2e/contact-form.spec.js (validation uniquement,
 * jamais de soumission réelle), ce test soumet effectivement le formulaire —
 * mais intercepte l'appel réseau vers Supabase pour ne jamais écrire de
 * vraie ligne en base. On vérifie ainsi le chemin complet (validation →
 * appel réseau → confirmation visuelle) sans le risque de polluer
 * quote_requests à chaque exécution de CI.
 *
 * Si les identifiants Supabase ne sont pas configurés dans l'environnement
 * de test, ContactClient.saveToDatabase() ne fait aucun appel réseau (base
 * non configurée) : le test se contente alors de vérifier le repli e-mail/
 * WhatsApp, sans échouer.
 */
test.describe('Formulaire de devis — soumission (réseau simulé)', () => {
  test('soumet le formulaire, appelle Supabase avec les bons champs, affiche la confirmation', async ({
    page,
  }) => {
    let capturedBody = null;

    await page.route('**/rest/v1/quote_requests**', async (route) => {
      capturedBody = route.request().postDataJSON();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify([{ id: 'e2e-test-id', ...capturedBody }]),
      });
    });

    await page.goto('/contact');

    await page.locator('#name').fill('Test Playwright');
    await page.locator('#phone').fill('72 11 44 44');
    await page.locator('#message').fill('Message de test automatisé — ne pas traiter.');
    await page.locator('input[type="checkbox"]').check();

    await page.getByRole('button', { name: /devis|quote/i }).first().click();

    // Confirmation visuelle (role="status", voir ContactClient.jsx)
    await expect(page.getByRole('status')).toBeVisible({ timeout: 10000 });

    // Si Supabase était configuré et l'appel intercepté, on vérifie que le
    // visiteur ne peut jamais s'auto-attribuer un statut, une source ou un
    // consentement différent de ceux imposés côté serveur/DB (voir la
    // policy "depot public borne" dans supabase/schema.sql).
    if (capturedBody) {
      expect(capturedBody.consent).toBe(true);
      expect(capturedBody.source).toBe('site');
      expect(capturedBody.status).toBe('nouvelle');
      expect(capturedBody.name).toBe('Test Playwright');
    }
  });
});
