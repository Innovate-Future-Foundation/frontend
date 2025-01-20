import { TicketsPlane, Building2, Users, BookUser, UsersRound, Backpack } from "lucide-react";
import { RoleType } from "@/types";
import { SidebarItem } from "./Sidebar";

export interface SidebarMenu {
  sidebarHeader?: SidebarheaderAccess;
  sidebarMenuGroups: SidebarMenuGroup[];
}
export interface SidebarheaderAccess {
  url?: string;
  profieEditable?: boolean;
  renderAdminList?: boolean;
}
export interface SidebarMenuGroup {
  sidebarLabel?: string;
  subMenu: SidebarItem[];
}

const platformAdminMenu: SidebarMenu = {
  sidebarMenuGroups: [
    {
      sidebarLabel: "tours",
      subMenu: [
        {
          title: "tours",
          url: "/dashboard",
          icon: TicketsPlane
        }
      ]
    },
    {
      sidebarLabel: "users",
      subMenu: [
        {
          title: "organisations",
          url: "/dashboard/organisations",
          icon: Building2
        },
        {
          title: "organisation stuffs",
          url: "/dashboard/orgstuffs",
          icon: Users
        },
        {
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
        }
      ]
    }
  ]
};

const organisationAdminMenu: SidebarMenu = {
  sidebarHeader: {
    url: "/dashboard/organisations/:id",
    profieEditable: true,
    renderAdminList: true
  },
  sidebarMenuGroups: [
    {
      sidebarLabel: "tours",
      subMenu: [
        {
          title: "tours",
          url: "/dashboard",
          icon: TicketsPlane
        }
      ]
    },
    {
      sidebarLabel: "users",
      subMenu: [
        {
          title: "teachers",
          url: "/dashboard/teachers",
          icon: Users
        },
        {
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
        }
      ]
    }
  ]
};

const organisationTeacherMenu: SidebarMenu = {
  sidebarHeader: {
    url: "/dashboard/organisations/:id",
    profieEditable: false,
    renderAdminList: false
  },
  sidebarMenuGroups: [
    {
      sidebarLabel: "tours",
      subMenu: [
        {
          title: "tours",
          url: "/dashboard",
          icon: TicketsPlane
        }
      ]
    },
    {
      sidebarLabel: "users",
      subMenu: [
        {
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
        }
      ]
    }
  ]
};

const parentMenu: SidebarMenu = {
  sidebarHeader: {
    url: "/dashboard/organisations/:id",
    profieEditable: false,
    renderAdminList: false
  },
  sidebarMenuGroups: [
    {
      sidebarLabel: "tours",
      subMenu: [
        {
          title: "tours",
          url: "/dashboard",
          icon: TicketsPlane
        }
      ]
    }
  ]
};

const studentMenu: SidebarMenu = {
  sidebarHeader: {
    url: "/dashboard/organisations/:id",
    profieEditable: false,
    renderAdminList: false
  },
  sidebarMenuGroups: [
    {
      sidebarLabel: "tours",
      subMenu: [
        {
          title: "tours",
          url: "/dashboard",
          icon: TicketsPlane
        }
      ]
    }
  ]
};

export const filterMenuByRole = (role: RoleType): SidebarMenu => {
  switch (role) {
    case "platform admin":
      return platformAdminMenu;
    case "organisation admin":
      return organisationAdminMenu;
    case "organisation teacher":
      return organisationTeacherMenu;
    case "parent":
      return parentMenu;
    case "student":
      return studentMenu;
    default:
      throw new Error("Invalid role provided to filterMenuByRole");
  }
};
