import { TicketsPlane, Building2, Users, BookUser, UsersRound, Backpack } from "lucide-react";
import { SidebarItem } from "./Sidebar";
import { RoleType } from "@/types";

export interface SidebarheaderAccess {
  url?: string;
  profieEditable?: boolean;
  renderAdminList?: boolean;
}

export interface SidebarMenu {
  sidebarHeader?: SidebarheaderAccess;
  sidebarMenuGroups: SidebarMenuGroup[];
}

export interface SidebarMenuGroup {
  sidebarLabel?: string;
  subMenu: SidebarMenuItem[];
}

export interface SidebarMenuItem {
  sidebarItem: SidebarItem;
  breadcrumbs: Breadcrumb[];
}

export interface Breadcrumb {
  label: string;
  href: string;
}

const platformAdminMenu: SidebarMenu = {
  sidebarMenuGroups: [
    {
      sidebarLabel: "tours",
      subMenu: [
        {
          sidebarItem: {
            title: "tours",
            url: "/dashboard/tours",
            icon: TicketsPlane
          },
          breadcrumbs: [{ label: "tours list", href: "/dashboard/tours" }]
        }
      ]
    },
    {
      sidebarLabel: "users",
      subMenu: [
        {
          sidebarItem: {
            title: "organisations",
            url: "/dashboard",
            icon: Building2
          },
          breadcrumbs: [
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
          breadcrumbs: [{ label: "teachers list", href: "/dashboard/teachers" }]
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
          breadcrumbs: [{ label: "parents list", href: "/dashboard/parents" }]
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
          sidebarItem: {
            title: "tours",
            url: "/dashboard/tours",
            icon: TicketsPlane
          },
          breadcrumbs: [{ label: "tours list", href: "/dashboard/tours" }]
        }
      ]
    },
    {
      sidebarLabel: "users",
      subMenu: [
        {
          sidebarItem: {
            title: "teachers",
            url: "/dashboard/teachers",
            icon: Users
          },
          breadcrumbs: [{ label: "teachers list", href: "/dashboard/teachers" }]
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
          breadcrumbs: [{ label: "parents list", href: "/dashboard/parents" }]
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
          sidebarItem: {
            title: "tours",
            url: "/dashboard/tours",
            icon: TicketsPlane
          },
          breadcrumbs: [{ label: "tours list", href: "/dashboard/tours" }]
        }
      ]
    },
    {
      sidebarLabel: "users",
      subMenu: [
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
          breadcrumbs: [{ label: "parents list", href: "/dashboard/parents" }]
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
          sidebarItem: {
            title: "tours",
            url: "/dashboard/tours",
            icon: TicketsPlane
          },
          breadcrumbs: [{ label: "tours list", href: "/dashboard/tours" }]
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
          sidebarItem: {
            title: "tours",
            url: "/dashboard/tours",
            icon: TicketsPlane
          },
          breadcrumbs: [{ label: "tours list", href: "/dashboard/tours" }]
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
