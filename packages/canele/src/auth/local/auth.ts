import type { Auth } from "../../types/auth";
import type { Database } from "../../types/database";
import type { User } from "../../types/schema";

export class AuthLocal implements Auth {
  #db: Database;

  constructor(db: Database) {
    this.#db = db;
  }

  async login(email: string, _password: string): Promise<User> {
    return { id: 1, email, password_hash: "" };
  }

  async logout() {}
}
