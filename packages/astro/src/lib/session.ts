import { JWT_SECRET } from "astro:env/server";
import { EncryptJWT, jwtDecrypt } from "jose";
import type { GitHubStoreData } from "../types/github";

const issuer = "canele";
const audience = "editor";
const secret = new TextEncoder().encode(JWT_SECRET);

interface JWTPayload {
  data: GitHubStoreData;
}

export async function createSessionToken(data: GitHubStoreData) {
  return await new EncryptJWT({ data } satisfies JWTPayload)
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime("8h")
    .encrypt(secret);
}

export async function getSessionTokenData(session: string) {
  const { payload } = await jwtDecrypt<JWTPayload>(session, secret, { issuer, audience });

  return payload.data;
}
