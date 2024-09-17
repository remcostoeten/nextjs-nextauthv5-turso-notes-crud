"use client";

import { sidebarItems } from "@/core/config/sidebar-config";
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Link,
  LucideIcon,
  PanelLeftClose,
  PanelLeftOpen,
  SidebarIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type MainSidebarProps = {
  isSubSidebarOpen: boolean;
  toggleSubSidebar: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
};

export function MainSidebar({
  isSubSidebarOpen,
  toggleSubSidebar,
  isCollapsed,
  toggleCollapse,
}: MainSidebarProps) {
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
    <aside
      className={`fixed left-0 top-[var(--header-height)] bottom-0 bg-body border-r border-outline flex flex-col items-center py-4 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-0 px-0 overflow-hidden" : "px-5 aside-width"
      }`}
    >
      <div
        className={`flex flex-col justify-between h-full overflow-hidden ${isCollapsed ? "w-0" : "aside-width"} transition-all duration-300 ease-in-out`}
      >
        <div className="flex gap-2 flex-col items-center">
          {sidebarItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <SidebarIcon item={item} isActive={activePath === item.path} />
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <SidebarIcon
            item={{ name: "Help", path: "#s", icon: HelpCircle as LucideIcon }}
            isActive={false}
          />
          <button
            onClick={toggleSubSidebar}
            className="size-[55px] opacity-50 flex items-center justify-center text-zinc-400 hover:text-title mt-2"
          >
            {isSubSidebarOpen ? (
              <PanelLeftClose className="w-6 h-6" />
            ) : (
              <PanelLeftOpen className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      <button
        onClick={toggleCollapse}
        className={`absolute -right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-body border border-outline text-white hover:bg-opacity-80 z-10`}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </aside>
  );
}
