import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // 隐藏依赖中的弃用警告
        silenceDeprecations: [
          'color-functions',
          'import',
          'global-builtin',
          'slash-div',
        ], // 静默特定的弃用警告
      },
    },
  },
});
