import { Building2, Users, Map, BookUser, CalendarCheck2, LayoutGrid, Contact } from "lucide-react";
import { RoleType } from "@/types";
import { SidebarItem } from "./Sidebar";

export interface SidebarMenu {
  sidebarHeader?: SidebarheaderAccess;
  sidebarMenuGroups: SidebarMenuGroup[];
}
export interface SidebarheaderAccess {
  url: string;
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
              title: "managers",
              url: "/dashboard/orgmanagers",
              icon: "bg-secondary-foregroundRed"
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
          url: "/dashboard/contacts",
          icon: Contact
        }
      ]
    }
  ]
};

const organisationAdminMenu: SidebarMenu = {
  sidebarHeader: {
    url: "/dashboard/organisations/:id"
  },
  sidebarMenuGroups: [
    {
      sidebarLabel: "MAIN MENU",
      subMenu: [
        {
          title: "dashboard",
          url: "/dashboard",
          icon: LayoutGrid
        },
        {
          title: "tours",
          url: "/dashboard/tours",
          icon: Map
        }
      ]
    },
    {
      sidebarLabel: "USERS",
      subMenu: [
        {
          title: "stuffs",
          url: "/dashboard/orgmanagers",
          icon: Users,
          children: [
            {
              title: "managers",
              url: "/dashboard/orgmanagers",
              icon: "bg-secondary-foregroundRed"
            },
            {
              title: "teachers",
              url: "/dashboard/orgteachers",
              icon: "bg-secondary-foregroundYellow"
            }
          ]
        },
        {
          title: "clients",
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
          url: "/dashboard/contacts",
          icon: Contact
        }
      ]
    }
  ]
};

const organisationManagerMenu: SidebarMenu = {
  sidebarHeader: {
    url: "/dashboard/organisations/:id"
  },
  sidebarMenuGroups: [
    {
      sidebarLabel: "MAIN MENU",
      subMenu: [
        {
          title: "dashboard",
          url: "/dashboard",
          icon: LayoutGrid
        },
        {
          title: "tours",
          url: "/dashboard/tours",
          icon: Map
        }
      ]
    },
    {
      sidebarLabel: "USERS",
      subMenu: [
        {
          title: "stuffs",
          url: "/dashboard/orgadmins",
          icon: Users,
          children: [
            {
              title: "teachers",
              url: "/dashboard/orgteachers",
              icon: "bg-secondary-foregroundYellow"
            }
          ]
        },
        {
          title: "clients",
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
          url: "/dashboard/contacts",
          icon: Contact
        }
      ]
    }
  ]
};
const organisationTeacherMenu: SidebarMenu = {
  sidebarHeader: {
    url: "/dashboard/organisations/:id"
  },
  sidebarMenuGroups: [
    {
      sidebarLabel: "MAIN MENU",
      subMenu: [
        {
          title: "dashboard",
          url: "/dashboard",
          icon: LayoutGrid
        },
        {
          title: "tours",
          url: "/dashboard/tours",
          icon: Map
        }
      ]
    },
    {
      sidebarLabel: "USERS",
      subMenu: [
        {
          title: "my clients",
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
          url: "/dashboard/contacts",
          icon: Contact
        }
      ]
    }
  ]
};

const parentMenu: SidebarMenu = {
  sidebarHeader: {
    url: "/dashboard/organisations/:id"
  },
  sidebarMenuGroups: [
    {
      sidebarLabel: "MAIN MENU",
      subMenu: [
        {
          title: "dashboard",
          url: "/dashboard",
          icon: LayoutGrid
        },
        {
          title: "tours",
          url: "/dashboard/tours",
          icon: Map
        }
      ]
    },
    {
      sidebarLabel: "CONTACTS",
      subMenu: [
        {
          title: "contacts",
          url: "/dashboard/contacts",
          icon: Contact
        }
      ]
    }
  ]
};

const studentMenu: SidebarMenu = {
  sidebarHeader: {
    url: "/dashboard/organisations/:id"
  },
  sidebarMenuGroups: [
    {
      sidebarLabel: "MAIN MENU",
      subMenu: [
        {
          title: "dashboard",
          url: "/dashboard",
          icon: LayoutGrid
        },
        {
          title: "tours",
          url: "/dashboard/tours",
          icon: Map
        }
      ]
    },
    {
      sidebarLabel: "CONTACTS",
      subMenu: [
        {
          title: "contacts",
          url: "/dashboard/contacts",
          icon: Contact
        }
      ]
    }
  ]
};

export const filterMenuByRole = (role: RoleType, organisationId?: string): SidebarMenu => {
  let baseMenu;
  switch (role) {
    case "PlatformAdmin":
      baseMenu = platformAdminMenu;
      break;
    case "OrgAdmin":
      baseMenu = organisationAdminMenu;
      break;
    case "OrgManager":
      baseMenu = organisationManagerMenu;
      break;
    case "OrgTeacher":
      baseMenu = organisationTeacherMenu;
      break;
    case "Parent":
      baseMenu = parentMenu;
      break;
    case "Student":
      baseMenu = studentMenu;
      break;
    default:
      console.error(`Invalid role provided to filterMenuByRole: ${role}`);
      baseMenu = studentMenu;
  }
  return {
    ...baseMenu,
    sidebarHeader: baseMenu.sidebarHeader
      ? {
          ...baseMenu.sidebarHeader,
          url: baseMenu.sidebarHeader.url.replace(":id", organisationId!)
        }
      : undefined
  };
};
