"use server";

import { FolderSchema } from "@/core/models/folder-schema.z";
import { db } from "@/db";
import { folders } from "@/db/schema";
import { auth } from "auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function getFolder(id: number) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
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
    throw new Error("Unauthorized");
  }

  return db.select().from(folders).where(eq(folders.userId, session.user.id));
}

export async function createFolder(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const validatedFields = FolderSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    color: formData.get("color"),
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
    throw new Error("Unauthorized");
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
    throw new Error("Unauthorized");
  }

  const folderId = parseInt(formData.get("id") as string);

  await db
    .delete(folders)
    .where(and(eq(folders.id, folderId), eq(folders.userId, session.user.id)));

  revalidatePath("/dashboard/notes");
  return { message: "Folder deleted successfully" };
}
