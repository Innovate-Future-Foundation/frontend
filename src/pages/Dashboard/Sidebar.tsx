import { ChevronRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sidebar as CNSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import Avatar from "@/components/Avatar";
import { SidebarheaderAccess } from "./SidebarMenu";

export interface SidebarProps {
  sidebarheader?: SidebarheaderAccess;
  sidebarItemGroups: SidebarItemGroup[];
}

export interface SidebarItemGroup {
  sidebarLabel?: string;
  items: SidebarItem[];
}
export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
  children?: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarItemGroups, sidebarheader }) => {
  const { state, isMobile } = useSidebar();

  const hasChildrenWithTitle = sidebarItemGroups.reduce((groupAcc: Record<string, boolean>, sidebarItemGroup: SidebarItemGroup) => {
    sidebarItemGroup.items.forEach(item => {
      if (item.children) {
        groupAcc[item.title] = true;
      }
    });
    return groupAcc;
  }, {});

  const [isOpen, setIsOpen] = useState<Record<string, boolean>>(hasChildrenWithTitle);

  const handleOpenChange = (title: string) => {
    setIsOpen(prev => ({
      ...prev,
      [title]: !isOpen[title]
    }));
  };
  return (
    <CNSidebar collapsible="icon" variant="sidebar" className="mt-12">
      {sidebarheader && (
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-auto" size={"lg"}>
                <Link to={sidebarheader.url ?? ""}>
                  <div className="flex items-center gap-2">
                    <Avatar
                      size={8}
                      className="inline-block"
                      avatarLink={"https://github.com/shadcn.png"}
                      avatarAlt={"@AcmeCorporation"}
                      avatarPlaceholder={"AC"}
                    />
                    {state === "expanded" && !isMobile && (
                      <div className="flex flex-col items-start gap-[2px]">
                        <p className="text-primary font-bold text-sm leading-3 truncate max-w-40">{"Acme Corporation"}</p>
                        <p className="text-primary text-[12px] leading-3 truncate max-w-40">{"info@acmecorp.com"}</p>
                      </div>
                    )}
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      )}
      <SidebarContent>
        {sidebarItemGroups.map((sidebarItemGroup, index) => (
          <SidebarGroup key={`${sidebarItemGroup.sidebarLabel}${index}`}>
            {sidebarItemGroup.sidebarLabel && <SidebarGroupLabel>{sidebarItemGroup.sidebarLabel}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItemGroup.items.map((item, index) =>
                  item.children ? (
                    <Collapsible
                      open={isOpen[item.title]}
                      onOpenChange={() => handleOpenChange(item.title)}
                      defaultOpen
                      className="group/collapsible"
                      key={`${item.title}${index}`}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton asChild>
                            <Link to={item.url}>
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                  <item.icon className="w-4 h-4" />
                                  {state === "expanded" && !isMobile && <span className="capitalize font-medium text-sm">{item.title}</span>}
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isOpen[item.title] ? "rotate-90" : "rotate-0"}`} />
                              </div>
                            </Link>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {item.children &&
                            item.children.map((child, index) => (
                              <SidebarMenuSub key={`${child.title}${index}`}>
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton asChild className="flex items-center">
                                    <Link to={child.url}>
                                      <div className="flex items-center gap-2">
                                        <child.icon className="w-4 h-4 inline" />
                                        {state === "expanded" && !isMobile && <span className="capitalize text-sm">{child.title}</span>}
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
                          {state === "expanded" && !isMobile && <span className="capitalize font-medium text-sm">{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </CNSidebar>
  );
};
export default Sidebar;
