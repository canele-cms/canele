import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import type { Env } from "./types/env.js";

interface CaneleServerOptions {
  base: string;
}

function createCaneleServer({ base }: CaneleServerOptions) {
  const app = new Hono<Env>().basePath(base);

  app.use(secureHeaders());

  app.get("/", (c) => {
    return c.json(c.env);
  });

  return app;
}

export type { Env, CaneleServerOptions };
export { createCaneleServer };
