import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuration pour le déploiement sur gelul.fr
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Optimisation pour la production
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // Configuration pour le serveur de développement
  server: {
    port: 5173,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  // Optimisation des dépendances
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'styled-components', 'primereact'],
    exclude: ['chart.js', 'quill'],
    esbuildOptions: {
      plugins: [
        {
          name: 'ignore-optional-deps',
          setup(build) {
            // Ignorer les dépendances optionnelles de PrimeReact
            build.onResolve({ filter: /^(chart\.js\/auto|quill)$/ }, () => ({
              path: 'data:text/javascript,export default {}',
              external: false,
              namespace: 'empty-module',
            }))
            build.onLoad({ filter: /.*/, namespace: 'empty-module' }, () => ({
              contents: 'export default {}',
              loader: 'js',
            }))
          },
        },
      ],
    },
  },
})
