import { auth } from "auth";

import AuthButtonClient from "./AuthButton.client";

const BASE_PATH = "/dashboard";

export default async function AuthButton() {
  const session = await auth();
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  return <AuthButtonClient />;
}
