import { defineConfig, envField } from "astro/config";
import canele from "canele/integration";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [canele({})],
  env: {
    schema: {
      LIBSQL_URL: envField.string({ access: "secret", context: "server" }),
    },
  },
});
