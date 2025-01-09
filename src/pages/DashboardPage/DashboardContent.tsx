import { AppSidebar } from "@/pages/DashboardPage/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

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
