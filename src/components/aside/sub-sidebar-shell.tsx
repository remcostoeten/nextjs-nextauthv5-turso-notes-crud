"use client";

import { subSidebarConfig } from "@/core/config/sidebar-config";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function SubSidebarShell() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [currentConfig, setCurrentConfig] = useState<any>(null);

  useEffect(() => {
    const config = subSidebarConfig[pathname];
    setCurrentConfig(config);
  }, [pathname]);

  if (!currentConfig) {
    return null;
  }

  const { component: SidebarContent, allowToggle } = currentConfig;

  const toggleSidebar = () => {
    if (allowToggle) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 230, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-gray-800 h-full overflow-hidden"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>
      {allowToggle && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 -right-4 bg-gray-700 text-white p-1 rounded-full shadow-lg"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      )}
    </div>
  );
}

export default SubSidebarShell;
