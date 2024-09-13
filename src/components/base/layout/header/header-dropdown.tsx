"use client";

import Spinner from "@/components/ui/Spinner";
import { useSession } from "next-auth/react";
import { useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function HeaderDropdown() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return <Spinner />;
  }

  if (!session?.user) {
    return null;
  }

  const userInfo: User = {
    id: session.user.id as string,
    name: session.user.name ?? "",
    email: session.user.email ?? "",
  };

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-border-outline hover:bg-[#262626] duration-300 text-neutral-400 cursor-pointer flex items-center gap-1.5 transition-all ease-in-out duration-[0.15s] box-border pl-0.5 pr-2 py-0.5 rounded-full"
    >
      <div className="bg-border-default text-neutral-300 relative box-content flex w-7 h-7 animate-[0.6s_ease_0s_1_normal_forwards_running_fade] items-center justify-center overflow-hidden text-[12px] leading-[16px] font-semibold rounded-full border-0 border-solid">
        {userInfo.name.charAt(0).toUpperCase()}
      </div>
      <span className="text-sm">{userInfo.name}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={12}
        height={12}
        fill="currentColor"
        viewBox="0 0 256 256"
        className={`block align-middle box-border border-0 border-solid transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : ""}`}
      >
        <path d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z" />
      </svg>
    </div>
  );
}
