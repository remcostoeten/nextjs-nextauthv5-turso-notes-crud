"use server";

import { db } from "@/db";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import { users } from "schema";

export type RegisterState = {
  loading: boolean;
  success: boolean;
  error: string | null;
  userId?: string;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  requireLogin?: boolean;
};

export async function registerUser(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name) {
    return {
      loading: false,
      success: false,
      error: "Name is required",
      name,
      email,
      username,
      password,
    };
  }

  if (password !== confirmPassword) {
    return {
      loading: false,
      success: false,
      error: "Passwords do not match",
      name,
      email,
      username,
      password,
    };
  }

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        loading: false,
        success: false,
        error: "User with this email already exists",
        name,
        email,
        username,
        password,
      };
    }

    const hashedPassword = await argon2.hash(password);

    await db.insert(users).values({
      name,
      email,
      username,
      password: hashedPassword,
    });

    return {
      loading: false,
      success: true,
      error: null,
      requireLogin: true,
      name,
      email,
      username,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      loading: false,
      success: false,
      error: "An error occurred during registration",
      name,
      email,
      username,
      password,
    };
  }
}
