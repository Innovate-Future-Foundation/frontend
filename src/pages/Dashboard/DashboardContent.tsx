import { Outlet } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumb from "@/components/Breadcurmb";
import { filterMenuByRole } from "./SidebarMenu";
import { useUserStore } from "@/store";
import Sidebar from "./Sidebar";
import { FadeLoader } from "react-spinners";

const DashboardContent = () => {
  const { role, organisaitonProfile } = useUserStore();

  if (!role) {
    return <FadeLoader />;
  }
  const roleBasedDashboardMenuItemGroups = filterMenuByRole(role!, organisaitonProfile?.id ?? "");

  return (
    <SidebarProvider>
      <Sidebar
        sidebarheader={roleBasedDashboardMenuItemGroups.sidebarHeader}
        sidebarItemGroups={roleBasedDashboardMenuItemGroups.sidebarMenuGroups.map(dashboardMenuItem => ({
          sidebarLabel: dashboardMenuItem.sidebarLabel,
          items: dashboardMenuItem.subMenu
        }))}
      />
      <main className="w-full text-primary-foreground30">
        <SidebarTrigger className="fixed p-4 ml-4 mt-3 z-20" />
        <div className="fixed bg-background top-[56px] z-[5] pl-12 h-14 w-full flex items-center">
          <Breadcrumb />
        </div>
        <div className="pt-14 z-0">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardContent;
