// File: app/signin/actions.ts
"use server";

import { signIn } from "auth";
import { AuthError } from "next-auth";

export async function signInUser(
  prevState: any,
  formData: FormData,
): Promise<{ loading: boolean; success: boolean; error: string | null }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Login error:", result.error);
      return { loading: false, success: false, error: "Invalid credentials" };
    }
    return { loading: false, success: true, error: null };
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            loading: false,
            success: false,
            error: "Invalid credentials",
          };
        default:
          return {
            loading: false,
            success: false,
            error: "Something went wrong",
          };
      }
    }
    return {
      loading: false,
      success: false,
      error: "An error occurred during login",
    };
  }
}
