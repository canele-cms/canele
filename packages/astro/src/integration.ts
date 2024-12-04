import type { AstroIntegration } from "astro";
import { envField } from "astro/config";

export default function caneleAstroIntregration(): AstroIntegration {
  return {
    name: "canele",
    hooks: {
      "astro:config:setup": ({ injectRoute, addMiddleware, updateConfig }) => {
        updateConfig({
          output: "server",
          security: {
            checkOrigin: true,
          },
          env: {
            schema: {
              JWT_SECRET: envField.string({ access: "secret", context: "server" }),
              GITHUB_REPO: envField.string({ access: "secret", context: "server" }),
              GITHUB_CLIENT_ID: envField.string({ access: "secret", context: "server" }),
              GITHUB_CLIENT_SECRET: envField.string({ access: "secret", context: "server" }),
            },
          },
        });

        addMiddleware({
          order: "pre",
          entrypoint: "@canele-cms/astro/middleware",
        });

        injectRoute({
          pattern: "/[...path]",
          entrypoint: "@canele-cms/astro/pages/[...path]",
        });
        injectRoute({
          pattern: "/canele",
          entrypoint: "@canele-cms/astro/pages/canele/index",
        });
        injectRoute({
          pattern: "/canele/github/callback",
          entrypoint: "@canele-cms/astro/pages/canele/github/callback",
        });
        injectRoute({
          pattern: "/canele/github/api/tree/[sha]",
          entrypoint: "@canele-cms/astro/pages/canele/github/api/tree",
        });
      },

      "astro:config:done": ({ injectTypes }) => {
        injectTypes({
          filename: "locals.d.ts",
          content: `import("@canele-cms/astro/types/locals")`,
        });
      },
    },
  };
}
