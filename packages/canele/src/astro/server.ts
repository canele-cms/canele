import type { APIRoute } from "astro";
import { DB_LIBSQL_URL, DB_LIBSQL_AUTH_TOKEN } from "astro:env/server";
import { createCaneleServer } from "../server/server.js";
import type { Bindings } from "../server/types/env.js";

const server = createCaneleServer({ base: "/canele" });

const bindings: Bindings = {
  DB_LIBSQL_URL,
  DB_LIBSQL_AUTH_TOKEN,
};

export const ALL: APIRoute = (ctx) => server.fetch(ctx.request, bindings);
