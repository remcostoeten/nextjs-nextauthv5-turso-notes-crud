import React from "react";

type TooltipButtonProps = {
  icon: React.ReactElement;
  label: string;
  onClick: () => void;
  className?: string;
};

export default function TooltipButton({
  icon,
  label,
  onClick,
  className = "",
}: TooltipButtonProps) {
  return (
    <button onClick={onClick} className={`relative group ${className}`}>
      {icon}
      <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-neutral-800 text-neutral-200 text-xs font-medium rounded-lg opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
}
