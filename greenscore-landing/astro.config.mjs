import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import relativeLinks from 'astro-relative-links';

export default defineConfig({
  integrations: [tailwind(), relativeLinks()]
});