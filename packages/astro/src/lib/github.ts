import type { APIContext } from "astro";
import { generateState, GitHub, type OAuth2Tokens } from "arctic";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "astro:env/server";
import { SESSION_COOKIE_NAME } from "./constants";
import type { GitHubStoreData } from "../types/github";

export function createGitHubRedirectUri(location: URL) {
  return new URL("/canele/github/callback", location.origin);
}

export function createGitHub(location: URL) {
  if (!GITHUB_CLIENT_ID) throw new Error("Missing GITHUB_CLIENT_ID");
  if (!GITHUB_CLIENT_SECRET) throw new Error("Missing GITHUB_CLIENT_SECRET");

  return new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, createGitHubRedirectUri(location).href);
}

export function createGitHubLoginUrl(ctx: APIContext) {
  const state = generateState();

  const url = ctx.locals.canele.github.oauth.createAuthorizationURL(state, []);

  ctx.cookies.set("state", state, {
    secure: import.meta.env.PROD,
    httpOnly: true,
    maxAge: 600, // 10m
    path: "/",
  });

  return url;
}

export async function setGitHubStoreData(ctx: APIContext, session: string, tokens: OAuth2Tokens) {
  const data: GitHubStoreData = {
    access_token: tokens.accessToken(),
    refresh_token: tokens.refreshToken(),
    expires_at: Date.now() + tokens.accessTokenExpiresInSeconds(),
  };

  await ctx.locals.canele.store.set(session, data);

  ctx.cookies.set(SESSION_COOKIE_NAME, session, {
    secure: import.meta.env.PROD,
    httpOnly: true,
    maxAge: 28800, // 8h
    path: "/",
  });

  return data;
}

export async function getGitHubStoreData(ctx: APIContext): Promise<Partial<GitHubStoreData>> {
  const session = ctx.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!session) return {};

  let data = await ctx.locals.canele.store.get<GitHubStoreData>(session);

  if (!data?.access_token || !data.refresh_token || !data.expires_at) {
    ctx.cookies.delete(SESSION_COOKIE_NAME);
    return {};
  }

  if (data.expires_at < Date.now()) {
    const tokens = await ctx.locals.canele.github.oauth.refreshAccessToken(data.refresh_token);
    data = await setGitHubStoreData(ctx, session, tokens);
  }

  return data;
}
