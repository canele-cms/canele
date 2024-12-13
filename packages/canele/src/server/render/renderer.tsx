/** @jsxImportSource hono/jsx */
import { jsxRenderer } from "hono/jsx-renderer";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props: { title: string }): Response;
  }
}

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/ico" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>{title}</title>

        <style
          dangerouslySetInnerHTML={{
            __html: /* css */ `
                form {
                    display: flex;
                    flex-flow: column;
                    gap: 1em;
                }

                input, button {
                    display: block;
                    cursor: pointer;
                    border: 1px solid black;
                    border-radius: 0.25em;
                    background: none;
                    align-self: flex-start;
                    padding: 0.25em 0.5em;
                }

                em {
                    color: red;
                }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
});
