import type { APIRoute } from "astro";
import { setGitHubStoreData } from "../../../lib/github";

export const GET: APIRoute = async (ctx) => {
  const code = ctx.url.searchParams.get("code");
  const state = ctx.url.searchParams.get("state");
  const cookie = ctx.cookies.get("state")?.value;

  try {
    if (!code) throw new Error("missing code parameter");
    if (!state) throw new Error("missing state parameter");
    if (state !== cookie) throw new Error("state does not equal stored cookie state");

    const tokens = await ctx.locals.canele.github.oauth.validateAuthorizationCode(code);

    await setGitHubStoreData(ctx, tokens);
  } catch (e) {
    console.error(e);
  }

  return ctx.redirect("/", 307);
};
