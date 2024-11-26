import process from "node:process";
import canele from "@canele/backend";

export const handler = canele({
  githubClientId: process.env.GITHUB_CLIENT_ID!,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET!,
});

export { handler as GET, handler as POST };
