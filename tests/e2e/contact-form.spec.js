import { test, expect } from '@playwright/test';

/**
 * On vérifie la validation côté client du formulaire de devis, sans jamais
 * réellement le soumettre : la soumission déclenche mailto:/WhatsApp et,
 * si Supabase est configuré, une vraie écriture en base. Le contenu
 * fonctionnel de l'écriture est couvert par tests/security/rls.test.js.
 */
test.describe('Formulaire de contact — validation', () => {
  test('refuse l’envoi tant que le consentement n’est pas coché', async ({ page }) => {
    await page.goto('/contact');

    await page.locator('#name').fill('Test Playwright');
    await page.locator('#phone').fill('72 11 44 44');
    await page.locator('#message').fill('Message de test automatisé');
    // Volontairement : pas de clic sur la case de consentement.

    await page.getByRole('button', { name: /devis|quote/i }).first().click();

    // Le navigateur bloque nativement la soumission (case "required"),
    // donc aucune navigation ni message mailto: ne doit se produire.
    await expect(page).toHaveURL(/\/contact$/);
  });

  test('les champs obligatoires empêchent la soumission native quand vides', async ({ page }) => {
    await page.goto('/contact');
    const champNom = page.locator('#name');
    await expect(champNom).toHaveAttribute('required', '');

    const champTelephone = page.locator('#phone');
    await expect(champTelephone).toHaveAttribute('required', '');

    const champMessage = page.locator('#message');
    await expect(champMessage).toHaveAttribute('required', '');
  });

  test('affiche le lien vers la politique de confidentialité', async ({ page }) => {
    await page.goto('/contact');
    const lien = page.getByRole('link', { name: /politique|privacy/i });
    await expect(lien).toBeVisible();
    await expect(lien).toHaveAttribute('href', '/politique-confidentialite');
  });

  test('affiche la carte de localisation', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('.leaflet-container, [class*="leaflet"]').first()).toBeVisible({
      timeout: 10000,
    });
  });
});
