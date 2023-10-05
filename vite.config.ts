import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,
  },
  build: {
    outDir: 'dist', // Le répertoire de sortie pour les fichiers de production
    rollupOptions: {
      // L'option "output" spécifie le format de sortie pour la production
      output: {
        format: 'es', // Format ES Module
      },
    },
  },
});
