import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
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