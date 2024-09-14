"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import argon2 from "argon2";
import { eq, and, not } from "drizzle-orm";
import { auth } from "auth";

export async function updateProfile(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Not authenticated" };
  }

  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const newPassword = formData.get("newPassword") as string;

  try {
    const updateData: any = { name, username };
    if (newPassword) {
      updateData.password = await argon2.hash(newPassword);
    }

    // Check if username already exists (excluding the current user)
    const existingUser = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.username, username),
          not(eq(users.id, session.user.id))
        )
      )
      .get();

    if (existingUser) {
      return { error: "Username already taken" };
    }

    await db.update(users).set(updateData).where(eq(users.id, session.user.id));

    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { error: "Failed to update profile" };
  }
}
