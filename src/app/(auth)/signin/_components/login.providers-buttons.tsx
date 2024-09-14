"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Provider } from "./providers";

interface ProviderButtonProps {
  provider: Provider;
  onClick: () => void;
}

export default function ProviderButton({
  provider,
  onClick,
}: ProviderButtonProps) {
  const [reset, setReset] = useState(false);

  return (
    <button
      onMouseEnter={() => setReset(false)}
      onMouseLeave={() => setReset(true)}
      onClick={onClick}
      className="group flex transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-white/10 items-center justify-center py-5 border rounded-lg hover:bg-transparent/50 duration-150 active:bg-transparent/50"
    >
      <provider.icon
        className={cn(
          "w-5 h-5 group-hover:-translate-y-1 duration-300 transition-all",
          reset ? "translate-y-0" : "transition-transform",
        )}
      />
    </button>
  );
}
