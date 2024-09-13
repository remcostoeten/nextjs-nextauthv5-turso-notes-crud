"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { authConfig } from "auth";
import { eq } from "drizzle-orm";
import getServerSession from "next-auth";

export async function getCurrentUser() {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .get();

  return user;
}
