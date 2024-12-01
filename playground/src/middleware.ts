import type { GitHub } from "arctic";
import { defineMiddleware } from "astro:middleware";
import type { GitHubStoreData, Store } from "./types";
import { StoreLibsql } from "./lib/store/libsql";
import { createGitHub, getGitHubStoreData } from "./lib/github";

interface CaneleLocals {
  store: Store;
  github: {
    oauth: GitHub;
    data: Partial<GitHubStoreData>;
  };
}

declare global {
  namespace App {
    interface Locals {
      canele: CaneleLocals;
    }
  }
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  const store = await new StoreLibsql().sync();

  ctx.locals.canele = {
    store,
    github: {
      data: {},
      oauth: createGitHub(ctx.url),
    },
  };

  ctx.locals.canele.github.data = await getGitHubStoreData(ctx);

  return next();
});
