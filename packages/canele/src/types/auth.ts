import type { User } from "./schema";

export interface Auth {
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
}
