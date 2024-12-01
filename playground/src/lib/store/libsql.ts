import { createClient, type Client } from "@libsql/client";
import type { Store } from "../../types";

export class StoreLibsql implements Store {
  #client: Client;

  constructor() {
    this.#client = createClient({ url: "file:.astro/store.db" });
  }

  async sync() {
    await this.#client.batch(
      [
        `CREATE TABLE IF NOT EXISTS sessions (
          id TEXT PRIMARY KEY,
          data TEXT
        ) WITHOUT ROWID`,
      ],
      "write",
    );

    return this;
  }

  async get<T>(key: string) {
    const result = await this.#client.execute({
      sql: "SELECT data FROM sessions WHERE id = $key",
      args: { key },
    });

    if (result.rows[0]?.data) {
      return JSON.parse(result.rows[0].data as string) as T;
    }
  }

  async set<T>(key: string, value: T) {
    await this.#client.execute({
      sql: "INSERT OR REPLACE INTO sessions (id, data) values ($key, $value)",
      args: { key, value: JSON.stringify(value) },
    });
  }

  async delete(key: string) {
    await this.#client.execute({
      sql: "DELETE FROM sessions WHERE id = $key",
      args: { key },
    });
  }
}
