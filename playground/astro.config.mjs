import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

export default defineConfig({
  output: "server",
  integrations: [preact(), tailwind({ applyBaseStyles: false, nesting: true })],
  security: { checkOrigin: true },
  devToolbar: { enabled: false },
  env: {
    schema: {
      GITHUB_CLIENT_ID: envField.string({ access: "secret", context: "server" }),
      GITHUB_CLIENT_SECRET: envField.string({ access: "secret", context: "server" }),
    },
  },
});
