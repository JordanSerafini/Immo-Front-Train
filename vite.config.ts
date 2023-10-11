import { defineConfig } from 'vite';
import ViteCompression from 'vite-plugin-compression';
import react from '@vitejs/plugin-react';

const PORT = Number(process.env.PORT) || 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteCompression(),
  ],
  server: {
    port: PORT,
  },
  build: {
    chunkSizeWarningLimit: 1100,
  },
});
