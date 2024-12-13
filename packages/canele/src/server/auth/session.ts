import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import type { Session } from "../types/schema.js";
import type { Database } from "../types/database.js";
import { ONE_MONTH } from "../constants.js";

export function generateSessionToken(): string {
  return encodeBase32LowerCaseNoPadding(crypto.getRandomValues(new Uint8Array(20))).toLowerCase();
}

export async function createSession(db: Database, token: string, user_id: number): Promise<Session> {
  const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  return await db.createSession({
    id,
    user_id,
    expires_at: Date.now() + ONE_MONTH,
  });
}
