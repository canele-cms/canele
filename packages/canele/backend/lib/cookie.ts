import type { CaneleContext } from "../types.js";

export function getCookies(ctx: CaneleContext): Record<string, string> {
  const cookies: Record<string, string> = {};

  const header = ctx.request.headers.get("cookie");
  if (!header) return cookies;

  for (const cookie of header.split(";")) {
    const [name, value] = cookie.split("=").map((str) => str.trim());
    if (name && value) cookies[name] = value;
  }

  return cookies;
}

export function createCookie(
  ctx: CaneleContext,
  name: string,
  value: string,
  maxAge?: number
): string {
  let cookie = `${name}=${value}; Path=/; SameSite=Strict; HttpOnly`;

  if (maxAge) cookie += `; Max-Age=${maxAge}`;

  if (ctx.url.protocol === "https:") cookie += `; Secure`;

  return cookie;
}
