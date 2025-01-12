import React from "react";
import { Outlet } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppBreadcrumb from "./AppBreadcrumb";
import AppSidebar from "./AppSidebar";

export type roleType = {
  role: string;
};

const DashboardContent: React.FC<roleType> = role => {
  console.log("role", role);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="fixed p-4 ml-2 mt-2 z-20" />
        <AppBreadcrumb />
        <div className="px-4 pt-12">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardContent;
