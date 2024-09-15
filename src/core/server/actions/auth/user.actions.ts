"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "schema";

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
