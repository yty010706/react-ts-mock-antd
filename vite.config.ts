import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import mockServerPlugin from './src/plugins/mockServerPlugin';

export default defineConfig({
  plugins: [react(), mockServerPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
    },
  },
  server: {
    open: true,
  },
});
