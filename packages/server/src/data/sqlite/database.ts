import { eq } from "drizzle-orm";
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
    async getSiteByRoot(root) {
      const [site] = await db.select().from(schema.sites).where(eq(schema.sites.root, root));
      return site;
    },
    async createSite(data) {
      const [site] = await db.insert(schema.sites).values({ name: data.name, root: data.root, status: "draft" }).returning();
      if (!site) throw new Error("Site create failed.");
      return site;
    },
  };
}
