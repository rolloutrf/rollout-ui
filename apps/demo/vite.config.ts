import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@ui-kit': resolve(__dirname, '../../packages/ui-kit/src'),
      '@rollout/ui-kit': resolve(__dirname, '../../packages/ui-kit/src/index.ts'),
      '@rollout/ui-features': resolve(__dirname, '../../packages/ui-features/src/index.ts'),
      '@': resolve(__dirname, './src'),
    },
  },
})
