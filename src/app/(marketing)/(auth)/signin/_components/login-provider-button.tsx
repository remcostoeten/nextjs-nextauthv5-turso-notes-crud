'use client';

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Provider } from "./providers";

type ProviderButtonProps = {
  provider: Provider;
  onClick: () => void;
  hasText?: boolean;
};

export default function ProviderButton({
  provider,
  onClick,
  hasText = false,
}: ProviderButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group flex transform-gpu items-center justify-center py-5 px-6 border rounded-lg hover:bg-transparent/50 duration-150 active:bg-transparent/50 border-white/10 dark:border-[rgba(255,255,255,0.1)] dark:shadow-[0_-20px_80px_-20px_#8686f01f_inset]"
    >
      {provider.icon && (
        <provider.icon
          className={cn(
            "w-6 h-6 transition-all duration-300",
            isHovered ? "-translate-y-1" : "translate-y-0"
          )}
        />
      )}
      {hasText ? (
        <span className="ml-3 font-medium">
          Continue with {provider.name}
        </span>
      ) : null}
    </button>
  );
}
