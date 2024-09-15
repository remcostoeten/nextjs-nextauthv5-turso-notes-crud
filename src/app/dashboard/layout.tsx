import { MainSidebar } from "@/components/aside/sidebar";
import SubSidebarShell from "@/components/aside/sub-sidebar-shell";
import Header from "@/components/base/layout/header/header";
import React, { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-body">
      <MainSidebar />
      <div className="flex flex-col flex-1 overflow-hidden ">
        <Header />
        <div className="flex flex-1 overflow-hidden margin-top-header max-h-no-header">
          <SubSidebarShell />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
