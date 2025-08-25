import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import sass from 'rollup-plugin-sass';
import terser from '@rollup/plugin-terser';
import nodeExternals from 'rollup-plugin-node-externals';

const config = defineConfig({
  input: 'src/index.tsx',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name]-[hash].cjs',
    },
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].esm.js',
      chunkFileNames: '[name]-[hash].esm.js',
    },
  ],
  plugins: [
    nodeExternals(),
    resolve({
      browser: true,
      extensions: ['.js', 'jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
    }),
    sass({
      output: 'dist/index.css',
      options: {
        quietDeps: true,
        logger: {
          warn() {},
        },
      },
    }),
    terser({
      compress: {
        drop_console: true,
      },
    }),
  ],
});

export default config;
