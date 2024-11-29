import type { CaneleContext, CaneleOptions } from "~/types";
import { router } from "~/lib/router";

export default function adapterFetch(opts: CaneleOptions) {
  if (!opts.githubClientId) {
    throw new Error("githubClientId is required");
  }
  if (!opts.githubClientSecret) {
    throw new Error("githubClientSecret is required");
  }

  return async (request: Request) => {
    const ctx: CaneleContext = {
      url: new URL(request.url),
      request,
      base: "canele",
      ...opts,
    };

    const handler = router[ctx.url.pathname];

    if (handler) {
      try {
        return await handler(ctx);
      } catch (e) {
        console.error(e);
        return new Response("an error occured", { status: 500 });
      }
    }

    return new Response(null, { status: 404 });
  };
}
