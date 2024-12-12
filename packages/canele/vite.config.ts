import { defineConfig, type LibraryFormats, type PluginOption } from "vite";
import solid from "vite-plugin-solid";
import dts from "vite-plugin-dts";
import directives from "rollup-preserve-directives";

export default defineConfig((env) => {
  const plugins: PluginOption[] = [];
  const entry: Record<string, string> = {};
  const formats: LibraryFormats[] = ["es", "cjs"];

  if (env.isSsrBuild) {
    plugins.push(directives());
    plugins.push(dts({ include: "src" }));

    entry["next-app"] = "./src/next/app.ts";
    entry["next-pages"] = "./src/next/pages.ts";

    entry["react-editor"] = "./src/react/editor.tsx";

    entry.server = "./src/server/server.ts";
  } else {
    plugins.push(solid());

    entry.editor = "./src/editor/index.tsx";
  }

  return {
    plugins,
    build: {
      outDir: "./dist",
      minify: env.isSsrBuild ? false : "esbuild",
      cssMinify: env.isSsrBuild ? false : "lightningcss",
      emptyOutDir: !env.isSsrBuild,
      lib: { formats, entry },
    },
  };
});
