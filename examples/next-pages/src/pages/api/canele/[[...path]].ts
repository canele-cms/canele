import { createNextPagesHandler } from "canele/next/pages";

export default createNextPagesHandler(
  {
    LOCAL_DEV: process.env.LOCAL_DEV,
    DB_LIBSQL_URL: process.env.DB_LIBSQL_URL,
  },
  "/api/canele",
);
