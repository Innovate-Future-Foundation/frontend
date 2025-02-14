import { ChevronRight, ChevronsUpDown, LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
import Avatar from "@/components/Avatar";
import { SidebarheaderAccess } from "./SidebarMenu";
import clsx from "clsx";

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
  icon: LucideIcon | string;
  children?: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarItemGroups, sidebarheader }) => {
  const { state, isMobile } = useSidebar();
  const path = useLocation().pathname;
  const hasChildrenWithTitle = sidebarItemGroups.reduce((groupAcc: Record<string, boolean>, sidebarItemGroup: SidebarItemGroup) => {
    sidebarItemGroup.items.forEach(item => {
      if (item.children) {
        groupAcc[item.title] = true;
      }
    });
    return groupAcc;
  }, {});

  return (
    <CNSidebar collapsible="icon" variant="sidebar" className={clsx(`mt-12 ${state === "expanded" && !isMobile && "p-2 px-4"} bg-background`)}>
      {sidebarheader && (
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-auto bg-accent border hover:bg-secondary-light" size={"lg"}>
                <Link to={sidebarheader.url ?? ""}>
                  <div className="w-full flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar
                        size={8}
                        className="inline-block"
                        avatarLink={"https://github.com/shadcn.png"}
                        avatarAlt={"@AcmeCorporation"}
                        avatarPlaceholder={"AC"}
                      />
                      {
                        <div className="flex flex-col items-start gap-[2px]">
                          <p className="text-primary-foreground30 font-bold text-sm leading-3 truncate max-w-40">{"Acme Corporation"}</p>
                          <p className="text-primary-foreground50 text-[12px] leading-3 truncate max-w-40">{"info@acmecorp.com"}</p>
                        </div>
                      }
                    </div>
                    <ChevronsUpDown size={14} className="text-primary-foreground30" />
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
            {sidebarItemGroup.sidebarLabel && (
              <SidebarGroupLabel className="text-primary-foreground60 dark:text-foreground font-medium">{sidebarItemGroup.sidebarLabel}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="dark:text-foreground text-primary-foreground30">
                {sidebarItemGroup.items.map((item, index) =>
                  item.children ? (
                    <Collapsible
                      disabled
                      open={hasChildrenWithTitle[item.title]}
                      className={clsx(
                        `${item.children.some(child => path.includes(child.url)) && "bg-secondary rounded-lg border-primary-light"} pb-2 group collapsible blur:bg-secondary hover:bg-secondary hover:rounded-lg hover:border-primary-light`
                      )}
                      key={`${item.title}${index}`}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            className={clsx(`${item.children.some(child => path.includes(child.url)) && "text-secondary-foreground"} py-4`)}
                          >
                            <Link to={item.url}>
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                  <item.icon className="w-4 h-4" />
                                  {(state === "expanded" || isMobile) && <span className="capitalize font-medium text-sm">{item.title}</span>}
                                </div>
                                <ChevronRight
                                  className={`w-4 h-4 transition-transform duration-200 ${hasChildrenWithTitle[item.title] ? "rotate-90" : "rotate-0"}`}
                                />
                              </div>
                            </Link>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {item.children &&
                            item.children.map((child, index) => (
                              <SidebarMenuSub key={`${child.title}${index}`}>
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton
                                    asChild
                                    className={clsx(
                                      `${path.includes(child.url) && "bg-primary-light border-primary-light text-secondary-foreground"} flex items-center py-4 hover:bg-primary-light hover:text-secondary-foreground`
                                    )}
                                  >
                                    <Link to={child.url}>
                                      <div className="flex items-center gap-2">
                                        <div className={clsx("w-3 h-3 rounded-sm", child.icon)}></div>
                                        {<span className="capitalize font-medium text-sm">{child.title}</span>}
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
                      <SidebarMenuButton
                        asChild
                        className={clsx(`${
                          (item.url === "/dashboard" && path === "/dashboard") || (item.url !== "/dashboard" && path.includes(item.url))
                            ? "bg-secondary border-primary-light text-secondary-foreground"
                            : ""
                        } 
  py-4 hover:bg-secondary hover:border-primary-light hover:text-secondary-foreground`)}
                      >
                        <Link to={item.url}>
                          <item.icon className="w-5 h-5" />
                          {<span className="capitalize font-medium text-sm">{item.title}</span>}
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
