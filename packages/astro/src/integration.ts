import type { AstroIntegration } from "astro";
import { envField } from "astro/config";

export default function caneleAstroIntregration(): AstroIntegration {
  return {
    name: "canele",
    hooks: {
      "astro:config:setup": ({ injectRoute, addMiddleware, updateConfig }) => {
        updateConfig({
          security: {
            checkOrigin: true,
          },
          env: {
            schema: {
              GITHUB_REPO: envField.string({ access: "secret", context: "server" }),
              GITHUB_CLIENT_ID: envField.string({ access: "secret", context: "server" }),
              GITHUB_CLIENT_SECRET: envField.string({ access: "secret", context: "server" }),
            },
          },
        });

        addMiddleware({
          order: "pre",
          entrypoint: "@canele/astro/middleware",
        });

        injectRoute({
          pattern: "/[...path]",
          entrypoint: "@canele/astro/pages/[...path]",
        });
        injectRoute({
          pattern: "/canele",
          entrypoint: "@canele/astro/pages/canele/index",
        });
        injectRoute({
          pattern: "/canele/github/callback",
          entrypoint: "@canele/astro/pages/canele/github/callback",
        });
        injectRoute({
          pattern: "/canele/github/api/[...path]",
          entrypoint: "@canele/astro/pages/canele/github/api",
        });
      },

      "astro:config:done": ({ injectTypes }) => {
        injectTypes({
          filename: "locals.d.ts",
          content: `import("@canele/astro/types/locals")`,
        });
      },
    },
  };
}
