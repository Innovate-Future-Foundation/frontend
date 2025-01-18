import { SidebarMenuGroup } from "@/pages/Dashboard/DashboardContent";

export const findbreadcrumbs = (menuGroups: SidebarMenuGroup[], path: string) => {
  for (const group of menuGroups) {
    for (const item of group.subMenu) {
      if (path === item.sidebarItem.url) {
        return item.breadcrumbs || [];
      }
      if (item.sidebarItem.children) {
        for (const child of item.sidebarItem.children) {
          if (path === child.url) {
            return (item.breadcrumbs || []).concat({
              label: child.title,
              href: child.url
            });
          }
        }
      }
    }
  }
  return [{ label: "/", href: "/dashboard" }];
};
