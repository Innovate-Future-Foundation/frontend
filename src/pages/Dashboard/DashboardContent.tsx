import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "./Sidebar";
import Breadcrumb from "@/components/Breadcurmb";
import { Role } from "@/types/role";
import { findbreadcrumbs } from "@/utils/navigationHelpers";
import { filterMenuByRole } from "./SidebarMenu";

const DashboardContent: React.FC<Role> = ({ ...role }) => {
  console.log("role", role);

  const roleBasedDashboardMenuItemGroups = filterMenuByRole(role.name);
  const location = useLocation();
  const breadcrumbs = findbreadcrumbs(roleBasedDashboardMenuItemGroups.sidebarMenuGroups, location.pathname);

  return (
    <SidebarProvider>
      <Sidebar
        sidebarheader={roleBasedDashboardMenuItemGroups.sidebarHeader}
        sidebarItemGroups={roleBasedDashboardMenuItemGroups.sidebarMenuGroups.map(dashboardMenuItem => ({
          sidebarLabel: dashboardMenuItem.sidebarLabel,
          items: dashboardMenuItem.subMenu.map(item => item.sidebarItem)
        }))}
      />
      <main className="w-full">
        <SidebarTrigger className="fixed p-4 ml-2 mt-2 z-20" />
        <div className="fixed top-[48px] z-[5] pl-12 bg-white h-12 w-full flex items-center">
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </div>
        <div className="px-4 pt-12 z-0">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardContent;
