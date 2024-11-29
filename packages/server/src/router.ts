import type { Handler } from "./types";
import { login } from "./handlers/login";
import { githubApi } from "./handlers/github/api";
import { githubCallback } from "./handlers/github/callback";

export const router: Record<string, Handler> = {
  "/canele/login": login,
  "/canele/github/api": githubApi,
  "/canele/github/callback": githubCallback,
} as const;
