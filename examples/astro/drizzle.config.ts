import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./node_modules/canele/src/server/data/sqlite/schema.ts",
  dbCredentials: {
    url: process.env.DB_LIBSQL_URL as string,
  },
});
