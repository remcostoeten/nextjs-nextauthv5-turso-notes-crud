'use client';

"use client";
import { validateRequest } from "@/core/server/lucia";
import { redirect } from "next/navigation";

export default async function Header() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/");
  }
  return (
    <header className="bg-neutral-950 h-header border-outline-bottom text-white flex items-center justify-between p-3 min-h-14 pr-6">
    </header >
  );
}

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H80V200H40ZM216,200H96V56H216V200Z" />
  </svg>
);
