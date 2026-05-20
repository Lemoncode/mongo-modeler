import { baseVitestConfig } from '@lemoncode/vitest-config/base';
import { mergeConfig } from 'vitest/config';

export default mergeConfig(baseVitestConfig, {
  test: {},
});
