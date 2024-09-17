"use client";

import { updateProfile } from "@/core/server/actions/auth/update-profile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { Button } from "ui";
import { Input } from "ui/input";
import { Label } from "ui/label";
import Spinner from "../ui/Spinner";

export default function ProfileForm({ user }: { user: any }) {
  const router = useRouter();
  const [state, formAction] = useFormState(updateProfile, null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success("Profile updated successfully");
      router.refresh();
      setIsEditing(false);
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  if (!user) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profile Information</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>
      <form action={formAction} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={user.name || ""}
            required
            readOnly={!isEditing}
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
            readOnly={!isEditing}
          />
        </div>
        {isEditing && (
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
        )}
        {isEditing && (
          <div className="flex space-x-4">
            <Button type="submit" className="flex-1">
              Update Profile
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
