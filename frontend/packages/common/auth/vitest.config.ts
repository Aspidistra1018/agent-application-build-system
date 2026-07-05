import { defineConfig } from '@coze-arch/vitest-config';

export default defineConfig({
  dirname: __dirname,
  preset: 'web',
  test: {
    // Global test timeout (milliseconds)
    testTimeout: 10000, // 10 seconds
    // Hook timeout in milliseconds
    hookTimeout: 10000, // 10 seconds
  },
});
