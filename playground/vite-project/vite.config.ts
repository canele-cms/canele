import { defineConfig } from "vite";
import { canele } from "vite-plugin-canele";
import inspect from "vite-plugin-inspect";

export default defineConfig({
  plugins: [inspect(), canele()],
});
