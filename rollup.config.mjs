import { resolve } from 'path'; 
import { brotliCompress } from 'zlib';
import { promisify } from 'util';
import alias from '@rollup/plugin-alias';
import eslint from '@rbnlffl/rollup-plugin-eslint';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import gzipPlugin from 'rollup-plugin-gzip';

// @ts-ignore
const __dirname = import.meta.dirname;

const brotliPromise = promisify(brotliCompress);

const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  plugins: [
    alias({
      entries: {
        '@common': resolve(__dirname, './src/common'),
        '@components': resolve(__dirname, './src/components'),
        '@styled': resolve(__dirname, './node_modules/@n3e/styled'),
      }
    }),
    eslint(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    commonjs(),
    nodeResolve({
      dedupe: ['react'],
      extensions: ['.js', '.jsx']
    }),
    isProd && terser({
      ecma: 2020,
      mangle: { toplevel: true },
      compress: {
        toplevel: true,
        drop_console: isProd,
        drop_debugger: isProd
      },
      output: { quote_style: 1 }
    }),
    isProd && gzipPlugin({
      customCompression: (content) => brotliPromise(Buffer.from(content)),
      fileName: '.br'
    })
  ],
	input: 'src/index.jsx',
	cache: !isProd,
  strictDeprecations: true,
  watch: {
    clearScreen: false,
    exclude: 'node_modules/**'
  },
  output: {
    compact: true,
    dir: 'dist/js',
    extend: true,
    format: 'iife',
    sourcemap: !isProd
  }
};