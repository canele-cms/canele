import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import type { Env } from "./types/env.js";
import { renderer } from "./render/renderer.js";
import { login } from "./routes/login.js";

export interface CaneleServerOptions {
  base: string;
}

export function createCaneleServer({ base }: CaneleServerOptions) {
  const app = new Hono<Env>().basePath(base);

  app.use(secureHeaders());
  app.use(renderer);

  app.get("/health", (c) => {
    return c.json({ ok: true, DB_LIBSQL_URL: c.env.DB_LIBSQL_URL });
  });

  app.route("/login", login);

  return app;
}
