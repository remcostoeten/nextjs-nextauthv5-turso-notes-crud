"use client";

import Flex from "@/components/atoms/Flex";
import {
  ChevronDownIcon,
  LogoutIcon,
  SettingsIcon,
} from "@/components/atoms/Icons";
import { Switch } from "@/components/ui/switch";
import { UI_CONFIG } from "@/core/config/hero-ui.config";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function SignInButton() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return null;
  }

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleLogout = () => signOut();

  const UserAvatar = ({
    name,
    size = "small",
  }: {
    name: string;
    size: string;
  }) => {
    const initials =
      name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase() || "";
    const sizeClasses = size === "small" ? "w-7 h-7" : "w-9 h-9";

    return (
      <Flex
        justify="center"
        align="center"
        className={`bg-avatar text-neutral-300 ${sizeClasses} overflow-hidden text-[12px] leading-[16px] font-semibold rounded-full`}
      >
        {initials}
      </Flex>
    );
  };

  return (
    <div className="relative">
      {session?.user ? (
        <button
          onClick={toggleDropdown}
          className={`flex items-center justify-center gap-x-1 ${UI_CONFIG.SPACING.BUTTON} text-${UI_CONFIG.COLORS.PRIMARY} font-medium transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] ${UI_CONFIG.BORDERS.ROUNDED} md:inline-flex`}
        >
          <Flex align="center" gap="1.5">
            <UserAvatar name={session.user.name} />
            <ChevronDownIcon
              className={`transition-transform duration-200 translate-x-1.5 ease-in-out ${isOpen ? "rotate-180" : ""}`}
            />
          </Flex>
        </button>
      ) : (
        <Link href="/signin" className={`fx`}>
          Sign in
        </Link>
      )}
      {session?.user && isOpen && (
        <div
          className={`absolute border-separator right-0 mt-2 w-64 rounded-xl bg-section-lighter border-default shadow-lg z-10 p-1.5 transition-all duration-300 
                ${isOpen ? "scale-in animate-in fade-in-0 zoom-in-95" : "initial-hidden !total-hide"}`}
        >
          <div className="absolute -top-2 right-[18px] w-4 h-4 bg-section-lighter rotate-45 transform origin-center"></div>
          <header className="p-2.5">
            <Flex align="center" gap="3" className="pr-3">
              <UserAvatar name={session.user.name} size="large" />
              <div className="text-subtitle pl-4">
                <p className="font-medium m-0 text-title">
                  {session.user.name}
                </p>
                <i className="leading-[16px] opacity-80 m-0 text-title">
                  {session.user.email}
                </i>
              </div>
            </Flex>
          </header>
          <hr className="my-1 border-separator" />
          <nav>
            <Link
              href="/dashboard/settings"
              className="flex w-full items-center justify-between gap-5 text-text-regular-nav p-2.5 rounded-md hover:bg-modal-hover"
            >
              Account Settings
              <SettingsIcon />
            </Link>
            <button className="flex w-full items-center justify-between gap-5 text-text-regular-nav p-2.5 rounded-md hover:bg-modal-hover">
              Theme
              <Switch />
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-between gap-5 text-text-regular-nav p-2.5 rounded-md hover:bg-modal-hover"
            >
              Log out
              <LogoutIcon />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
