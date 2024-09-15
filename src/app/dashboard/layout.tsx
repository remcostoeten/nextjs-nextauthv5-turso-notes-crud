import Header from "@/components/base/layout/header/header";
import Link from "next/link";
import { ReactNode } from "react";

type SidebarProps = {
  // Add any props if needed
};

type DashboardLayoutProps = {
  children: ReactNode;
};

function Sidebar({}: SidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="mt-5">
        <Link
          href="/dashboard"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
        >
          Dashboard Home
        </Link>
        <Link
          href="/dashboard/roles"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
        >
          Role Management
        </Link>
        <Link
          href="/dashboard/relationships"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
        >
          User Relationships
        </Link>
        <Link
          href="/dashboard/activity"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
        >
          User Activity
        </Link>
        <Link
          href="/dashboard/settings"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
        >
          User Settings
        </Link>
      </nav>
    </aside>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-bg-body">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto  p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
