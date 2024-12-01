import { defineConfig, envField } from "astro/config";

export default defineConfig({
  output: "server",
  security: {
    checkOrigin: true,
  },
  env: {
    schema: {
      GITHUB_CLIENT_ID: envField.string({ access: "secret", context: "server" }),
      GITHUB_CLIENT_SECRET: envField.string({ access: "secret", context: "server" }),
    },
  },
});
