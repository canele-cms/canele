import { createNextAppHandler } from "canele/next/app";

export const { GET, POST } = createNextAppHandler({
  LOCAL_DEV: process.env.LOCAL_DEV,
  DB_LIBSQL_URL: process.env.DB_LIBSQL_URL,
});
