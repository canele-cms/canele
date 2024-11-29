import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [preact(), dts({ include: "src" })],
  resolve: {
    noExternal: true,
    external: ["node:http", "node:http2", "node:tls", "node:stream"],
  },
  build: {
    ssr: true,
    lib: {
      formats: ["es"],
      entry: {
        node: "./src/node",
        fetch: "./src/fetch",
      },
    },
  },
});
