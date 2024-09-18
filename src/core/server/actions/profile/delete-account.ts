"use server";

import { auth } from "auth";
import { db } from "db";
import { eq } from "drizzle-orm";
import { users, userSettings } from "schema";

export async function deleteAccount() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  await db.transaction(async (tx) => {
    if (session.user?.id) {
      await tx
        .delete(userSettings)
        .where(eq(userSettings.userId, session.user.id));

      await tx.delete(users).where(eq(users.id, session.user.id));
    }
  });

  // Note: You might want to add additional logic here to revoke sessions, etc.
}
