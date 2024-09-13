"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function getCurrentUser({ session }: { session: any }) {
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
