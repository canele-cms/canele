import type { AstroIntegration } from "astro";
import { envField } from "astro/config";

const resolve = (path: string) => new URL(path, import.meta.url).pathname;

export default function caneleAstroIntregration(): AstroIntegration {
  return {
    name: "canele",
    hooks: {
      "astro:config:setup": ({ injectRoute, updateConfig }) => {
        updateConfig({
          output: "server",
          security: { checkOrigin: true },
          env: {
            schema: {
              DB_LIBSQL_URL: envField.string({ access: "secret", context: "server", optional: true }),
              DB_LIBSQL_AUTH_TOKEN: envField.string({ access: "secret", context: "server", optional: true }),
            },
          },
        });

        injectRoute({
          pattern: "/[...path]",
          entrypoint: resolve("components/page.astro"),
        });

        injectRoute({
          pattern: "/canele/[...path]",
          entrypoint: resolve("server.ts"),
        });
      },
    },
  };
}
