import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig((env) => {
  return {
    plugins: [solid()],
    clearScreen: false,
    define: {
      "process.env.NODE_ENV": JSON.stringify(env.mode),
    },
    build: {
      outDir: "./dist",
      minify: false,
      cssMinify: false,
      emptyOutDir: true,
      lib: {
        formats: ["es"],
        fileName: "index",
        entry: "/src/index.tsx",
      },
    },
  };
});
