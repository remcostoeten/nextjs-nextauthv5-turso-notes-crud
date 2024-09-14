"use server";

import { signIn } from "auth";
import { AuthError } from "next-auth";

export async function loginUser(
  prevState: any,
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const usernameOrEmail = formData.get("usernameOrEmail") as string;
  const password = formData.get("password") as string;

  try {
    const result = await signIn("credentials", {
      usernameOrEmail,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Login error:", result.error);
      return { success: false, error: "Invalid credentials" };
    }

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid credentials" };
        default:
          return { success: false, error: "Something went wrong" };
      }
    }
    return { success: false, error: "An error occurred during login" };
  }
}
