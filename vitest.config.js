import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const racine = fileURLToPath(new URL('.', import.meta.url));

/**
 * Deux suites distinctes, lancées séparément :
 *
 *  - tests/unit      → fonctions pures (lib/), aucune dépendance externe,
 *                       tourne partout, y compris en CI sans secret.
 *  - tests/security   → politiques RLS, tape sur le vrai projet Supabase
 *                       avec la clé anonyme. Nécessite .env.local (ou des
 *                       secrets en CI). Jamais lancée par défaut.
 *
 * `npm test` ne lance que tests/unit — voir package.json.
 */
export default defineConfig({
  resolve: {
    // Reflète le "@/*": ["./*"] de tsconfig.json — Vitest ne lit pas
    // tsconfig par lui-même.
    alias: { '@': racine },
  },
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.js', 'tests/security/**/*.test.js'],
    exclude: ['tests/e2e/**', 'node_modules/**', '.next/**'],
    testTimeout: 15000,
  },
});
