"use client";

import { SidebarItem, sidebarItems } from "@/core/config/sidebar-config";
import { motion } from "framer-motion";
import { Edit, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SidebarIconProps = {
  item: SidebarItem;
  isActive: boolean;
};

function SidebarIcon({ item, isActive }: SidebarIconProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.div
      className={`relative flex items-center justify-center w-8 h-8 mb-4 rounded-md transition-colors duration-200 border ${
        isActive
          ? "bg-body border-outline text-white"
          : "!border-transparent text-zinc-400 hover:text-title hover:bg-body hover:border-outline"
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <item.icon className="w-4 h-4" />
      {item.hasAlert && (
        <div className="absolute -top-1 -right-1 flex items-center justify-center size-4 px-1 bg-body border border-outline rounded-full shadow-xl backdrop-filter backdrop-blur-lg z-10">
          <span className="text-[12px] font-bold text-title z-20">
            {item.alertCount && item.alertCount > 99 ? "99+" : item.alertCount}
            <div className="absolute -z-10 inset-0 rounded-full shadow-[0_0_10px_rgba(255,165,0,.7)] blur-[5px]"></div>
          </span>
        </div>
      )}
      {isHovered && (
        <motion.div
          className="absolute left-full ml-2 px-2 py-1 bg-body border border-outline text-white text-xs font-medium rounded-md whitespace-nowrap"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {item.name}
        </motion.div>
      )}
    </motion.div>
  );
}

export function MainSidebar() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string>("");

  useEffect(() => {
    const matchingItem =
      sidebarItems.find(
        (item) => pathname.startsWith(item.path) && item.path !== "/",
      ) || sidebarItems[0];
    setActivePath(matchingItem.path);
  }, [pathname]);

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-12 bg-body  border-outline-right margin-top-header max-h-no-header flex flex-col items-center py-4">
      {sidebarItems.map((item) => (
        <Link key={item.path} href={item.path}>
          <SidebarIcon item={item} isActive={activePath === item.path} />
        </Link>
      ))}
      <div className="mt-auto">
        <SidebarIcon
          item={{ name: "Edit", path: "/edit", icon: Edit as LucideIcon }}
          isActive={false}
        />
      </div>
    </aside>
  );
}
