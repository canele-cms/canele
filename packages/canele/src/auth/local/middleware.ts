import { defineMiddleware } from "astro:middleware";
import { AuthLocal } from "./auth";

let auth: AuthLocal;

export const onRequest = defineMiddleware(async (ctx, next) => {
  if (!ctx.locals.cnl_db) throw new Error("locals.cnl_db must be initialized before auth");

  if (!auth) auth = new AuthLocal(ctx.locals.cnl_db);

  ctx.locals.cnl_auth = auth;

  return next();
});
