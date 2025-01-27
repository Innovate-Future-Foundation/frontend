import { Outlet } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumb from "@/components/Breadcurmb";
import { filterMenuByRole } from "./SidebarMenu";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "./Sidebar";
import InviteModal, { FormInputs } from "./components/InviteModal";

const DashboardContent = () => {
  const { role, organisationId } = useAuth();
  console.log("role", role);

  const roleBasedDashboardMenuItemGroups = filterMenuByRole(role, organisationId);

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
        <SidebarTrigger className="fixed p-4 ml-4 mt-2 z-20" />
        <div className="fixed bg-background top-[48px] z-[5] pl-12 h-12 w-full flex items-center">
          <Breadcrumb />
        </div>
        <div className="pt-12 z-0">
          <Outlet />
          <InviteModal
            roleInvited="student"
            onSubmit={async (data: FormInputs) => {
              setTimeout(() => console.log("submit successfully", data), 1000);
            }}
          />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardContent;
