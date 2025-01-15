import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sidebar as CNSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Organisations",
    url: "/dashboard",
    icon: Building2
  }
];

const Sidebar = () => {
  return (
    <CNSidebar collapsible="icon" variant="sidebar" className="mt-12">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </CNSidebar>
  );
};
export default Sidebar;
