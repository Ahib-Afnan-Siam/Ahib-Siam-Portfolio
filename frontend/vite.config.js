import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: '.', // Set root to current folder (frontend) if building from frontend/
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  base: '/', // Use absolute paths for deployment
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',    // build output will be frontend/dist
    emptyOutDir: true, // clear old builds
    assetsDir: 'assets',
  },
  optimizeDeps: {
    include: ['@vercel/analytics/react']
  }
})