"use client";

import React from "react";
import { motion } from "framer-motion";

type AnimatedBlobGradientCardProps = {
  children: React.ReactNode;
  BACKGROUND_COLOR?: string;
  BORDER_COLOR?: string;
  BORDER_RADIUS?: string;
  GRADIENT_COLORS?: string[];
  ANIMATION_DURATION?: number;
  RANDOMNESS?: number;
};

const AnimatedBlobGradientCard: React.FC<AnimatedBlobGradientCardProps> = ({
  children,
  BACKGROUND_COLOR = "#111",
  BORDER_COLOR = "#333",
  BORDER_RADIUS = "12px",
  GRADIENT_COLORS = ["rgba(75, 0, 130, 0.7)", "rgba(0, 0, 139, 0.7)"],
  ANIMATION_DURATION = 20,
  RANDOMNESS = 0.2,
}) => {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  const filterId = `filter-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: BACKGROUND_COLOR,
        borderColor: BORDER_COLOR,
        borderRadius: BORDER_RADIUS,
        padding: "24px",
      }}
    >
      <div className="relative z-10">{children}</div>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {GRADIENT_COLORS.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / (GRADIENT_COLORS.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacement"
            />
          </filter>
        </defs>
        <motion.circle
          cx="50%"
          cy="50%"
          r="40%"
          fill={`url(#${gradientId})`}
          filter={`url(#${filterId})`}
          animate={{
            scale: [1, 1 + RANDOMNESS, 1 - RANDOMNESS, 1],
            rotate: [0, 360],
            x: [0, 20 * RANDOMNESS, -20 * RANDOMNESS, 0],
            y: [0, -20 * RANDOMNESS, 20 * RANDOMNESS, 0],
          }}
          transition={{
            duration: ANIMATION_DURATION,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatedBlobGradientCard;
