// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://zatsit.fr',

  compressHTML: true,

  prefetch: {
    defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [tailwindcss()]
  },

  env: {
    schema: {
      SITE_URL: envField.string({
        required: true,
        access: 'public',
        context: 'client',
        default: 'https://zatsit.fr',
      }),
      BLOG_URL: envField.string({
        required: true,
        access: 'public',
        context: 'client',
        default: 'https://blog.zatsit.fr',
      }),
      LINKEDIN_URL: envField.string({
        required: true,
        access: 'public',
        context: 'client',
        default: 'https://www.linkedin.com/company/zatsit/',
      }),
      GITHUB_URL: envField.string({
        required: true,
        access: 'public',
        context: 'client',
        default: 'https://github.com/zatsit-oss',
      }),
    },
  },
});