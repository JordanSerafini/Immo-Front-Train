import { defineConfig } from 'vite';
import ViteCompression from 'vite-plugin-compression';
import react from '@vitejs/plugin-react';

const PORT = Number(process.env.PORT) || 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteCompression()
  ],
  server: {
    port: PORT,
  },

  build: {
    chunkSizeWarningLimit: 1100,
    minify: 'terser',
    target: 'es2015',
    outDir: 'dist', // Le répertoire de sortie pour les fichiers de production
    rollupOptions: {
      // L'option "output" spécifie le format de sortie pour la production
      output: {
        format: 'es', // Format ES Module
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        keep_infinity: true,
      },
    },
  },
});


