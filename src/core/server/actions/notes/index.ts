"use server";

import { NoteSchema } from "@/core/models/notes-schema.z ";
import { auth } from "auth";
import { db } from "db";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notes } from "schema";

export async function getNotes(folderId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Unauthorized" };
  }

  return db
    .select()
    .from(notes)
    .where(
      and(eq(notes.folderId, folderId), eq(notes.userId, session.user.id)),
    );
}

export async function getNote(id: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Unauthorized" };
  }

  const [note] = await db
    .select()
    .from(notes)
    .where(and(eq(notes.id, id), eq(notes.userId, session.user.id)));

  if (!note) {
    throw new Error("Note not found");
  }

  return note;
}

export async function createNote(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Unauthorized" };
  }

  const validatedFields = NoteSchema.parse({
    title: formData.get("title"),
    content: formData.get("content"),
    folderId: parseInt(formData.get("folderId") as string),
  });

  const [newNote] = await db
    .insert(notes)
    .values({
      ...validatedFields,
      userId: session.user.id,
    })
    .returning();

  revalidatePath(`/dashboard/notes/folder/${validatedFields.folderId}`);
  return { message: "Note created successfully", noteId: newNote.id };
}

export async function updateNote(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Unauthorized" };
  }

  const id = formData.get("id");
  if (!id || typeof id !== "string") {
    throw new Error("Invalid note ID");
  }

  const validatedFields = NoteSchema.parse({
    title: formData.get("title"),
    content: formData.get("content"),
    folderId: parseInt(formData.get("folderId") as string),
  });

  const [updatedNote] = await db
    .update(notes)
    .set(validatedFields)
    .where(and(eq(notes.id, parseInt(id)), eq(notes.userId, session.user.id)))
    .returning();

  if (!updatedNote) {
    throw new Error(
      "Note not found or you do not have permission to update it",
    );
  }

  revalidatePath(`/dashboard/notes/folder/${validatedFields.folderId}`);
  return { message: "Note updated successfully" };
}

export async function deleteNote(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Unauthorized" };
  }

  const id = formData.get("id");
  if (!id || typeof id !== "string") {
    throw new Error("Invalid note ID");
  }

  const [deletedNote] = await db
    .delete(notes)
    .where(and(eq(notes.id, parseInt(id)), eq(notes.userId, session.user.id)))
    .returning();

  if (!deletedNote) {
    throw new Error(
      "Note not found or you do not have permission to delete it",
    );
  }

  revalidatePath(`/dashboard/notes/folder/${deletedNote.folderId}`);
  return { message: "Note deleted successfully" };
}
