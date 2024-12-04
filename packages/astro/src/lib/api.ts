import type { APIContext } from "astro";

export async function fetchGitHubApi(ctx: APIContext, path: string) {
  console.log("ctx.locals.canele.editor", ctx.locals.canele.editor);

  if (!ctx.locals.canele.editor) throw new Error("unauthorized");

  const url = new URL(path, "https://api.github.com");

  console.log(url.href);

  return await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${ctx.locals.canele.github.data.access_token}`,
    },
  });
}
