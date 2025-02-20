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

const brotliPromise = promisify(brotliCompress);

const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

export default {
  plugins: [
    alias({
      entries: {
        '@common': './src/common',
        '@components': './src/components',
        '@styled': './node_modules/@n3e/styled'
      }
    }),
    eslint(),
    nodeResolve({
      dedupe: ['react'],
      extensions: ['.js']
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    commonjs(),
    isProd && terser({
      ecma: 2019,
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
	input: 'src/index.js',
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