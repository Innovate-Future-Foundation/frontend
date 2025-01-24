import { TicketsPlane, Building2, Users, BookUser, UsersRound, Backpack, Gauge } from "lucide-react";
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
          icon: Gauge
        }
      ]
    },
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
    }
  ]
};

const organisationManagerMenu: SidebarMenu = {
  sidebarHeader: {
    url: "/dashboard/organisations/:id",
    profieEditable: true,
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

const filterMenuItemsByPermission = (menu: SidebarMenu, role: RoleType): SidebarMenu => {
  const filteredGroups = menu.sidebarMenuGroups
    .map(group => ({
      ...group,
      subMenu: group.subMenu.filter(item => {
        // 检查 URL 权限
        if (item.url === "/dashboard/orgadmins") {
          return ["platform admin", "organisation admin"].includes(role);
        }
        // 如果有子菜单，也需要过滤
        if (item.children) {
          item.children = item.children.filter(child => {
            if (child.url === "/dashboard/orgadmins") {
              return ["platform admin", "organisation admin"].includes(role);
            }
            return true;
          });
          // 如果过滤后没有子菜单，则不显示父菜单
          return item.children.length > 0;
        }
        return true;
      })
    }))
    .filter(group => group.subMenu.length > 0);

  return {
    ...menu,
    sidebarMenuGroups: filteredGroups
  };
};

export const filterMenuByRole = (role: RoleType): SidebarMenu => {
  let baseMenu;
  switch (role) {
    case "platform admin":
      baseMenu = platformAdminMenu;
      break;
    case "organisation admin":
      baseMenu = organisationAdminMenu;
      break;
    case "organisation manager":
      baseMenu = organisationManagerMenu;
      break;
    case "organisation teacher":
      baseMenu = organisationTeacherMenu;
      break;
    case "parent":
      baseMenu = parentMenu;
      break;
    case "student":
      baseMenu = studentMenu;
      break;
    default:
      console.error(`Invalid role provided to filterMenuByRole: ${role}`);
      baseMenu = studentMenu;
  }
  return filterMenuItemsByPermission(baseMenu, role);
};
