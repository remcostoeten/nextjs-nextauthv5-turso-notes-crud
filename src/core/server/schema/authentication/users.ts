import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
    id: text("id").notNull().primaryKey(),
    username: text("username").notNull().unique(),
    hashedPassword: text("hashed_password").notNull(),
});

