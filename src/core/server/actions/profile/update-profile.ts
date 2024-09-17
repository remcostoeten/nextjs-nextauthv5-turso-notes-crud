"use server";

import { users, userSettings } from "schema";
import { auth } from "auth";
import { db } from "db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const bio = formData.get("bio") as string;
  const location = formData.get("location") as string;
  const website = formData.get("website") as string;
  const linkedin = formData.get("linkedin") as string;
  const github = formData.get("github") as string;
  const allowPrivateMessages = formData.get("allowPrivateMessages") === "on";

  await db.transaction(async (tx) => {
    await tx
      .update(users)
      .set({ name, email, username, bio, location, website })
      .where(eq(users.id, session.user.id));

    await tx
      .update(userSettings)
      .set({ linkedin, github, allowPrivateMessages })
      .where(eq(userSettings.userId, session.user.id));
  });

  revalidatePath("/dashboard/profile");
}
