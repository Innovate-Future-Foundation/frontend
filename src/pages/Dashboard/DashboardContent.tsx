import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Backpack, BookUser, Building2, Users, UsersRound } from "lucide-react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar, { SidebarItem } from "./Sidebar";
import Breadcrumb from "@/components/Breadcurmb";
import { Role } from "@/types/role";

interface DashboardMenuItem {
  sidebarItem: SidebarItem;
  breadCrumbs: BreadCrumbItem[];
}
interface BreadCrumbItem {
  label: string;
  href: string;
}

const dashboardMenu: DashboardMenuItem[] = [
  {
    sidebarItem: {
      title: "organisations",
      url: "/dashboard",
      icon: Building2
    },
    breadCrumbs: [
      { label: "organisations list", href: "/dashboard" },
      { label: "organisation profile & people", href: "/dashboard/organisations/:id" }
    ]
  },
  {
    sidebarItem: {
      title: "teachers",
      url: "/dashboard/teachers",
      icon: Users
    },
    breadCrumbs: [
      { label: "teachers list", href: "/dashboard/teachers" },
      { label: "profile details", href: "/dashboard/teachers/:id" }
    ]
  },
  {
    sidebarItem: {
      title: "members",
      url: "/dashboard/parents",
      icon: BookUser,
      children: [
        {
          title: "parents list",
          url: "/dashboard/parents",
          icon: UsersRound
        },
        {
          title: "students list",
          url: "/dashboard/students",
          icon: Backpack
        }
      ]
    },
    breadCrumbs: [
      { label: "parents", href: "/dashboard/parents" },
      { label: "students", href: "/dashboard/students" }
    ]
  }
];

const DashboardContent: React.FC<Role> = ({ ...role }) => {
  console.log("role", role);
  const location = useLocation();
  const currentMenu = dashboardMenu.find(menu => location.pathname.startsWith(menu.sidebarItem.url));
  const breadcrumbs = currentMenu?.breadCrumbs || [{ label: "/", href: "/dashboard" }];
  return (
    <SidebarProvider>
      <Sidebar sidebarItems={dashboardMenu.map(dashboardMenuItem => dashboardMenuItem.sidebarItem)} />
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
