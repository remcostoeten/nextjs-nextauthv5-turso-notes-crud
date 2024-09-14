"use client";

import { LucideIcon } from "lucide-react";
import React from "react";

type TooltipButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
};

const TooltipButton: React.FC<TooltipButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  className = "",
}) => (
  <button onClick={onClick} className={`relative group ${className}`}>
    <Icon size={24} />
    <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-neutral-800 text-neutral-200 text-xs font-medium rounded-lg opacity-0 transition-opacity group-hover:opacity-100">
      {label}
    </span>
  </button>
);

export default TooltipButton;
