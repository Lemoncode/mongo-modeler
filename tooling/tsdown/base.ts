import { defineConfig } from 'tsdown';

export const baseTsdownConfig = defineConfig({
  format: 'esm',
  dts: true,
  clean: true,
  target: 'es2024',
});
