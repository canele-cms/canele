import type { Session } from "./schema.js";

export interface Database {
  createSession: (data: Session) => Promise<Session>;
}
