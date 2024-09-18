"use server";

import { db } from "db";
import { and, eq } from "drizzle-orm";
import { messages, NewMessage, users } from "schema";
import { auth } from "../../../../../auth";

export async function getAllUsers() {
  return await db.select().from(users);
}

export async function getMessagesForUser(userId: string) {
  return await db
    .select()
    .from(messages)
    .where(eq(messages.recipientId, userId));
}

export async function markMessageAsRead(messageId: number) {
  return await db
    .update(messages)
    .set({ isRead: true })
    .where(eq(messages.id, messageId));
}

export async function deleteMessage(messageId: number) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  return await db
    .delete(messages)
    .where(
      and(
        eq(messages.id, messageId),
        eq(messages.recipientId, session?.user?.id ?? ""),
      ),
    );
}

export async function sendMessage(newMessage: NewMessage) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  if (!session.user || !session.user.id) {
    throw new Error("User ID is undefined");
  }
  return await db.insert(messages).values({
    ...newMessage,
    senderId: session.user.id,
  });
}

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
