import { defineMiddleware } from "astro:middleware";
import { StoreLibsql } from "./lib/store/libsql";
import { createGitHub, getGitHubStoreData } from "./lib/github";

export const onRequest = defineMiddleware(async (ctx, next) => {
  const store = await new StoreLibsql().sync();

  ctx.locals.canele = {
    store,
    github: {
      data: {},
      oauth: createGitHub(ctx.url),
    },
  };
  // separate to initiate store first
  ctx.locals.canele.github.data = await getGitHubStoreData(ctx);

  return next();
});
