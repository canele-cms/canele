import { defineConfig } from "astro/config";
import canele from "./src/integration";
import node from "@astrojs/node";

export default defineConfig({
  integrations: [canele()],
  adapter: node({ mode: "standalone" }),
  devToolbar: { enabled: false },
});
