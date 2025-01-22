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
      sidebarLabel: "platform chores",
      subMenu: [
        {
          title: "platform events",
          url: "/dashboard/events",
          icon: TicketsPlane
        }
      ]
    },
    {
      sidebarLabel: "organisation management",
      subMenu: [
        {
          title: "organisations",
          url: "/dashboard/organisations",
          icon: Building2
        },
        {
          title: "organisation tours",
          url: "/dashboard/tours",
          icon: TicketsPlane
        },
        {
          title: "organisation stuffs",
          url: "/dashboard/orgadmins",
          icon: BookUser,
          children: [
            {
              title: "admins",
              url: "/dashboard/orgadmins",
              icon: Users
            },
            {
              title: "teachers",
              url: "/dashboard/orgteachers",
              icon: Users
            }
          ]
        },
        {
          title: "organisation clients",
          url: "/dashboard/parents",
          icon: BookUser,
          children: [
            {
              title: "parents",
              url: "/dashboard/parents",
              icon: UsersRound
            },
            {
              title: "students",
              url: "/dashboard/students",
              icon: Backpack
            }
          ]
        }
      ]
    },
    {
      sidebarLabel: "user management and contact",
      subMenu: [
        {
          title: "User List",
          url: "/dashboard/users",
          icon: Users
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
      sidebarLabel: "tours management",
      subMenu: [
        {
          title: "tours",
          url: "/dashboard/tours",
          icon: TicketsPlane
        }
      ]
    },
    {
      sidebarLabel: "stuffs management",
      subMenu: [
        {
          title: "teachers",
          url: "/dashboard/orgteachers",
          icon: Users
        }
      ]
    },
    {
      sidebarLabel: "clients management",
      subMenu: [
        {
          title: "clients",
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
    },
    {
      sidebarLabel: "user management and contact",
      subMenu: [
        {
          title: "User List",
          url: "/dashboard/users",
          icon: Users
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
      sidebarLabel: "tours management",
      subMenu: [
        {
          title: "my tours",
          url: "/dashboard/tours",
          icon: TicketsPlane
        }
      ]
    },
    {
      sidebarLabel: "clients management",
      subMenu: [
        {
          title: "my clients",
          url: "/dashboard/parents",
          icon: BookUser,
          children: [
            {
              title: "parents",
              url: "/dashboard/parents",
              icon: UsersRound
            },
            {
              title: "students",
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
          title: "my tours",
          url: "/dashboard/tours",
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
          title: "my tours",
          url: "/dashboard/tours",
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
