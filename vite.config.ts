import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@fluentui')) return 'vendor-fluent';
            if (id.includes('firebase')) return 'vendor-firebase';
            if (id.includes('motion')) return 'vendor-motion';
            if (id.includes('react-markdown') || id.includes('remark-gfm')) return 'vendor-markdown';
          }
        },
      },
    },
  },
})
