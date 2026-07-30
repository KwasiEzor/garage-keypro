import { defineConfig, devices } from '@playwright/test';

/**
 * Tests de bout en bout — tournent contre un vrai serveur Next.js
 * (build + start), jamais dans le bac à sable sans réseau utilisé pour le
 * développement assisté : lancer localement ou en CI avec
 * `npm run test:e2e`. Voir docs/TESTS.md.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  timeout: 30000,

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],

  // En CI, on build puis on démarre le serveur de prod — c'est ce qui
  // tournera réellement en production. En local, réutilise un serveur
  // déjà lancé (`npm run dev`) si présent, pour itérer plus vite.
  webServer: {
    command: process.env.CI ? 'npm run build && npm run start' : 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
