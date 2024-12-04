import { defineMiddleware } from "astro:middleware";
import { createGitHub, getGitHubStoreData } from "./lib/github";

export const onRequest = defineMiddleware(async (ctx, next) => {
  ctx.locals.canele = {
    editor: false,
    github: {
      data: {},
      oauth: createGitHub(ctx.url),
    },
  };

  ctx.locals.canele.github.data = await getGitHubStoreData(ctx);
  ctx.locals.canele.editor = Boolean(ctx.locals.canele.github.data?.access_token);

  return next();
});
