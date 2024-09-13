"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/core/constants"; // Make sure this path is correct
import { useSession } from "next-auth/react";
import { useTransition } from "react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return session ? (
    <Button
      onClick={() =>
        startTransition(async () => {
          await signOut();
        })
      }
      disabled={isPending}
    >
      {isPending
        ? "Signing out..."
        : `${session.user?.name ?? "User"} : Sign Out`}
    </Button>
  ) : (
    <Button
      onClick={() =>
        startTransition(async () => {
          await signIn();
        })
      }
      disabled={isPending}
    >
      {isPending ? "Signing in..." : "Sign In"}
    </Button>
  );
}
