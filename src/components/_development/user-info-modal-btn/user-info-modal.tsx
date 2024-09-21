"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUserInfo } from "@/core/server/actions/auth/get-user-info";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserProfile {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  dateOfBirth: string | null;
  address: string | null;
  language: string;
  appTheme: string;
  email: string | null;
}

interface Session {
  id: string;
  expiresAt: number;
}

interface UserInfo {
  user: User;
  profile: UserProfile | null;
  session: Session;
}

interface UserInfoModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function UserInfoModal({
  isOpen,
  setIsOpen,
}: UserInfoModalProps): JSX.Element | null {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      getUserInfo()
        .then((info) => {
          if (info) {
            setUserInfo(info);
            setError(null);
          } else {
            setError("Failed to fetch user information");
          }
        })
        .catch((err) => {
          console.error("Error fetching user info:", err);
          setError("An error occurred while fetching user information");
        });
    }
  }, [isOpen]);

  if (!userInfo && !error) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Information</DialogTitle>
        </DialogHeader>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold">User</h3>
              <p>ID: {userInfo!.user.id}</p>
              <p>Name: {userInfo!.user.name}</p>
              <p>Email: {userInfo!.user.email}</p>
            </div>
            {userInfo!.profile ? (
              <div>
                <h3 className="font-semibold">Profile</h3>
                <p>First Name: {userInfo!.profile.firstName || "N/A"}</p>
                <p>Last Name: {userInfo!.profile.lastName || "N/A"}</p>
                <p>Bio: {userInfo!.profile.bio || "N/A"}</p>
                <p>Date of Birth: {userInfo!.profile.dateOfBirth || "N/A"}</p>
                <p>Address: {userInfo!.profile.address || "N/A"}</p>
                <p>Language: {userInfo!.profile.language}</p>
                <p>App Theme: {userInfo!.profile.appTheme}</p>
              </div>
            ) : (
              <p>No profile information available</p>
            )}
            <div>
              <h3 className="font-semibold">Session</h3>
              <p>ID: {userInfo!.session.id}</p>
              <p>
                Expires At:{" "}
                {new Date(userInfo!.session.expiresAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
