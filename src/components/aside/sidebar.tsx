"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  HelpCircle,
  Home,
  LayoutDashboard,
  NotebookTabs,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const mainSidebarItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Docs", path: "/docs", icon: FileText },
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", path: "/dashboard/profile", icon: User },
  { name: "Notes", path: "/dashboard/notes", icon: NotebookTabs },
];

const bottomSidebarItems = [
  { name: "Settings", path: "/settings", icon: Settings },
  { name: "Help", path: "/help", icon: HelpCircle },
];

function SidebarIcon({
  item,
  isActive,
}: {
  item: (typeof mainSidebarItems)[0];
  isActive: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200 ${
        isActive
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:text-white hover:bg-zinc-800"
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <item.icon className="w-5 h-5" />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-xs font-medium rounded-md z-10"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {item.name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    const matchingItem =
      [...mainSidebarItems, ...bottomSidebarItems].find(
        (item) => pathname.startsWith(item.path) && item.path !== "/",
      ) || mainSidebarItems[0];
    setActivePath(matchingItem.path);
  }, [pathname]);

  return (
    <aside className="fixed left-0 top-[60px] bottom-0 w-16 bg-zinc-950 border border-r flex flex-col justify-between py-4 border-white">
      <div className="flex flex-col items-center gap-4">
        {mainSidebarItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <SidebarIcon item={item} isActive={activePath === item.path} />
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4">
        {bottomSidebarItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <SidebarIcon item={item} isActive={activePath === item.path} />
          </Link>
        ))}
      </div>
    </aside>
  );
}
