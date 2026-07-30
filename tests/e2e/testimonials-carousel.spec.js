import { test, expect } from '@playwright/test';

/**
 * Régression ciblée : une capture d'écran a montré des cartes de
 * témoignages larges de ~150 px, forçant un mot par ligne. La cause était
 * un padding en pourcentage sur la piste combiné à une largeur en
 * pourcentage sur les cartes — les deux se multipliaient au lieu de
 * s'additionner (voir le commit qui corrige components/TestimonialsCarousel.jsx).
 * Le test de largeur ci-dessous aurait détecté cette régression.
 *
 * Locale forcée en français : sans ça, la langue par défaut du navigateur
 * Playwright (en-US) ferait basculer LanguageProvider en anglais avant que
 * le test n'ait pu lire quoi que ce soit.
 */
test.use({ locale: 'fr-FR' });

const region = (page) => page.getByRole('region', { name: /témoignages|testimonials/i });

test.describe('Carrousel de témoignages', () => {
  test('affiche la région, les 7 cartes et 7 puces', async ({ page }) => {
    await page.goto('/');
    const carrousel = region(page);
    await expect(carrousel).toBeVisible();

    const cartes = carrousel.getByRole('group');
    await expect(cartes).toHaveCount(7);

    const puces = page.locator('button[aria-label*="témoignage" i], button[aria-label*="testimonial" i]');
    await expect(puces).toHaveCount(7);
  });

  test('la première carte a une largeur lisible (régression : plus de 220 px)', async ({ page }) => {
    await page.goto('/');
    const premiere = region(page).getByRole('group').first();
    const box = await premiere.boundingBox();
    expect(box).not.toBeNull();
    // Avant correction : ~130-190 px, texte réduit à un mot par ligne.
    expect(box.width).toBeGreaterThan(220);
    expect(box.width).toBeLessThan(600);
  });

  test('la flèche "suivant" avance à la carte 2, la puce 2 devient active', async ({ page }) => {
    await page.goto('/');
    // Les flèches sont des soeurs de la région (role="region" est sur la
    // piste défilante elle-même), pas des descendantes — on les cherche
    // donc au niveau de la page, pas via carrousel.getByRole(...).
    await page.getByRole('button', { name: /suivant|next/i }).click();

    // La région annonce le changement (aria-live), on peut s'y fier sans timing fragile.
    await expect(page.getByText(/2\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });

    const puce2 = page.locator('button[aria-current="true"]');
    await expect(puce2).toHaveCount(1);
  });

  test('cliquer une puce saute directement à la carte correspondante', async ({ page }) => {
    await page.goto('/');
    const puces = page.locator('button[aria-label*="témoignage" i], button[aria-label*="testimonial" i]');
    await puces.nth(4).click(); // 5ᵉ témoignage

    await expect(page.getByText(/5\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });
  });

  test('la navigation boucle : "suivant" depuis la dernière carte revient à la première', async ({ page }) => {
    await page.goto('/');
    const suivant = page.getByRole('button', { name: /suivant|next/i });

    for (let i = 0; i < 6; i++) {
      await suivant.click();
      await page.waitForTimeout(150);
    }
    await expect(page.getByText(/7\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });

    await suivant.click();
    await expect(page.getByText(/1\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });
  });

  test('les flèches gauche/droite du clavier déplacent le carrousel', async ({ page }) => {
    await page.goto('/');
    const carrousel = region(page);
    await carrousel.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByText(/2\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByText(/1\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });
  });
});
