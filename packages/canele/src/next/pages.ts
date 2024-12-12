import { getRequestListener } from "@hono/node-server";
import { createCaneleServer } from "../server/server.js";
import type { Bindings } from "../server/types/env.js";

export function createNextPagesHandler(env: Bindings, base = "/api/canele") {
  const server = createCaneleServer({ base });

  return getRequestListener((request) => {
    return server.fetch(request, env);
  });
}
