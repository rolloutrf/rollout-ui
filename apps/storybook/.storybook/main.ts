import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import tailwindcss from '@tailwindcss/vite'
import { mergeConfig } from 'vite'

import type { StorybookConfig } from '@storybook/react-vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../../../packages/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['storybook-dark-mode'],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@ui-kit': resolve(__dirname, '../../../packages/ui-kit/src'),
          '@features-src': resolve(__dirname, '../../../packages/ui-features/src'),
          '@rollout/ui-kit': resolve(__dirname, '../../../packages/ui-kit/src/index.ts'),
          '@rollout/ui-features': resolve(__dirname, '../../../packages/ui-features/src/index.ts'),
        },
      },
    })
  },
}
export default config
