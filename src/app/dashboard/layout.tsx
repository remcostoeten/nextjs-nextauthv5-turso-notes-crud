import Header from "@/components/base/layout/header/header";
import { ReactNode } from "react";

type SidebarProps = {
  // Add any props if needed
};

type DashboardLayoutProps = {
  children: ReactNode;
};

function Sidebar({}: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-800 h-screen sticky top-0 text-white">
      Sidebar
    </aside>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
