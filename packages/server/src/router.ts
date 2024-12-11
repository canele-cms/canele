import { router } from "./trpc.js";
import { healthcheck } from "./routes/healthcheck.js";

export const serverRouter = router({
  healthcheck,
});
