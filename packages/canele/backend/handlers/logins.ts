import type { Handler } from "../types.js";
import { createCookie } from "../lib/cookie.js";

export const logins: Handler = (ctx) => {
  const state = crypto.randomUUID();

  const redirect_url = `${ctx.url.origin}/canele/github/callback`;

  const github = new URL("/login/oauth/authorize", "https://github.com");
  github.searchParams.set("state", state);
  github.searchParams.set("client_id", ctx.githubClientId);
  github.searchParams.set("redirect_uri", redirect_url);

  return new Response(JSON.stringify({ github }), {
    headers: {
      "content-type": "application/json",
      "set-cookie": createCookie(ctx, "state", state, 60 * 10),
    },
  });
};
