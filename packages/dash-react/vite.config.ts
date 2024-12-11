import { defineConfig } from "vite";
import paths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig((env) => {
  const prod = env.mode === "production";

  return {
    plugins: [paths(), react()],
    clearScreen: false,
    define: {
      "process.env.NODE_ENV": JSON.stringify(env.mode),
    },
    build: {
      outDir: "./dist",
      emptyOutDir: true,
      minify: prod,
      cssMinify: prod,
      reportCompressedSize: prod,
      modulePreload: { polyfill: false },
      lib: {
        formats: ["es"],
        fileName: "index",
        entry: "/src/index.tsx",
      },
    },
  };
});
