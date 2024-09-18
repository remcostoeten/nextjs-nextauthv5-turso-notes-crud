"use serer";

import { db } from "@/db";
import { auth } from "auth";
import { NewMessage, messages } from "../../schema/messages";

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
