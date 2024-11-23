import type { AstroIntegration } from "astro";

export interface CanelePluginAstroOptions {}

export default function CanelePluginAstro({}: CanelePluginAstroOptions): AstroIntegration {
  return {
    name: "@canele/plugin-astro",
    hooks: {
      "astro:config:setup": ({ config, isRestart, addMiddleware }) => {
        if (isRestart) return;

        const env = config.env.schema;

        if (env.LIBSQL_URL) {
          addMiddleware({
            order: "pre",
            entrypoint: "canele/data/libsql/middleware",
          });
        } else {
          throw new Error("A database env config is required.");
        }
      },
      "astro:config:done": ({ injectTypes }) => {
        injectTypes({
          filename: "locals.d.ts",
          content: `import "@canele/plugin-astro/locals";`,
        });
      },
    },
  };
}
