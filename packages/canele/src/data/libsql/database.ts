import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import type { Database } from "../../types/database";
import * as schema from "./schema";

export interface DatabaseLibqlOptions {
  url: string;
}

export class DatabaseLibql implements Database {
  db: LibSQLDatabase<typeof schema>;

  constructor({ url }: DatabaseLibqlOptions) {
    this.db = drizzle({ connection: { url } });
  }
}
