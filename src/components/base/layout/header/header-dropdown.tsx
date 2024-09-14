'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useSessionWithUpdate } from '@/core/hooks/useSessionWithUpdate';
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

type UserAvatarProps = {
  name: string | null | undefined;
  size?: "small" | "large";
};

const UserAvatar: React.FC<UserAvatarProps> = ({ name, size = "small" }) => {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "";
  const sizeClasses = size === "small" ? "w-7 h-7" : "w-9 h-9";

  return (
    <div className={`bg-primary text-primary-foreground ${sizeClasses} flex items-center justify-center overflow-hidden text-sm font-semibold rounded-full`}>
      {initials}
    </div>
  );
};

export default function HeaderDropdown() {
  const { session, status } = useSessionWithUpdate();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return null;
  }

  const handleLogout = () => signOut();

  return (
    <div className="relative">
      {session?.user ? (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 bg-transparent hover:bg-transparent">
              <div className="flex items-center gap-2">
                <UserAvatar name={session.user.name} />
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session.user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex w-full cursor-pointer items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex w-full cursor-pointer items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex w-full items-center justify-between">
                <span>Dark Mode</span>
                <Switch />
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
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
