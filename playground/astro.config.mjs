import { defineConfig, envField } from "astro/config";
import canele from "@canele/astro/integration";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [canele()],
  security: { checkOrigin: true },
  devToolbar: { enabled: false },
  env: {
    schema: {
      GITHUB_CLIENT_ID: envField.string({ access: "secret", context: "server" }),
      GITHUB_CLIENT_SECRET: envField.string({ access: "secret", context: "server" }),
    },
  },
});
