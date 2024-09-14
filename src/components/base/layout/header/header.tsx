"use client";

import { HelpCircle, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { memo, Suspense } from "react";
import { buttonLabels } from "./buttonConfig";

const SearchButton = dynamic(() => import("./SearchButton"), { ssr: false });
const TooltipButton = dynamic(() => import("./TooltipButton"), { ssr: false });
const HeaderDropdown = dynamic(() => import("./header-dropdown"), {
  ssr: false,
});

import Flex from "@/components/atoms/Flex";
import Logo from "../../logo";

function Header() {
  return (
    <header className="bg-neutral-950 text-white border-b flex items-center justify-between p-3 min-h-14 mr-4">
      <nav className="flex items-center gap-2">
        <a
          href="/d293afa7-22d4-40ec-8c07-0bf6b3526589/"
          className="hidden md:block"
        >
          <Logo />
        </a>
        <button className="md:hidden">
          <MenuIcon />
        </button>
        <ProjectSelector />
      </nav>

      <div className="flex items-center gap-4">
        <Suspense
          fallback={
            <div className="w-72 h-10 bg-neutral-800 animate-pulse rounded-md" />
          }
        >
          <SearchButton />
        </Suspense>
        <Flex gap='6'>
          <Suspense
            fallback={
              <div className="w-6 h-6 bg-neutral-800 animate-pulse rounded-full" />
            }
          >
            <TooltipButton
              icon={HelpCircle}
              label={buttonLabels.help}
              onClick={() => console.log("Help clicked")}
              className="hidden md:block text-neutral-400 hover:text-neutral-200"
            />
          </Suspense>
          <Suspense
            fallback={
              <div className="w-6 h-6 bg-neutral-800 animate-pulse rounded-full" />
            }
          >
            <TooltipButton
              icon={Sparkles}
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

const MenuIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H80V200H40ZM216,200H96V56H216V200Z" />
  </svg>
));
MenuIcon.displayName = "MenuIcon";

const ProjectSelector = memo(() => (
  <button className="flex items-center gap-2.5 text-neutral-200 text-sm font-medium hover:bg-neutral-800 rounded-md p-2">
    <div className="h-5 w-40" />
  </button>
));
ProjectSelector.displayName = "ProjectSelector";

export default memo(Header);
