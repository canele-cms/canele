import { defineConfig } from "astro/config";
import canele from "./src/integration";

export default defineConfig({
  integrations: [canele()],
});
