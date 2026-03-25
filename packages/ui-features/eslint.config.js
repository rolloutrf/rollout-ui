import storybook from "eslint-plugin-storybook";
import { defineConfig } from 'eslint/config'
import baseConfig from '../../eslint.config.js'

export default defineConfig([
  ...baseConfig,
  ...storybook.configs['flat/recommended'],
])
