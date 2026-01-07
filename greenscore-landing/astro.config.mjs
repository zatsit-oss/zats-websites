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
    },
  },
});
