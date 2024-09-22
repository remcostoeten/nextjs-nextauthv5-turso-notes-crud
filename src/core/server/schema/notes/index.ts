import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "../user";

export const folderTable = sqliteTable("folder", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    name: text("name").notNull(),
});

export const noteTable = sqliteTable("note", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    folderId: text("folder_id")
        .notNull()
        .references(() => folderTable.id),
    title: text("title").notNull(),
    content: text("content").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const tagTable = sqliteTable("tag", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    name: text("name").notNull(),
});

export const noteTagTable = sqliteTable("note_tag", {
    noteId: text("note_id")
        .notNull()
        .references(() => noteTable.id),
    tagId: text("tag_id")
        .notNull()
        .references(() => tagTable.id),
});
