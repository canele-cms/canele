import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import canele from "@canele-cms/astro";

export default defineConfig({
  adapter: node({ mode: "standalone" }),
  devToolbar: { enabled: false },
  integrations: [canele()],
});