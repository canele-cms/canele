import type { GithubOauthResponse, Handler } from "../../types";
import { createCookie, getCookies } from "../../lib/cookie";
import { store } from "../../store";

export const githubCallback: Handler = async (ctx) => {
  const cookies = getCookies(ctx);
  const code = ctx.url.searchParams.get("code");
  const state = ctx.url.searchParams.get("state");

  if (!code || !state || !cookies.state || cookies.state !== state) {
    return new Response(null, { status: 401 });
  }

  const redirect_uri = `${ctx.url.origin}/${ctx.base}/github/callback`;

  const url = new URL("/login/oauth/access_token", "https://github.com");
  url.searchParams.set("code", code);
  url.searchParams.set("client_id", ctx.githubClientId);
  url.searchParams.set("client_secret", ctx.githubClientSecret);
  url.searchParams.set("redirect_uri", redirect_uri);

  const oauthResponse = await fetch(url, {
    method: "POST",
    headers: { accept: "application/json" },
  });

  const oauth = (await oauthResponse.json()) as GithubOauthResponse;

  store.set(state, {
    ...oauth,
    expires_at: Date.now() + oauth.expires_in,
  });

  return new Response(null, {
    status: 307,
    headers: {
      location: "/",
      "set-cookie": createCookie(ctx, "session", state, 60 * 60 * 8),
    },
  });
};
