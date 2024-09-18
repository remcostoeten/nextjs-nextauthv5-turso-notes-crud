"use server";

import { db } from "@/db";
import { auth } from "auth";
import { eq } from "drizzle-orm";
import { messages } from "../../schema/messages";

export async function getMessages(userId: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  return await db
    .select()
    .from(messages)
    .where(eq(messages.recipientId, userId));
}
