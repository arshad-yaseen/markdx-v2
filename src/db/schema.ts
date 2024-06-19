import { sql } from "drizzle-orm";
import { serial, text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const markdowns = pgTable("markdowns", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
