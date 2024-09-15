"use client";

import Flex from "@/components/atoms/Flex";
import { useSessionWithUpdate } from "@/core/hooks/useSessionWithUpdate";
import { GithubIcon, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import Logo from "../../logo";
import SearchModal from "../search/search-modal";
import { buttonLabels } from "./buttonConfig";

const TooltipButton = dynamic(() => import("./TooltipButton"), { ssr: false });
const HeaderDropdown = dynamic(() => import("./header-dropdown"), {
  ssr: false,
});

export default function Header() {
  const { session, status } = useSessionWithUpdate();

  return (
    <header className="bg-neutral-950 h-header border-outline-bottom text-white flex items-center justify-between p-3 min-h-14 pr-6">
      <nav className="flex items-center gap-2">
        <Link href="/" className="hidden md:block">
          <Logo />
        </Link>
        <button className="md:hidden">
          <MenuIcon />
        </button>
      </nav>

      <div className="flex items-center gap-4">
        <Suspense
          fallback={
            <div className="w-72 h-10 bg-neutral-800 animate-pulse rounded-md" />
          }
        >
          <SearchModal />
        </Suspense>
        <Flex gap="6">
          <Suspense
            fallback={
              <div className="w-6 h-6 bg-neutral-800 animate-pulse rounded-full" />
            }
          >
            <TooltipButton
              icon={<GithubIcon size={24} />}
              label={buttonLabels.github}
              onClick={() =>
                window.open("https://github.com/remcostoeten", "_blank")
              }
              className="hidden md:block text-neutral-400 hover:text-neutral-200"
            />
          </Suspense>
          <Suspense
            fallback={
              <div className="w-6 h-6 bg-neutral-800 animate-pulse rounded-full" />
            }
          >
            <TooltipButton
              icon={<Sparkles size={24} />}
              label={buttonLabels.theme}
              onClick={() => console.log("Theme toggle clicked")}
              className="text-neutral-400 hover:text-neutral-200"
            />
          </Suspense>
          <Suspense
            fallback={
              <div className="w-32 h-8 bg-neutral-800 animate-pulse rounded-full" />
            }
          >
            <HeaderDropdown />
          </Suspense>
        </Flex>
      </div>
    </header>
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
