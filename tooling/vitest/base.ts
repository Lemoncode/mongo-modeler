import { defineConfig } from 'vitest/config';

export const baseVitestConfig = defineConfig({
  test: {
    globals: true,
    clearMocks: true,
    restoreMocks: true,
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        // Test & config files
        '**/*.spec.{ts,tsx}',
        '**/*.bench.ts',
        '**/*.factory.ts',
        '**/test/**',
        '**/*.d.ts',
        '**/vitest.*.ts',
        // Type-only files (no runtime logic)
        '**/index.ts',
        '**/types.ts',
        '**/*.api-model.ts',
        '**/*.db-model.ts',
        '**/*.model.ts',
        '**/*.vm.ts',
        // Configuration / wiring (no business logic)
        '**/*.validation.ts',
        '**/*.constant.ts',
        '**/*.context.ts',
        '**/*.api.ts',
        '**/*.query.ts',
        '**/*.style.ts',
        '**/*.module.css',
        // Structural layers (no logic)
        '**/scenes/**',
        '**/layouts/**',
      ],
    },
  },
});
