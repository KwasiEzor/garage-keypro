import { test, expect } from '@playwright/test';

test.describe('Page d’accueil', () => {
  test('se charge et affiche l’en-tête + le pied de page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/KEYPRO/i);
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('le lien WhatsApp flottant pointe vers wa.me', async ({ page }) => {
    await page.goto('/');
    const lien = page.locator('a[href*="wa.me"]').first();
    await expect(lien).toHaveCount(1);
  });
});

test.describe('Navigation principale', () => {
  test('mène vers la page Contact', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Contact', exact: true }).first().click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('mène vers la page Services', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Services', exact: true }).first().click();
    await expect(page).toHaveURL(/\/services$/);
  });
});

test.describe('Sélecteur de langue FR/EN', () => {
  test('bascule le contenu et mémorise le choix après rechargement', async ({ page }) => {
    await page.goto('/');

    // Le bouton "en" du sélecteur visible en haut de page (desktop).
    const boutonEn = page.getByRole('button', { name: 'en', exact: true }).first();
    await boutonEn.click();

    await expect(page.getByRole('link', { name: 'Contact', exact: true }).first()).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    const stocke = await page.evaluate(() => window.localStorage.getItem('keypro-locale'));
    expect(stocke).toBe('en');
  });
});

test.describe('Page 404', () => {
  test('affiche une page personnalisée pour une URL inconnue', async ({ page }) => {
    const reponse = await page.goto('/cette-page-n-existe-pas');
    expect(reponse.status()).toBe(404);
    await expect(page.getByText('404')).toBeVisible();
  });
});

test.describe('SEO — fichiers générés', () => {
  test('/robots.txt répond et référence le sitemap', async ({ request }) => {
    const reponse = await request.get('/robots.txt');
    expect(reponse.ok()).toBe(true);
    const corps = await reponse.text();
    expect(corps).toContain('Disallow: /admin');
    expect(corps).toContain('sitemap.xml');
  });

  test('/sitemap.xml répond et liste les pages publiques', async ({ request }) => {
    const reponse = await request.get('/sitemap.xml');
    expect(reponse.ok()).toBe(true);
    const corps = await reponse.text();
    expect(corps).toContain('<urlset');
    expect(corps).toContain('/contact');
    expect(corps).not.toContain('/admin');
  });
});
