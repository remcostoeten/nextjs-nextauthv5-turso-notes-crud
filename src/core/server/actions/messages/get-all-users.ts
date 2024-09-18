"use server";

import { db } from "db";
import {
  folders,
  messages,
  NewFolder,
  NewNote,
  NewUser,
  notes,
  User,
  users,
} from "schema";
import { eq } from "drizzle-orm";

export async function createUser(newUser: NewUser) {
  return await db.insert(users).values(newUser);
}

export async function updateUser(userId: string, updatedUser: Partial<User>) {
  return await db.update(users).set(updatedUser).where(eq(users.id, userId));
}

export async function createFolder(newFolder: NewFolder) {
  return await db.insert(folders).values(newFolder);
}

export async function createNote(newNote: NewNote) {
  return await db.insert(notes).values(newNote);
}

// New actions for messaging feature
export async function getAllUsers() {
  return await db.select().from(users);
}

export async function getMessagesForUser(userId: string) {
  return await db
    .select()
    .from(messages)
    .where(eq(messages.recipientId, userId));
}
