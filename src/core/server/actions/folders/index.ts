"use server";

import { db } from "@/db";
import { folders } from "@/db/schema";
import { auth } from "auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FolderSchema = z.object({
  name: z
    .string()
    .min(1, "Folder name is required")
    .max(50, "Folder name must be 50 characters or less"),
  description: z
    .string()
    .max(200, "Description must be 200 characters or less")
    .optional(),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format")
    .optional(),
});

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
  return { message: "Folder created successfully" };
}

export async function updateFolder(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id");
  if (!id || typeof id !== "string") {
    throw new Error("Invalid folder ID");
  }

  const validatedFields = FolderSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    color: formData.get("color"),
  });

  const [updatedFolder] = await db
    .update(folders)
    .set(validatedFields)
    .where(
      and(eq(folders.id, parseInt(id)), eq(folders.userId, session.user.id)),
    )
    .returning();

  if (!updatedFolder) {
    throw new Error(
      "Folder not found or you do not have permission to update it",
    );
  }

  revalidatePath("/dashboard/notes");
  return { message: "Folder updated successfully" };
}

export async function deleteFolder(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id");
  if (!id || typeof id !== "string") {
    throw new Error("Invalid folder ID");
  }

  const [deletedFolder] = await db
    .delete(folders)
    .where(
      and(eq(folders.id, parseInt(id)), eq(folders.userId, session.user.id)),
    )
    .returning();

  if (!deletedFolder) {
    throw new Error(
      "Folder not found or you do not have permission to delete it",
    );
  }

  revalidatePath("/dashboard/notes");
  return { message: "Folder deleted successfully" };
}
