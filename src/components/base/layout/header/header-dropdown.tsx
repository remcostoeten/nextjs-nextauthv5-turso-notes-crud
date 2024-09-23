"use client";

import { lucia, validateRequest } from "@/core/server/lucia";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Switch
} from "ui";

type UserAvatarProps = {
  name: string | null | undefined;
  size?: "small" | "large";
};

const UserAvatar = ({ name, size = "small" }: UserAvatarProps) => {
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "";
  const sizeClasses = size === "small" ? "w-7 h-7" : "w-9 h-9";

  return (
    <div
      className={`bg-primary text-primary-foreground ${sizeClasses} flex items-center justify-center overflow-hidden text-sm font-semibold rounded-full`}
    >
      {initials}
    </div>
  );
};

export default async function HeaderDropdown() {
  const { user, session } = await validateRequest();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    await lucia.invalidateSession(session.id); // Invalidate the session
    window.location.href = "/signin"; // Redirect to sign-in page
  };

  const handleSwitchClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="relative">
      {user ? (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 bg-transparent hover:bg-transparent"
            >
              <div className="flex items-center gap-2">
                <UserAvatar name={user?.name ?? ''} />
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                    }`}
                />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 dropdown-content"
            align="end"
            sideOffset={5}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.name ?? 'Unknown'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email ?? 'Unknown'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/settings"
                className="flex w-full cursor-pointer items-center"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/settings"
                className="flex w-full cursor-pointer items-center"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex w-full items-center justify-between">
                <span>Dark Mode</span>
                <Switch w/>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/signin">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}
