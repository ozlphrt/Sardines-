import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Sardines-/',
  server: {
    port: 5173,
    host: true,
    open: true
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true
  },
  optimizeDeps: {
    include: ['three']
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
