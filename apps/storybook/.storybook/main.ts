import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { resolve } from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../packages/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": ["@storybook/addon-essentials"],
  "framework": "@storybook/react-vite",
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@rollout/ui-kit": resolve(__dirname, "../../../packages/ui-kit/src/index.ts"),
          "@rollout/ui-features": resolve(__dirname, "../../../packages/ui-features/src/index.ts"),
        },
      },
    });
  },
};
export default config;
