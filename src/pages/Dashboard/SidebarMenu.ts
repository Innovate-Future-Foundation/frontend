import { TicketsPlane, Building2, Users, Map, BookUser, UsersRound, Backpack, Gauge, CalendarCheck2, LayoutGrid, Contact } from "lucide-react";
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
      subMenu: [
        {
          title: "dashboard",
          url: "/dashboard",
          icon: LayoutGrid
        }
      ]
    },
    {
      sidebarLabel: "PLATFORM",
      subMenu: [
        {
          title: "events",
          url: "/dashboard/events",
          icon: CalendarCheck2
        }
      ]
    },
    {
      sidebarLabel: "ORGs",
      subMenu: [
        {
          title: "organisations",
          url: "/dashboard/organisations",
          icon: Building2
        },
        {
          title: "organisation tours",
          url: "/dashboard/tours",
          icon: Map
        },
        {
          title: "organisation stuffs",
          url: "/dashboard/orgadmins",
          icon: Users,
          children: [
            {
              title: "admins",
              url: "/dashboard/orgadmins",
              icon: "bg-secondary-foreground"
            },
            {
              title: "teachers",
              url: "/dashboard/orgteachers",
              icon: "bg-secondary-foregroundYellow"
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
              icon: "bg-secondary-foregroundPurple"
            },
            {
              title: "students",
              url: "/dashboard/students",
              icon: "bg-secondary-foregroundGreen"
            }
          ]
        },
        {
          title: "contacts",
          url: "/dashboard/users",
          icon: Contact
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
      subMenu: [
        {
          title: "dashboard",
          url: "/dashboard",
          icon: Gauge
        }
      ]
    },
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
      sidebarLabel: "contacts",
      subMenu: [
        {
          title: "Users",
          url: "/dashboard/users",
          icon: Contact
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
      subMenu: [
        {
          title: "dashboard",
          url: "/dashboard",
          icon: Gauge
        }
      ]
    },
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
    },
    {
      sidebarLabel: "contacts",
      subMenu: [
        {
          title: "Users",
          url: "/dashboard/users",
          icon: Users
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
      subMenu: [
        {
          title: "dashboard",
          url: "/dashboard",
          icon: Gauge
        }
      ]
    },
    {
      sidebarLabel: "tours",
      subMenu: [
        {
          title: "my tours",
          url: "/dashboard/tours",
          icon: TicketsPlane
        }
      ]
    },
    {
      sidebarLabel: "contacts",
      subMenu: [
        {
          title: "Users",
          url: "/dashboard/users",
          icon: Users
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
      subMenu: [
        {
          title: "dashboard",
          url: "/dashboard",
          icon: Gauge
        }
      ]
    },
    {
      sidebarLabel: "tours",
      subMenu: [
        {
          title: "my tours",
          url: "/dashboard/tours",
          icon: TicketsPlane
        }
      ]
    },
    {
      sidebarLabel: "contacts",
      subMenu: [
        {
          title: "Users",
          url: "/dashboard/users",
          icon: Users
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
