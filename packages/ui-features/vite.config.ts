import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    exclude: [
      'vite.config.ts',
      'src/**/*.stories.ts',
      'src/**/*.stories.tsx',
      'src/**/*.stories.d.ts',
    ],
  }),],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@rollout/ui-features',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: ['react', 'react-dom'],
    },
  },
})
