import { baseTsdownConfig } from '@lemoncode/tsdown-config/base';
import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    ...baseTsdownConfig,
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: false,
    deps: {
      neverBundle: ['vscode'],
    },
  },
  {
    ...baseTsdownConfig,
    entry: { webview: 'src/webview/main.ts' },
    format: 'iife',
    platform: 'browser',
    outputOptions: {
      entryFileNames: '[name].js',
    },
  },
]);
