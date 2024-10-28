import { defineConfig } from "vite";
import types from "vite-plugin-dts";
import paths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [paths(), types()],
  build: {
    target: "esnext",
    lib: {
      name: "Canele",
      entry: ["src/index.ts", "src/jsx-runtime.ts"],
      formats: ["es"],
    },
  },
});
