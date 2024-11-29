import { createServer as createHttpServer } from "node:http";
import { createServer as createViteServer } from "vite";

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
});

const canele = (await vite.ssrLoadModule("/src/node.ts")).default;

const handler = canele({
  githubClientId: process.env.GITHUB_CLIENT_ID!,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET!,
});

const server = createHttpServer((req, res) => {
  vite.middlewares(req, res, async () => {
    if (req.url?.startsWith("/canele")) return handler(req, res);

    let template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <canele-frontend />
    <script type="module" src="/@canele/editor"></script>
  </body>
</html>`;

    template = await vite.transformIndexHtml(req.url ?? "/", template);

    res.setHeader("content-type", "text/html").end(template);
  });
});

server.listen(5173, "0.0.0.0", () => {
  console.log("http://localhost:5173/");
});
