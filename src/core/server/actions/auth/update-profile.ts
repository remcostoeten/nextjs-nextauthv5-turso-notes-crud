"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import getCurrentUser from "./user.actions";
export async function updateProfile(prevState: any, formData: FormData) {
  const user = await getCurrentUser(prevState);
  if (!user) {
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

    await db.update(users).set(updateData).where(eq(users.id, user.id));

    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { error: "Failed to update profile" };
  }
}
