import { coverageConfigDefaults, type UserConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export const defaultVitestConfig: UserConfig = {
  plugins: [tsconfigPaths()],
  resolve: {
    // Priority to identify main, if main is not configured, identify the module
    mainFields: ['main', 'module', 'exports'],
  },
  server: {
    hmr: {
      port: undefined,
    },
  },
  test: {
    testTimeout: 10 * 1000,
    pool: 'forks',
    poolOptions: {
      forks: {
        maxForks: 32,
        minForks: 1,
      },
    },
    sequence: {
      // After vitest 2.0, all hooks run serially by default
      hooks: 'parallel',
    },
    globals: true,
    mockReset: false,
    silent: process.env.CI === 'true',
    coverage: {
      // Gradually open each package
      all: false,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: coverageConfigDefaults.exclude,
      provider: 'v8',
      reporter: ['cobertura', 'text', 'html', 'clover', 'json', 'json-summary'],
    },
  },
};
