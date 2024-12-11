import { defineConfig } from "drizzle-kit";

interface TursoEnv {
  DB_LIBSQL_URL: string;
}

export function createDrizzleTursoConfig({ DB_LIBSQL_URL }: TursoEnv) {
  return defineConfig({
    dialect: "turso",
    schema: "./dist/data/sqlite/schema.js",
    dbCredentials: {
      url: DB_LIBSQL_URL as string,
    },
  });
}
