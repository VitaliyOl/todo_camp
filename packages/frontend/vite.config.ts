import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import EnvironmentPlugin from 'vite-plugin-environment';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    EnvironmentPlugin('all'),
  ],
  resolve: {
    alias: {
      '~assets': path.resolve(__dirname, 'src/assets'),
      '~modules': path.resolve(__dirname, 'src/modules'),
      '~router': path.resolve(__dirname, 'src/router'),
      '~shared': path.resolve(__dirname, 'src/shared'),
      '~store': path.resolve(__dirname, 'src/store'),
      '~typings': path.resolve(__dirname, 'src/typings'),
      '~': path.resolve(__dirname, 'src'),
    },
  },
});