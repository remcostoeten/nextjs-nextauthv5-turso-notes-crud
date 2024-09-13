"use client";

import Flex from "@/components/atoms/Flex";
import {
  ChevronDownIcon,
  LogoutIcon,
  SettingsIcon,
  ThemeIcon,
} from "@/components/atoms/Icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface UserAvatarProps {
  name: string | null | undefined;
  size?: "small" | "large";
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, size = "small" }) => {
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "";
  const sizeClasses = size === "small" ? "w-7 h-7" : "w-9 h-9";

  return (
    <Flex
      justify="center"
      align="center"
      className={`bg-border-default text-neutral-300 ${sizeClasses} overflow-hidden text-[12px] leading-[16px] font-semibold rounded-full`}
    >
      {initials}
    </Flex>
  );
};

export default function HeaderDropdown() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading" || !session?.user) {
    return null;
  }

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLogout = () => signOut();

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-border-outline !origin-top-right hover:bg-[#262626] duration-300 text-neutral-400 transition-all ease-in-out pl-0.5 pr-2 py-0.5 rounded-full"
      >
        <Flex align="center" gap="1.5">
          <UserAvatar name={session.user.name} />
          <span className="text-sm">{session.user.name}</span>
          <ChevronDownIcon
            className={`transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : ""}`}
          />
        </Flex>
      </button>
      <div
        className={`origin-top-right absolute right-0 mt-2 w-64 rounded-xl bg-section-lighter border-outline shadow-lg z-10 p-1.5 transition-all duration-300 ${isOpen ? "scale-in animate-in fade-in-0 zoom-in-95" : "initial-hidden !total-hide"}`}
      >
        <header className="p-2.5">
          <Flex align="center" gap="3" className="pr-3">
            <UserAvatar name={session.user.name} size="large" />
            <div className="text-text-subtitle">
              <p className="font-medium m-0 text-text-title">
                {session.user.name}
              </p>
              <i className="leading-[16px] opacity-80 m-0 text-text-title">
                {session.user.email}
              </i>
            </div>
          </Flex>
        </header>
        <hr className="my-1.5 border-border-separator" />
        <nav>
          <Link
            href="/account"
            className="flex w-full items-center justify-between gap-5 text-text-regular-nav p-2.5 rounded-md hover:bg-bg-modal-hover"
          >
            Account Settings
            <SettingsIcon />
          </Link>
          <button className="flex w-full items-center justify-between gap-5 text-text-regular-nav p-2.5 rounded-md hover:bg-bg-modal-hover">
            Theme
            <ThemeIcon />
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-between gap-5 text-text-regular-nav p-2.5 rounded-md hover:bg-bg-modal-hover"
          >
            Log out
            <LogoutIcon />
          </button>
        </nav>
      </div>
    </div>
  );
}
