"use server";

import { signIn as naSignIn } from "auth";

export async function signIn() {
  await naSignIn();
}
