import type { APIRoute } from "astro";
import { GITHUB_REPO } from "astro:env/server";
import { proxyGitHub } from "../lib/proxy/github";

export const GET: APIRoute = async (ctx) => {
  const sha = ctx.url.searchParams.get("sha");

  return await proxyGitHub(ctx, `/repos/${GITHUB_REPO}/git/trees/${sha}`);
};
