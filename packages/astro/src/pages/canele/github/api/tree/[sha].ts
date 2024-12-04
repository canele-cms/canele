import type { APIRoute } from "astro";
import { GITHUB_REPO } from "astro:env/server";
import { fetchGitHubApi } from "../../../../../lib/api";

export const GET: APIRoute<Record<string, unknown>, { sha: string }> = async (ctx) => {
  const res = await fetchGitHubApi(ctx, `/repos/${GITHUB_REPO}/git/trees/${ctx.params.sha}`);

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: {
      "content-type": "application/json",
    },
  });
};
