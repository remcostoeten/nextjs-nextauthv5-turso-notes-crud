"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  href: string;
};

const FeatureCard = ({ title, description, href }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const cardRef = useRef<HTMLElement | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: { clientX: number; clientY: number }) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  return (
    <Card
      ref={cardRef}
      className="bg-[#111] border-[#333] hover:border-[#666] transition-colors duration-300 cursor-pointer group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <ChevronRight
            className={`text-[#666] transition-transform duration-300 ${
              isHovered ? "transform translate-x-1" : ""
            }`}
          />
        </div>
        <p className="text-[#999] text-sm">{description}</p>
      </CardContent>
      {isHovered && (
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 100%)`,
          }}
        />
      )}
    </Card>
  );
};

const features = [
  {
    title: "Components",
    description: "Explore our library of reusable UI components.",
    href: "/design-system/components",
  },
  {
    title: "Color System",
    description: "Discover our carefully crafted color palette.",
    href: "/design-system/colors",
  },
  {
    title: "Typography",
    description: "Learn about our typographic choices and scales.",
    href: "/design-system/typography",
  },
  {
    title: "Spacing",
    description: "Understand our spacing system for consistent layouts.",
    href: "/design-system/spacing",
  },
  {
    title: "Icons",
    description: "Browse our collection of custom-designed icons.",
    href: "/design-system/icons",
  },
  {
    title: "Animations",
    description: "See how we use motion to enhance user experience.",
    href: "/design-system/animations",
  },
];

export default function DesignSystemPage() {
  return (
    <ScrollArea className="h-full bg-black text-white">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Design System
          </h1>
          <p className="text-lg text-[#888] mb-12 max-w-2xl">
            Explore the building blocks of our user interfaces. Consistent,
            flexible, and designed for scale.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Getting Started
          </h2>
          <p className="text-[#888] mb-4">To begin using our design system:</p>
          <ol className="list-decimal list-inside space-y-2 mb-6 text-[#888]">
            <li>
              Explore each section to familiarize yourself with our design
              language.
            </li>
            <li>
              Check the documentation for detailed usage guidelines and best
              practices.
            </li>
            <li>
              Use the provided code snippets to implement components in your
              projects.
            </li>
            <li>
              Reach out to the design team if you have any questions or need
              support.
            </li>
          </ol>
        </motion.div>
      </div>
    </ScrollArea>
  );
}
