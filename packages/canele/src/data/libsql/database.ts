import { createClient, type Client } from "@libsql/client";
import type { Database } from "../../types/database";
import { createTableUsers } from "./schema";

export interface DatabaseLibqlOptions {
  url: string;
}

export class DatabaseLibql implements Database {
  #db: Client;

  constructor({ url }: DatabaseLibqlOptions) {
    this.#db = createClient({ url });
  }

  async migration() {
    await this.#db.batch(createTableUsers, "write");
  }

  async selectUserByEmail(email: string) {
    return this.#db.execute({
      sql: /*sql*/ `SELECT id, email FROM users WHERE email = ?`,
      args: [email],
    });
  }
}
