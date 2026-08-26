// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cheesss.github.io',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
