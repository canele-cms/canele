import type { APIContext } from "astro";

export async function proxyGitHub(ctx: APIContext, path: string, options?: RequestInit) {
  if (!ctx.locals.canele?.github?.data?.access_token) throw new Error("unauthorized");

  const url = new URL(path, "https://api.github.com");

  const init: RequestInit = options ?? {};

  init.method = options?.method ?? "GET";

  init.headers = {
    ...options?.headers,
    Accept: "application/json",
    Authorization: `Bearer ${ctx.locals.canele.github.data.access_token}`,
  };

  console.log(init.method, url.href);

  const res = await fetch(url, init);

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: {
      "content-type": "application/json",
    },
  });
}
