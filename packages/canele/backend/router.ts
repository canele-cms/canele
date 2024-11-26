import type { Handler } from "./types.js";
import { logins } from "./handlers/logins.js";
import { githubCallback } from "./handlers/github/callback.js";

export const router: Record<string, Handler> = {
  "/canele/logins": logins,
  "/canele/github/callback": githubCallback,
} as const;
