import type { APIRoute } from "astro";
import { createCaneleServer, type Env } from "../../server/src/index";
import { DB_LIBSQL_URL, DB_LIBSQL_AUTH_TOKEN } from "astro:env/server";

const server = createCaneleServer({ base: "/canele" });

const bindings: Env["Bindings"] = {
  DB_LIBSQL_URL,
  DB_LIBSQL_AUTH_TOKEN,
};

export const ALL: APIRoute = (ctx) => server.fetch(ctx.request, bindings);
