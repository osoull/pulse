import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
    host: true,
    strictPort: true,
    open: true
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  preview: {
    port: 3000,
    strictPort: true
  }
});