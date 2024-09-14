import { UI_CONFIG } from "@/core/config/hero-ui.config";
import Link from "next/link";

export function NewsButton() {
  return (
    <Link
      href="/news"
      className={`inline-flex gap-x-6 bg-white/5 items-center justify-center ${UI_CONFIG.BORDERS.ROUNDED} p-1 pr-2 pl-4sm:pr-6 border ${UI_CONFIG.FONTS.SIZES.SMALL} font-medium duration-150 ${UI_CONFIG.ANIMATIONS.HOVER}`}
    >
      <span
        className={`inline-block ${UI_CONFIG.BORDERS.ROUNDED} px-3 hidden sm:block py-1 bg-${UI_CONFIG.COLORS.ACCENT} text-${UI_CONFIG.COLORS.PRIMARY}`}
      >
        News
      </span>
      <p className="flex items-center text-center">
        🎉 Read the launch post from here
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </p>
    </Link>
  );
}

export function GetStartedButton() {
  return (
    <Link
      href="/dashboard"
      className={`flex items-center justify-center gap-x-1 ${UI_CONFIG.SPACING.BUTTON} text-${UI_CONFIG.COLORS.PRIMARY} font-medium transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] ${UI_CONFIG.BORDERS.ROUNDED} md:inline-flex`}
    >
      Go to dashboard
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  );
}

export function ContactSalesButton() {
  return (
    <Link
      href="/signup"
      className={`flex items-center justify-center gap-x-1 py-4 px-4 text-${UI_CONFIG.COLORS.PRIMARY} hover:text-${UI_CONFIG.COLORS.PRIMARY} font-medium duration-150 md:inline-flex`}
    >
      Register
    </Link>
  );
}
