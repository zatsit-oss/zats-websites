// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import buildCleanup from './src/lib/build-hook.ts';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://zatsit.fr',

  // The production bucket is served through the GCS website configuration, which
  // 301s /page to /page/. Emitting canonical trailing-slash URLs everywhere keeps
  // internal navigation free of that redirect hop.
  trailingSlash: 'always',

  compressHTML: true,

  // 'hover' rather than 'viewport': every page used to prefetch the footer's
  // legal pages and whatever links sat in the first screen, about 300 KB per view
  prefetch: {
    defaultStrategy: 'hover',
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
      // Two Google Forms: one for clients (work-with-us), one for candidates (apply)
      CONTACT_FORM_URL: envField.string({
        access: 'public',
        context: 'server',
        default: 'https://docs.google.com/forms/d/e/1FAIpQLSffIAnQdb2qgd1Ptb8QZlMhA2b2l2yUvaBsAyo2Odfaz5-IKQ/viewform?embedded=true',
      }),
      APPLY_FORM_URL: envField.string({
        access: 'public',
        context: 'server',
        default: 'https://docs.google.com/forms/d/e/1FAIpQLSe3ooOsPUA34F4hdmr1KSVr-3ZExERWrAzDeatfr8L2oRNzuQ/viewform?embedded=true',
      }),
      ETI_RAPPORT_URL: envField.string({
        access: 'public',
        context: 'client',
        default: 'https://drive.google.com/file/d/1GH_k0mGmr8o_5WQfaDKkcQH-5Q48SQVY/view?usp=sharing',
      }),
      // Videos are too heavy for the repository: they live in a public media
      // bucket declared in zatsit-terraform (stack zatsit-corporate, media.tf)
      MEDIA_BASE_URL: envField.string({
        access: 'public',
        context: 'server',
        default: 'https://storage.googleapis.com/zatsit-corporate-media-prod',
      }),
      DISABLED_PAGES: envField.string({
        access: 'public',
        context: 'server',
        default: '',
      }),
    },
  },
});