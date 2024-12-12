import { defineConfig } from "astro/config";
import canele from "./src/astro/integration.js";

// this config is primarily to generate .astro/types.d.ts with `astro sync`
export default defineConfig({
  integrations: [canele()],
});
