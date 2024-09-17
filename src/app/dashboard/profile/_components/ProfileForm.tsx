"use client";

import { deleteAccount, updateProfile } from "actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { User, UserSettings } from "schema";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Switch,
  Textarea,
} from "ui";

interface ProfileFormProps {
  user: User;
  userSettings: UserSettings;
}

export function ProfileForm({ user, userSettings }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await updateProfile(formData);
        toast.success("Profile updated successfully");
        router.refresh();
      } catch (error) {
        toast.error("Failed to update profile");
      }
    });
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      startTransition(async () => {
        try {
          await deleteAccount();
          toast.success("Account deleted successfully");
          router.push("/"); // Redirect to home page or login page
        } catch (error) {
          toast.error("Failed to delete account");
        }
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={user.name} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={user.email}
                required
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                defaultValue={user.username}
                required
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" defaultValue={user.bio || ""} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue={user.location || ""}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                defaultValue={user.website || ""}
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="linkedin"
                defaultValue={userSettings.linkedin || ""}
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                name="github"
                defaultValue={userSettings.github || ""}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="allowPrivateMessages"
                name="allowPrivateMessages"
                defaultChecked={userSettings.allowPrivateMessages}
              />
              <Label htmlFor="allowPrivateMessages">
                Allow Private Messages
              </Label>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
          <p className="mt-2 text-sm text-gray-500">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button
            variant="destructive"
            className="mt-4"
            onClick={handleDeleteAccount}
            disabled={isPending}
          >
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
