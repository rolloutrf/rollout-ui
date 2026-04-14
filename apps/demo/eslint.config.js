import { defineConfig } from 'eslint/config'
import baseConfig from '../../eslint.config.js'
export default defineConfig([
  ...baseConfig,
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
])
