import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [preact(), dts({ include: "src" })],
  resolve: {
    noExternal: true,
  },
  build: {
    ssr: true,
    lib: {
      formats: ["es"],
      entry: {
        index: "./src/index",
      },
    },
  },
});
