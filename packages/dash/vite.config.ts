import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import paths from "vite-tsconfig-paths";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [paths(), preact(), dts({ include: "src" })],
  build: {
    emptyOutDir: true,
    outDir: "../astro/dist/dash",
    minify: false,
    cssMinify: false,
    lib: {
      formats: ["es"],
      entry: {
        render: "./src/render.tsx",
      },
    },
  },
});
