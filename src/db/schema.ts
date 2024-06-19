import { pgTable, serial } from "drizzle-orm/pg-core";

export const markdowns = pgTable("markdowns", {
  id: serial("id").primaryKey(),
});
