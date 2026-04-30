import { mergeConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';
import { baseVitestConfig } from '@lemoncode/vitest-config/base';

export default mergeConfig(baseVitestConfig, {
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    include: ['./src/**/*.spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['e2e/*', 'node_modules', 'dist'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
