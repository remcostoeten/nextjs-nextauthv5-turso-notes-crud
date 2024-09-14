import React from "react";

type SpinnerSize = "sm" | "md" | "lg" | "xl";
type SpinnerColor = "primary" | "secondary" | "success" | "danger";
type SpinnerThickness = "thin" | "normal" | "thick";

interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  thickness?: SpinnerThickness;
  className?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

const colorClasses: Record<SpinnerColor, string> = {
  primary: "text-blue-600",
  secondary: "text-gray-600",
  success: "text-green-600",
  danger: "text-red-600",
};

const thicknessClasses: Record<SpinnerThickness, string> = {
  thin: "border-2",
  normal: "border-3",
  thick: "border-4",
};

export default function Spinner({
  size = "md",
  color = "primary",
  thickness = "normal",
  className = "",
}: SpinnerProps) {
  return (
    <span
      className={`
        animate-spin 
        inline-block 
        ${sizeClasses[size]} 
        ${thicknessClasses[thickness]} 
        border-current 
        border-t-transparent 
        ${colorClasses[color]} 
        rounded-full 
        ${className}
      `}
      role="status"
      aria-label="loading"
    />
  );
}
