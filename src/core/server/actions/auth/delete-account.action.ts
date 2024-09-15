"use server";

import { db } from "db";
import { eq } from "drizzle-orm";
import { User, users } from "schema";

export default async function deleteAccount({ user }: { user: User }) {
  if (!user) {
    return { error: "Not authenticated" };
  }

  try {
    await db.delete(users).where(eq(users.id, user.id));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete account:", error);
    return { error: "Failed to delete account" };
  }
}
