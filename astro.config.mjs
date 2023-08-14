import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 1996,
    host: true
  },
  vite: {
    build: {
      cssCodeSplit: false
    }
  },
  experimental: {
    assets: true
  }
});
