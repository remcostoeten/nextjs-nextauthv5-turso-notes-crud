"use server";

import { db } from "@/db";
import { NewUser, users } from "@/db/schema";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function registerUser(
  prevState: any,
  formData: FormData,
): Promise<{ success: boolean; error?: string; message?: string }> {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  try {
    // Check if email is already in use
    const existingEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .get();

    if (existingEmail) {
      return { success: false, error: "Email is already in use" };
    }

    // Check if username is already in use
    const existingUsername = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .get();

    if (existingUsername) {
      return { success: false, error: "Username is already in use" };
    }

    const hashedPassword = await argon2.hash(password);

    const newUser: NewUser = {
      id: uuidv4(),
      name: username,
      email,
      username,
      password: hashedPassword,
    };

    await db.insert(users).values(newUser);

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "An error occurred during registration" };
  }
}
