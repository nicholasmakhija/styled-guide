import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';

/**
 * Custom plugin for resolving requested JSON MIME type
 * 
 * @returns {import('vite').Plugin}
 */
const mimeSniffer = () => ( {
  name: 'vite-plugin-mime-sniffer',
  /** @param {import('vite').ViteDevServer} server */
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const jsonContentType = 'application/json; charset=utf-8';
      const requestedHeaders = req.headers['content-type'];
        
      if (requestedHeaders === jsonContentType) { 
        const responseHeaderOverride = new Headers({
          'Content-Type': jsonContentType
        });

        res.setHeaders(responseHeaderOverride);
      }

      return next();
    });
  },
})

/**
 * @param {string} pathToResolve
 * @returns {string}
 */
const resolvePath = (pathToResolve) =>
  path.resolve(__dirname, `./${pathToResolve}`);

// https://vite.dev/config/
export default defineConfig({
  root: 'bin',
  mode: JSON.stringify(process.env.NODE_ENV),
  publicDir: resolvePath('dist'),
  clearScreen: false,
  server: {
    host: true,
    open: true
  },
  build: {
    copyPublicDir: true,
    outDir: 'dist',
    target: 'esnext',
    write: true
  },

  plugins: [
    mimeSniffer(),
    eslint(),
    react()
  ],
  resolve: {
    alias: {
      '@common': resolvePath('src/common'),
      '@components': resolvePath('src/components'),
      '@styled': resolvePath('node_modules/@n3e/styled')
    },
    dedupe: ['react']
  }
});
