"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "schema";

type UpdateUserData = Partial<
  Omit<typeof users.$inferInsert, "id" | "createdAt">
>;

export async function updateUserProfile(userId: string, data: UpdateUserData) {
  await db.update(users).set(data).where(eq(users.id, userId));
}
