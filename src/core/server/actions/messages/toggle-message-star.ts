"use server";

import { db } from "@/db";
import { auth } from "auth";
import { and, eq } from "drizzle-orm";
import { messages } from "../../schema/messages";

export async function toggleMessageStar(messageId: number) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Not authenticated or user ID is undefined");
  }
  const message = await db
    .select()
    .from(messages)
    .where(
      and(
        eq(messages.id, messageId),
        eq(messages.recipientId, session.user.id),
      ),
    )
    .then((res) => res[0]);

  if (!message) {
    throw new Error("Message not found");
  }

  return await db
    .update(messages)
    .set({ isStarred: !message.isStarred })
    .where(eq(messages.id, messageId));
}
