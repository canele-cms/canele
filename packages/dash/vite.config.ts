import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [preact(), tailwindcss(), dts({ include: "src" })],
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
