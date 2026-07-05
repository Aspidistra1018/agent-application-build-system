import type { Config } from 'tailwindcss';
import {
  designTokenToTailwindConfig,
  getTailwindContents,
} from '@coze-arch/tailwind-config/design-token';
import json from '@coze-arch/semi-theme-hand01/raw.json';
import { SCREENS_TOKENS } from '@coze-arch/responsive-kit/constant';

const contents = getTailwindContents('@coze-studio/app');
console.log(`Got ${contents.length} contents for tailwind`);

export default {
  content: contents,
  // Safelist content can allow dynamic tailwind className
  safelist: [
    {
      pattern: /(gap-|grid-).+/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  ],
  important: '',
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  presets: [require('@coze-arch/tailwind-config')],
  theme: {
    screens: {
      mobile: { max: '1200px' },
    },
    extend: {
      screens: SCREENS_TOKENS,
      ...designTokenToTailwindConfig(json),
    },
  },
  corePlugins: {
    preflight: false, // Turn off @tailwind base default styles to avoid affecting existing styles
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('@coze-arch/tailwind-config/coze')],
} satisfies Config;
