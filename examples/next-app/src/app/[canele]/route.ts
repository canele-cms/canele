import { createNextAppHandler } from "canele/next";

const handler = createNextAppHandler({
  LOCAL_DEV: process.env.LOCAL_DEV,
  DB_LIBSQL_URL: process.env.DB_LIBSQL_URL,
});

export { handler as GET, handler as POST };
