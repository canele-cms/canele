import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { serverRouter } from "../router.js";

export default function adapterFetch(req: Request, endpoint = "/canele") {
  fetchRequestHandler({
    req,
    endpoint,
    router: serverRouter,
  });
}
