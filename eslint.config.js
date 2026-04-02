import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// Base configuration for all packages. This is extended by each package's eslint.config.js file.
export default defineConfig([
  globalIgnores(['dist', '**/*.md']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      import: importPlugin,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          pathGroups: [
            { pattern: '@rollout/ui-kit', group: 'external', position: 'after' },
            { pattern: '@rollout/ui-kit/**', group: 'external', position: 'after' },
            { pattern: '@ui-kit/**', group: 'external', position: 'after' },
            { pattern: '@rollout/ui-features', group: 'external', position: 'after' },
            { pattern: '@rollout/ui-features/**', group: 'external', position: 'after' },
            { pattern: '@features-src/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          warnOnUnassignedImports: false,
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
  },
])
