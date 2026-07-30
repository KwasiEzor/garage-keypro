import { test, expect } from '@playwright/test';

/**
 * L'espace admin peut se présenter sous deux visages selon que les clés
 * Supabase sont renseignées au moment du build (NEXT_PUBLIC_* est figé à la
 * compilation) : formulaire de connexion normal, ou écran "non configuré".
 * Ces tests acceptent les deux — ce qu'ils vérifient, c'est qu'aucun cas ne
 * casse et qu'aucune donnée du tableau de bord n'apparaît sans compte.
 */

test.describe('Espace admin — sans session', () => {
  test('/admin ne montre jamais le tableau de bord à un visiteur anonyme', async ({ page }) => {
    await page.goto('/admin');

    const connexionOuConfig = page.getByText(/se connecter|tableau de bord non configuré|base injoignable/i);
    await expect(connexionOuConfig.first()).toBeVisible();

    // Aucune fuite de données : ni tableau, ni liste de devis/clients visible.
    await expect(page.getByText(/devis_envoye|nouvelle demande/i)).toHaveCount(0);
  });

  test('/admin/connexion refuse un mauvais mot de passe sans planter', async ({ page }) => {
    await page.goto('/admin/connexion');

    const champEmail = page.locator('#email');
    if ((await champEmail.count()) === 0) {
      // Clés Supabase absentes au build : écran de configuration, rien à tester ici.
      await expect(page.getByText(/tableau de bord non configuré/i)).toBeVisible();
      return;
    }

    await champEmail.fill('inexistant@keypro.tg');
    await page.locator('#password').fill('mauvais-mot-de-passe-123');
    await page.getByRole('button', { name: /se connecter/i }).click();

    await expect(page.getByRole('alert')).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/\/admin\/connexion/);
  });

  test('la page de connexion n’est pas indexable', async ({ page }) => {
    const reponse = await page.goto('/admin/connexion');
    expect(reponse.ok()).toBe(true);
    // metadata.robots = { index: false } → balise <meta name="robots" content="noindex...">
    const meta = page.locator('meta[name="robots"]');
    await expect(meta).toHaveAttribute('content', /noindex/);
  });
});
