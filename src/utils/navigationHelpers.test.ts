import { describe, expect, it } from "vitest";
import { Building2 } from "lucide-react";

import { findbreadcrumbs } from "./navigationHelpers";
import { SidebarMenuGroup } from "@/pages/Dashboard/SidebarMenu";

describe("findbreadcrumbs", () => {
  const mockMenuGroups: SidebarMenuGroup[] = [
    {
      sidebarLabel: "Group 1",
      subMenu: [
        {
          sidebarItem: {
            url: "/home",
            title: "Home",
            children: [],
            icon: Building2
          },
          breadcrumbs: [{ label: "Home", href: "/home" }]
        },
        {
          sidebarItem: {
            url: "/about",
            title: "About",
            icon: Building2,
            children: [
              {
                url: "/about/team",
                title: "Team",
                icon: Building2
              }
            ]
          },
          breadcrumbs: [{ label: "About", href: "/about" }]
        }
      ]
    }
  ];

  it("should return breadcrumbs for an exact match", () => {
    const path = "/home";
    const expectedBreadcrumbs = [{ label: "Home", href: "/home" }];
    const result = findbreadcrumbs(mockMenuGroups, path);
    expect(result).toEqual(expectedBreadcrumbs);
  });

  it("should return breadcrumbs for a child match", () => {
    const path = "/about/team";
    const expectedBreadcrumbs = [
      { label: "About", href: "/about" },
      { label: "Team", href: "/about/team" }
    ];
    const result = findbreadcrumbs(mockMenuGroups, path);
    expect(result).toEqual(expectedBreadcrumbs);
  });

  it("should return default breadcrumbs when no match is found", () => {
    const path = "/contact";
    const expectedBreadcrumbs = [{ label: "/", href: "/dashboard" }];
    const result = findbreadcrumbs(mockMenuGroups, path);
    expect(result).toEqual(expectedBreadcrumbs);
  });
});
