import generateUUID from "@/core/utils/generate-uuid";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$default(() => generateUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});
