import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import relativeLinks from "astro-relative-links";

export default defineConfig({
  integrations: [tailwind(), relativeLinks()],

  env: {
    schema: {
      ZATSIT_WEBSITE_URL: envField.string({
        required: true,
        access: "public",
        context: "client",
        default: "https://zatsit.fr",
      }),
      BLOG_URL: envField.string({
        required: true,
        access: "public",
        context: "client",
        default: "https://blog.zatsit.fr",
      }),
      LINKEDIN_URL: envField.string({
        required: true,
        access: "public",
        context: "client",
        default: "https://www.linkedin.com/company/zatsit/",
      }),
      GITHUB_URL: envField.string({
        required: true,
        access: "public",
        context: "client",
        default: "https://github.com/zatsit-oss",
      }),
    },
  },
});
