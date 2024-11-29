import { defineConfig } from "vite";
import paths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [paths(), dts({ include: "src" })],
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
