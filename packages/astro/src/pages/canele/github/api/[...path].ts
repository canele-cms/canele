import type { APIRoute } from "astro";

export const GET: APIRoute<Record<string, unknown>, { path: string }> = async (ctx) => {
  const res = await fetch(new URL(ctx.params.path, "https://api.github.com"), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${ctx.locals.canele.github.data.access_token}`,
    },
  });

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: {
      "content-type": "application/json",
    },
  });
};
