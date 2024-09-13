"use server";

import { db } from "@/db";
import { NewUser, users } from "@/db/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";
import { signIn } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

export async function registerUser(
  prevState: any,
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.username, username)))
      .get();

    if (existingUser) {
      return { success: false, error: "Email or username already in use" };
    }

    const hashedPassword = await argon2.hash(password);

    const newUser: NewUser = {
      id: uuidv4(),
      name: username, // Set the name to the username if no separate name field is provided
      email,
      username,
      password: hashedPassword,
    };

    await db.insert(users).values(newUser);

    // Log the user in immediately after registration
    const result = await signIn("credentials", {
      usernameOrEmail: email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        error: "Registration successful, but auto-login failed",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "An error occurred during registration" };
  }
}
