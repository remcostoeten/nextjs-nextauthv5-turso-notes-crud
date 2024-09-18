import Header from "@/components/base/layout/header/header";
import { dashboardMetadata as metadata } from "@/core/config/metadata/dashboard.metadata";
import React, { ReactNode } from "react";
import ClientWrapper from "./layout.client";

type DashboardLayoutProps = {
  children: ReactNode;
};

export { metadata };

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-body">
      <Header />
      <div className="flex flex-1 overflow-hidden mt-[var(--header-height)]">
        <ClientWrapper>{children}</ClientWrapper>
      </div>
    </div>
  );
};

export default DashboardLayout;
