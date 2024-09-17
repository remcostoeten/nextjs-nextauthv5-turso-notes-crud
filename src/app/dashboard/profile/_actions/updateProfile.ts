"use server";

import { auth } from "auth";
import { db } from "db";
import { eq } from "drizzle-orm";
import { users } from "schema";
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

  await db
    .update(users)
    .set({ name, email, username, bio, location, website })
    .where(eq(users.id, session.user.id));

  revalidatePath("/dashboard/profile");
}
