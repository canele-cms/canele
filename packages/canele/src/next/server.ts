import { createCaneleServer } from "../server/server.js";
import type { Bindings } from "../server/types/env.js";

const server = createCaneleServer({ base: "/canele" });

export function createNextAppHandler(env: Bindings) {
  return (request: Request) => server.fetch(request, env);
}
