import { ChevronRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sidebar as CNSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
  children?: SidebarItem[];
}
export interface SidebarProps {
  sidebarItems: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarItems }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <CNSidebar collapsible="icon" variant="sidebar" className="mt-12">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map(item =>
                item.children ? (
                  <Collapsible open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} defaultOpen className="group/collapsible" key={item.title}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link to={item.url}>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <item.icon className="w-4 h-4" />
                                <span className="capitalize font-medium text-sm">{item.title}</span>
                              </div>
                              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-90" : "rotate-0"}`} />
                            </div>
                          </Link>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {item.children &&
                          item.children.map(child => (
                            <SidebarMenuSub>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton className="flex items-center">
                                  <Link to={child.url}>
                                    <div className="flex items-center gap-2">
                                      <child.icon className="w-4 h-4 inline" />
                                      <span className="capitalize text-sm">{child.title}</span>
                                    </div>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>
                          ))}
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon className="w-5 h-5" />
                        <span className="capitalize font-medium text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </CNSidebar>
  );
};
export default Sidebar;
