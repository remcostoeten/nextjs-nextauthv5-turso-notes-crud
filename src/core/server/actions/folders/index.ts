"use server";

import { FolderSchema } from "@/core/models/folder-schema.z";
import { auth } from "auth";
import { db } from "db";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { Folder, folders, notes } from "schema";

export async function getFolder(id: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Unauthorized" };
  }

  const [folder] = await db
    .select()
    .from(folders)
    .where(and(eq(folders.id, id), eq(folders.userId, session.user.id)));

  if (!folder) {
    notFound();
  }

  return folder;
}

export async function getFolders() {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Unauthorized" };
  }

  return db.select().from(folders).where(eq(folders.userId, session.user.id));
}

export async function getFoldersWithNotesCount(): Promise<{
  folders: { folder: Folder; notesCount: number }[];
  totalCount: number;
}> {
  const session = await auth();
  if (!session?.user?.id) {
    return { folders: [], totalCount: 0 };
  }

  const foldersWithCount = await db
    .select({
      folder: folders,
      notesCount: sql<number>`count(${notes.id})`.as("notesCount"),
    })
    .from(folders)
    .leftJoin(notes, eq(folders.id, notes.folderId))
    .where(eq(folders.userId, session.user.id))
    .groupBy(folders.id);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(folders)
    .where(eq(folders.userId, session.user.id));

  return {
    folders: foldersWithCount,
    totalCount: count,
  };
}

export async function createFolder(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Unauthorized" };
  }

  const validatedFields = FolderSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    color: formData.get("color"),
    parentId: formData.get("parentId")
      ? parseInt(formData.get("parentId") as string)
      : undefined,
  });

  const [newFolder] = await db
    .insert(folders)
    .values({
      ...validatedFields,
      userId: session.user.id,
    })
    .returning();

  revalidatePath("/dashboard/notes");
  return { message: "Folder created successfully", folderId: newFolder.id };
}

export async function updateFolder(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Unauthorized" };
  }

  const folderId = parseInt(formData.get("id") as string);
  const validatedFields = FolderSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    color: formData.get("color"),
  });

  await db
    .update(folders)
    .set(validatedFields)
    .where(and(eq(folders.id, folderId), eq(folders.userId, session.user.id)));

  revalidatePath("/dashboard/notes");
  return { message: "Folder updated successfully" };
}

export async function deleteFolder(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Unauthorized" };
  }

  const folderId = parseInt(formData.get("id") as string);

  await db
    .delete(folders)
    .where(and(eq(folders.id, folderId), eq(folders.userId, session.user.id)));

  revalidatePath("/dashboard/notes");
  return { message: "Folder deleted successfully" };
}
