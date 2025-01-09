import React from "react";
import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/pages/Dashboard/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export type roleType = {
  role: string;
};

const DashboardContent: React.FC<roleType> = role => {
  console.log("role", role);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="fixed p-4 mt-2" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default DashboardContent;
