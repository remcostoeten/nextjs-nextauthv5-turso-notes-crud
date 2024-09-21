"use server";

import { db } from "@/core/server/db";
import { lucia } from "@/core/server/lucia";
import { users } from "@/core/server/schema";
import generateUUID from "@/core/utils/generate-uuid";
import hashPassword from "@/core/utils/hash-password";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) {
    return { error: "Missing required fields" };
  }

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .get();

    if (existingUser) {
      return { error: "User already exists" };
    }

    const userId = generateUUID();
    const hashedPassword = await hashPassword(password); // Ensure this is awaited

    await db.insert(users).values({
      id: userId,
      email: email.toLowerCase(),
      password: hashedPassword, // Store the hashed password
      name,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true };
  } catch (error) {
    console.error("Sign up error:", error);
    return { error: "An unexpected error occurred" };
  }
}
