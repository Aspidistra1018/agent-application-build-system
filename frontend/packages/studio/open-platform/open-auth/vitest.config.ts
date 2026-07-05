import { defineConfig } from '@coze-arch/vitest-config';

export default defineConfig(
  {
    dirname: __dirname,
    preset: 'web',
    plugins: [
      {
        name: 'edenx-virtual-modules',
        enforce: 'pre',
      },
    ],
    test: {
      setupFiles: ['./setup'],
      includeSource: ['./src'],
      coverage: {
        all: true,
        include: ['src'],
        exclude: [
          'src/**/*.tsx',
          'src/index.tsx',
          'src/global.d.ts',
          'src/typings.d.ts',
          'src/components/**',
          'src/pages/**',
          'src/constants/**',
          'src/utils/public-private-keys.ts', // Windows API
          'src/utils/docs.ts', // Unused online, only boe used, about to be deleted
          'src/utils/time.ts', // Dayjs API calls
          'src/utils//analytics/index.ts',
          'src/utils//analytics/chart.ts', // 有图表 dom 相关内容
          'src/hooks/pat/action/**', // Action class hook
          'src/hooks/oauth-app/action/**', // Action class hook
          'src/hooks/use-arcosite.ts', // Not used online, only boe used
          'src/hooks/use-show-mask.ts', // Mainly scrollTop for getting dom
          'src/hooks/use-docs-path.ts', // useNavigate related content
        ],
      },
    },
  },
  {
    fixSemi: true,
  },
);
