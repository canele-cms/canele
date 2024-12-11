import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { serverRouter } from "../router.js";

export default function adapterNode() {
  return createHTTPServer({
    router: serverRouter,
  });
}
