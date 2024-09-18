"use client";

import React from "react";

// Define important styles as constants
const FLOAT_SPEED = 3000;
const BLUR_AMOUNT = "5px";
const INNER_BLUR_AMOUNT = "12px";
const OUTER_BLUR_AMOUNT = "3px";

type BubbleProps = {
  size?: number;
  floatDistance?: number;
  floatSpeed?: number;
  backgroundColor?: string;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  zIndex?: number;
};

export default function Bubble({
  size = 700,
  floatDistance = -20,
  floatSpeed = FLOAT_SPEED,
  backgroundColor = "rgb(0, 0, 0)",
  position = "static",
  top,
  left,
  right,
  bottom,
  zIndex,
}: BubbleProps) {
  const bubbleStyle: React.CSSProperties = {
    width: `${size}px`,
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    position,
    backdropFilter: `blur(${BLUR_AMOUNT})`,
    boxShadow:
      "inset 0 0.13vmin blue, inset 0 0.18vmin orange, inset 0.1vmin 0.1vmin orange",
    animation: `floating ${floatSpeed}ms ease-in-out infinite`,
    top,
    left,
    right,
    bottom,
    zIndex,
  };

  const beforeStyle: React.CSSProperties = {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    backdropFilter: `blur(${INNER_BLUR_AMOUNT})`,
    backgroundImage:
      "conic-gradient(from -25deg at 80% 20%, transparent 85%, rgba(255,255,255,0.7) 94%, transparent 94%)",
    filter: "blur(4px)",
  };

  const afterStyle: React.CSSProperties = {
    content: '""',
    position: "absolute",
    inset: "-3px",
    borderRadius: "inherit",
    background: `${backgroundColor.replace("rgb", "rgba").replace(")", ", 0.2)")}`,
    backdropFilter: `blur(${OUTER_BLUR_AMOUNT})`,
    zIndex: -1,
  };

  return (
    <div style={bubbleStyle}>
      <style jsx>{`
        @keyframes floating {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(${floatDistance}px);
          }
        }
      `}</style>
      <div style={beforeStyle} />
      <div style={afterStyle} />
    </div>
  );
}
