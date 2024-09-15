import DashboardSidebar from "@/components/aside/route-specific/dashboard-home-aside";
import NotesSidebar from "@/components/aside/route-specific/notes-aside";
import SettingsSidebar from "@/components/aside/route-specific/settings-aside";
import {
  HelpCircle,
  Home,
  LayoutDashboard,
  LucideIcon,
  NotebookTabs,
  Settings,
  User,
} from "lucide-react";

export type SidebarItem = {
  name: string;
  path: string;
  icon: LucideIcon;
  hasAlert?: boolean;
  alertCount?: number;
};

export const sidebarItems: SidebarItem[] = [
  { name: "Home", path: "/", icon: Home },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    hasAlert: true,
    alertCount: 3,
  },
  { name: "Profile", path: "/dashboard/profile", icon: User },
  { name: "Notes", path: "/dashboard/notes", icon: NotebookTabs },
  { name: "Settings", path: "/settings", icon: Settings },
  { name: "Help", path: "#", icon: HelpCircle },
];

type SubSidebarConfig = {
  [key: string]: {
    component: React.ComponentType;
    allowToggle: boolean;
  };
};

export const subSidebarConfig: SubSidebarConfig = {
  "/dashboard": { component: DashboardSidebar, allowToggle: true },
  "/settings": { component: SettingsSidebar, allowToggle: true },
  "/dashboard/notes": { component: NotesSidebar, allowToggle: false },
};
