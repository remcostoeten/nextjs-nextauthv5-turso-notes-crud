"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import DesignSystemTabs from "./_components/DirectionAwareNav";

export default function DesignSystemLayout({ children }: PageProps) {
  const pathname = usePathname();

  const variants = {
    initial: { x: "10%", opacity: 0 },
    animate: { x: 0, scale: 1, opacity: 1 },
    exit: { x: "-10%", opacity: 0 },
  };

  return (
    <div className="min-h-screen  mt-20">
      <DesignSystemTabs />
      <main className="container mx-auto py-6 overflow-hidden bg-[rgba(255,255,255,0.01)] border-outline m-10 rounded-2xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.68, -0.55, 0.27, 1.55] }} // Cool cubic Bezier curve
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
