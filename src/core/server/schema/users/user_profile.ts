import generateUUID from "@/core/utils/generate-uuid";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const userProfiles = sqliteTable("user_profile", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$default(() => generateUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  bio: text("bio"),
  dateOfBirth: text("date_of_birth"),
  address: text("address"),
  language: text("language").default("en"),
  appTheme: text("app_theme").default("system"),
  email: text("email"),
});
