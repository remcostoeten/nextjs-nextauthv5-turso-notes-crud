"use client";

import { BackgroundGradient, UI_CONFIG } from "@/core/config/hero-ui.config";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoIcon from "../logo";
import SignInButton from "./header/SignInButton";

type NavigationItem = {
  title: string;
  path: string;
};

const navigation: NavigationItem[] = [
  { title: "Features", path: "#features" },
  { title: "Integrations", path: "#integrations" },
  { title: "Customers", path: "#customers" },
  { title: "Pricing", path: "#pricing" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSticky, setIsSticky] = useState(false);
  const selectedGradient = BackgroundGradient.PINK;

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative mt-8">
      <div
        className="absolute -mt-8 inset-0 blur-xl h-[710px] animate-gradient-move animate-opacity-pulse"
        style={{ background: UI_CONFIG.COLORS.BACKGROUND[selectedGradient] }}
      />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isSticky ? "bg-white shadow-md" : "bg-transparent"}`}
      >
        <nav
          className={`pb-5 ${UI_CONFIG.FONTS.SIZES.SMALL} ${isSticky ? "py-2" : "py-5"} transition-all duration-300 ease-in-out`}
        >
          <div
            className={`gap-x-14 items-center ${UI_CONFIG.SPACING.SECTION} md:flex`}
          >
            <LogoIcon isLink />
            <div
              className={`flex-1 text-${UI_CONFIG.COLORS.SECONDARY} items-center mt-8 md:mt-0 md:flex block`}
            >
              <NavigationMenu />
              <SignInButton />
            </div>
          </div>
        </nav>
      </header>
      <div className="relative pt-20">{children}</div>
    </div>
  );
}

function NavigationMenu() {
  return (
    <ul
      className={`mx-auto flex justify-center items-center space-y-6 md:space-x-6 md:space-y-0 ${UI_CONFIG.BORDERS.ROUNDED} dark:bg-zinc-800/10 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] px-6 py-4 ${UI_CONFIG.FONTS.SIZES.SMALL} font-medium text-zinc-800 ${UI_CONFIG.SHADOWS.DEFAULT} ring-1 ring-zinc-900/5 backdrop-blur dark:text-zinc-200 dark:ring-white/10 w-fit`}
    >
      {navigation.map((item) => (
        <li
          key={item.title}
          className={`text-${UI_CONFIG.COLORS.SECONDARY} hover:text-${UI_CONFIG.COLORS.PRIMARY}`}
        >
          <Link href={item.path} className="block">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
