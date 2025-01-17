import { LucideIcon } from "lucide-react";
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

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}
export interface SidebarProps {
  sidebarItems: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarItems }) => {
  return (
    <CNSidebar collapsible="icon" variant="sidebar" className="mt-12">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span className="capitalize font-medium text-sm">{item.title}</span>
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
