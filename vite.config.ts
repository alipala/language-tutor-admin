import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/_admin/',
  build: {
    // Force cache busting for Railway deployments
    rollupOptions: {
      output: {
        // Add timestamp to chunk names to prevent caching issues
        entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        assetFileNames: `assets/[name]-[hash]-${Date.now()}.[ext]`
      }
    },
    // Clear output directory before build
    emptyOutDir: true,
    // Use default minification to avoid resource issues
    minify: true
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '4173'),
    strictPort: true,
    allowedHosts: [
      'healthcheck.railway.app',
      '.railway.app',
      'localhost',
      '127.0.0.1'
    ]
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '5173')
  }
})
