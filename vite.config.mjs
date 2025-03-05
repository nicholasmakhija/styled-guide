import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';

/**
 * Custom plugin for resolving requested content-type
 * 
 * @param {string[]} contentTypes
 * @returns {import('vite').Plugin}
 */
const mimeSniffer = (contentTypes) => ( {
  name: 'vite-plugin-mime-sniffer',
  /** @param {import('vite').ViteDevServer} server */
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const requestedContentType = req.headers['content-type'];
        
      if (contentTypes.includes(requestedContentType)) { 
        const responseHeaderOverride = new Headers({
          'Content-Type': requestedContentType
        });

        res.setHeaders(responseHeaderOverride);
      }

      return next();
    });
  },
});

/**
 * @returns {import('vite').Plugin}
 */
const computedStyleReload = () => ({
  name: 'vite-plugin-computed-style-reload',
  handleHotUpdate({ read, server }) {
    /** @type {Promise<string>} */(read()).then((content) => {
      const computedStyles = content.match(/style.prop([^$]+?)]: \(/g) || [];

      if (computedStyles.length) {
        server.ws.send({
          type: 'full-reload'
        });
      }
    });
  },
});

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
    mimeSniffer([
      'application/json; charset=utf-8'
    ]),
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
