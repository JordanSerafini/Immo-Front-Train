import * as vite from 'vite';
import react from '@vitejs/plugin-react';

const PORT = Number(process.env.PORT) || 3000;

// https://vitejs.dev/config/
export default vite.defineConfig({
  plugins: [react()],
  server: {
    port: PORT,
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


