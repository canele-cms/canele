import type {
  GitHubLoginResponse,
  GithubOauthResponse,
  Handler,
} from "~/types";
import { createCookie, getCookies } from "~/lib/cookie";
import { store } from "~/lib/store";

export const githubApi: Handler = async (ctx) => {
  const { session } = getCookies(ctx);

  if (!session) return new Response(null, { status: 403 });

  const data = store.get<GitHubLoginResponse>(session);

  if (!data) {
    return new Response(null, {
      status: 403,
      headers: {
        "set-cookie": createCookie(ctx, "session", "", 0),
      },
    });
  }

  if (data.refresh_token && data.expires_at - Date.now() < 60 * 60) {
    const url = new URL("/login/oauth/access_token", "https://github.com");
    url.searchParams.set("client_id", ctx.githubClientId);
    url.searchParams.set("client_secret", ctx.githubClientSecret);
    url.searchParams.set("grant_type", "refresh_token");
    url.searchParams.set("refresh_token", data.refresh_token);

    const oauthResponse = await fetch(url, {
      method: "POST",
      headers: { accept: "application/json" },
    });

    const oauth = (await oauthResponse.json()) as GithubOauthResponse;

    store.set(session, {
      ...oauth,
      expires_at: Date.now() + oauth.expires_in,
    });
  }

  const res = await fetch(new URL("/user", "https://api.github.com"), {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${data.access_token}`,
    },
  });

  return new Response(res.body);
};
