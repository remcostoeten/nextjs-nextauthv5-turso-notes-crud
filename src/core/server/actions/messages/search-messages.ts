"use server";

import { db } from "@/db";
import { and, eq, or, like } from "drizzle-orm";
import { messages } from "../../schema/messages";

export async function searchMessages(userId: string, query: string) {
  return await db
    .select()
    .from(messages)
    .where(
      and(
        eq(messages.recipientId, userId),
        or(
          like(messages.title, `%${query}%`),
          like(messages.content, `%${query}%`),
        ),
      ),
    );
}
