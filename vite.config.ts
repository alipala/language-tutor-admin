import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
