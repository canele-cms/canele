import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import dts from "vite-plugin-dts";

export default defineConfig((env) => {
  if (env.isSsrBuild) {
    return {
      plugins: [dts({ include: "src" })],
      build: {
        outDir: "./dist",
        minify: false,
        cssMinify: false,
        emptyOutDir: false,
        lib: {
          formats: ["es"],
          entry: {
            next: "./src/next/server.ts",
            server: "./src/server/server.ts",
          },
        },
      },
    };
  }

  return {
    plugins: [solid()],
    build: {
      outDir: "./dist",
      minify: false,
      cssMinify: false,
      lib: {
        formats: ["es"],
        entry: {
          editor: "./src/editor/index.tsx",
        },
      },
    },
  };
});
