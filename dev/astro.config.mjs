import { defineConfig } from "astro/config";
import canele from "@canele-cms/astro/integration";
import node from "@astrojs/node";

export default defineConfig({
  integrations: [canele()],
  output: "server",
  adapter: node({ mode: "standalone" }),
  devToolbar: { enabled: false },
});
