"use server";

import { db } from "@/db";
import { auth } from "auth";
import { and, eq } from "drizzle-orm";
import { messages } from "../../schema/messages";

export async function getMessageById(messageId: number) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  return await db
    .select()
    .from(messages)
    .where(
      and(
        eq(messages.id, messageId),
        eq(messages.recipientId, session?.user?.id ?? ""),
      ),
    )
    .then((res) => res[0]);
}
