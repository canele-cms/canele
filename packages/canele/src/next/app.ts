import { createCaneleServer } from "../server/server.js";
import type { Bindings } from "../server/types/env.js";

export function createNextAppHandler(env: Bindings, base = "/canele") {
  const server = createCaneleServer({ base });

  const nextAppHandler = (request: Request) => server.fetch(request, env);

  return { GET: nextAppHandler, POST: nextAppHandler };
}
