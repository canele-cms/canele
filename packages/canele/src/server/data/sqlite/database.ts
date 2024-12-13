import { drizzle } from "drizzle-orm/libsql";
import type { Database } from "../../types/database.js";
import type { Bindings } from "../../types/env.js";
import * as schema from "./schema.js";

// DB_LIBSQL_URL is a required env variable
type LibsqlEnv = Omit<Bindings, "DB_LIBSQL_URL"> & { DB_LIBSQL_URL: string };

export function createDatabaseLibsql(env: LibsqlEnv): Database {
  const db = drizzle<typeof schema>({
    connection: {
      url: env.DB_LIBSQL_URL,
      authToken: env.DB_LIBSQL_AUTH_TOKEN,
    },
  });

  return {
    async createSession(data) {
      const [session] = await db.insert(schema.sessions).values(data).returning();
      if (!session) throw new Error("session create failed");
      return session;
    },
  };
}
