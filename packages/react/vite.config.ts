import { defineConfig } from "vite";
import directives from "rollup-preserve-directives";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [directives(), react(), dts({ include: "src" })],
  resolve: {
    noExternal: true,
    external: ["react", "react/jsx-runtime"],
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
