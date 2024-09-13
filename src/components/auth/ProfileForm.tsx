"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/core/server/actions/auth/update-profile";
import getCurrentUser from "@/core/server/actions/auth/user.actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export async function ProfileForm(prevState: any, formData: FormData) {
  const user = await getCurrentUser(prevState);
  const router = useRouter();
  const [state, formAction] = useFormState(updateProfile, null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success("Profile updated successfully");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  if (!user) return <div>Loading...</div>;

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={user.name || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          defaultValue={user.email || ""}
          disabled
        />
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          defaultValue={user.username || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative">
          <Input
            type={isPasswordVisible ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            placeholder="Leave blank to keep current password"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Update Profile
      </Button>
    </form>
  );
}
