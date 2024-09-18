"use server";

import { db } from "@/db";
import { auth } from "auth";
import { and, eq } from "drizzle-orm";
import { messages } from "../../schema/messages";

export async function markMessageAsRead(messageId: number) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  return await db
    .update(messages)
    .set({ isRead: true })
    .where(
      and(
        eq(messages.id, messageId),
        eq(messages.recipientId, session.user.id),
      ),
    );
}
