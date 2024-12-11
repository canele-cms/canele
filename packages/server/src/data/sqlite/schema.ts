import { sql } from "drizzle-orm";
import { int, text, sqliteTable } from "drizzle-orm/sqlite-core";
import type { PublishStatus } from "../../types/schema.js";

const publishable = {
  status: text().$type<PublishStatus>().notNull(),
  version: int().notNull().default(1),
  created_at: text().notNull().default(sql`(current_timestamp)`),
  updated_at: text().notNull().default(sql`(current_timestamp)`),
};

export const users = sqliteTable("users", {
  ...publishable,
  id: int().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  password_hashed: text().notNull(),
});

export const sites = sqliteTable("sites", {
  ...publishable,
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  root: text().notNull().unique(),
});

export const pages = sqliteTable("pages", {
  ...publishable,
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  site_id: int()
    .notNull()
    .references(() => sites.id),
});
