import * as env from "astro:env/server";
import { defineMiddleware } from "astro:middleware";
import { DatabaseLibql } from "./database";

declare module "astro:env/server" {
  export const LIBSQL_URL: string;
}

let db: DatabaseLibql;

export const onRequest = defineMiddleware(async (ctx, next) => {
  if (!env.LIBSQL_URL) throw new Error("env.schema.LIBSQL_URL is required");

  if (!db) {
    db = new DatabaseLibql({ url: env.LIBSQL_URL });
    await db.migration(); // migrate on first load
  }

  ctx.locals.cnl_db = db;

  return next();
});
