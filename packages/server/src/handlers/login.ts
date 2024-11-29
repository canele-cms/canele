import type { Handler } from "../types";
import { createCookie } from "../lib/cookie.js";

export const login: Handler = (ctx) => {
  const state = crypto.randomUUID();

  const redirect_url = `${ctx.url.origin}/canele/github/callback`;

  const github = new URL("/login/oauth/authorize", "https://github.com");
  github.searchParams.set("state", state);
  github.searchParams.set("client_id", ctx.githubClientId);
  github.searchParams.set("redirect_uri", redirect_url);

  return new Response(
    `<!DOCTYPE html>
<html>
  <style>
    html, body {
      height: 100%;
    }
    body {
      margin: 0;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    a {
      color: black; 
      text-decoration: none; 
      font-family: monospace; 
      font-size: 1.25em; 
      font-weight: bold;
    }
  </style>
  <body>
    <a href="${github.href}">Login with GitHub<a/>
  </body>
</html>`,
    {
      headers: {
        "content-type": "text/html",
        "set-cookie": createCookie(ctx, "state", state, 60 * 10),
      },
    }
  );
};
