import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import type { Env } from "./types/env.js";

export interface CaneleServerOptions {
  base: string;
}

export function createCaneleServer({ base }: CaneleServerOptions) {
  const app = new Hono<Env>().basePath(base);

  app.use(secureHeaders());

  app.get("/health", (c) => {
    return c.json({ ok: true, DB_LIBSQL_URL: c.env.DB_LIBSQL_URL });
  });

  return app;
}
