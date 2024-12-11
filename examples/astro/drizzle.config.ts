import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./node_modules/@canele-cms/server/dist/data/sqlite/schema.js",
  dbCredentials: {
    url: process.env.DB_LIBSQL_URL as string,
  },
});
