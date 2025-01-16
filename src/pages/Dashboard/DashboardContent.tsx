import React from "react";
import { Outlet } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";
import { Role } from "@/types/role";

const DashboardContent: React.FC<Role> = ({ ...role }) => {
  console.log("role", role);

  return (
    <SidebarProvider>
      <Sidebar />
      <main className="w-full">
        <SidebarTrigger className="fixed p-4 ml-2 mt-2 z-20" />
        <div className="fixed top-[48px] z-10 pl-12 bg-white h-12 w-full flex items-center">
          <Breadcrumb />
        </div>
        <div className="px-4 pt-12">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardContent;
