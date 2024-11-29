import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ include: "src" })],
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
