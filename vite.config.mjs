import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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

  plugins: [react()],
  resolve: {
    alias: {
      '@common': resolvePath('src/common'),
      '@components': resolvePath('src/components'),
      '@styled': resolvePath('node_modules/@n3e/styled')
    },
    dedupe: ['react']
  }
});
