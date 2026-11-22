import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works on GitHub Pages (https://<user>.github.io/spectra-lab/).
export default defineConfig({
  base: './',
  plugins: [react()],
});
