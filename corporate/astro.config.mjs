// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import buildCleanup from './src/lib/build-hook.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://zatsit.fr',

  compressHTML: true,

  prefetch: {
    defaultStrategy: 'viewport',
  },

  integrations: [buildCleanup()],

  vite: {
    plugins: [tailwindcss()]
  },

  env: {
    schema: {
      SITE_URL: envField.string({
        access: 'public',
        context: 'client',
        default: 'https://zatsit.fr',
      }),
      BLOG_URL: envField.string({
        access: 'public',
        context: 'client',
        default: 'https://blog.zatsit.fr',
      }),
      LINKEDIN_URL: envField.string({
        access: 'public',
        context: 'client',
        default: 'https://www.linkedin.com/company/zatsit/',
      }),
      GITHUB_URL: envField.string({
        access: 'public',
        context: 'client',
        default: 'https://github.com/zatsit-oss',
      }),
      SUSTAINABILITY_URL: envField.string({
        access: 'public',
        context: 'client',
        default: 'https://sustainability.zatsit.fr/',
      }),
      DISABLED_PAGES: envField.string({
        access: 'public',
        context: 'server',
        default: '',
      }),
    },
  },
});