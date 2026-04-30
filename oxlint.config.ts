import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['typescript', 'import', 'oxc', 'unicorn'],
  ignorePatterns: ['dist', 'coverage', 'node_modules'],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    perf: 'warn',
  },
  rules: {
    'typescript/no-explicit-any': 'warn',
    'typescript/no-non-null-assertion': 'warn',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-spread': 'off',
  },
  overrides: [
    {
      files: ['apps/web/**/*.{ts,tsx}'],
      plugins: ['react', 'jsx-a11y'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/no-direct-mutation-state': 'error',
        'react/jsx-no-target-blank': 'error',
        'jsx-a11y/alt-text': 'error',
        'jsx-a11y/anchor-has-content': 'error',
      },
    },
    {
      files: ['**/*.spec.ts', '**/*.spec.tsx'],
      plugins: ['vitest'],
      rules: {
        'typescript/no-explicit-any': 'off',
        'typescript/no-non-null-assertion': 'off',
      },
    },
  ],
});
