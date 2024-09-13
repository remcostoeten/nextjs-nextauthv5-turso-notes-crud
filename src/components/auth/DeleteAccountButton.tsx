"use client";

import { Button } from "@/components/ui/button";
import deleteAccount from "@/core/server/actions/auth/delete-account.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteAccountButton({
  user,
}: {
  user?: {
    id: string;
    name: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date | null;
  };
}) {
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    if (!user) {
      toast.error("User information is missing");
      return;
    }
    const result = await deleteAccount({ user });
    if (result.success) {
      toast.success("Account deleted successfully");
      router.push("/");
    } else {
      toast.error(result.error || "Failed to delete account");
    }
  };

  if (isConfirming) {
    return (
      <div className="space-x-4">
        <Button variant="destructive" onClick={handleDelete}>
          Confirm Delete
        </Button>
        <Button variant="outline" onClick={() => setIsConfirming(false)}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button variant="destructive" onClick={() => setIsConfirming(true)}>
      Delete Account
    </Button>
  );
}
