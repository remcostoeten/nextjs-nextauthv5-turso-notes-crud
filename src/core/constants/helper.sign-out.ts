"use server";

import { signOut as naSignOut } from "auth";

export async function signOut() {
  await naSignOut();
}
