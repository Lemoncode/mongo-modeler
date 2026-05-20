import { playwright } from '@vitest/browser-playwright';
import { mergeConfig } from 'vitest/config';
import { baseVitestConfig } from './base.ts';

export const browserVitestConfig = mergeConfig(baseVitestConfig, {
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          include: ['src/**/*.spec.ts'],
          exclude: ['**/*.browser.spec.{ts,tsx}'],
        },
      },
      {
        extends: true,
        test: {
          name: 'browser',
          setupFiles: [new URL('./browser-setup.ts', import.meta.url).pathname],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
          include: ['src/**/*.browser.spec.{ts,tsx}'],
        },
      },
    ],
  },
});
