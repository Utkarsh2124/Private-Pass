import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      build: {  rollupOptions: {    external: ['/src/main.jsx'], // or any other module if required  },},
    },
    }}}
});
