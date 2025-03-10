import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Baby, ChevronsLeftRight, Loader2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import AppAvatar from "@/components/Avatar";
import AppDropdown, { DropdownMenuItemType } from "@/components/Dropdown";
import { abbreviateName, formatDateToDDMMYYYY } from "@/utils/formatters";
import { Profile, ProfileInfo, ProfilePathType } from "@/types";
import clsx from "clsx";
import { getColorStyleByIsActive, getColorStyleByIsConfirmed } from "@/constants/mapper";
import { Tooltip } from "@/components/Tooltip";
import { NavigateFunction } from "react-router-dom";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
interface GenerateColumnsOptions {
  profilePath?: ProfilePathType;
  hideRole?: boolean;
  hideOrganisation?: boolean;
  navigate?: NavigateFunction;
  mutation?: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    {
      id: string;
      bodyData: ProfileInfo;
    },
    unknown
  >;
}

export const profileColumns = ({
  profilePath = "contacts",
  hideRole = false,
  hideOrganisation = false,
  navigate,
  mutation
}: GenerateColumnsOptions): ColumnDef<Profile>[] => {
  const baseColumns: ColumnDef<Profile>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} aria-label="Select row" />,
      enableSorting: false,
      enableHiding: false,
      enableColumnFilter: false,
      enableGlobalFilter: false
    },
    {
      accessorKey: "name",
      header: ({ column, table }) => (
        <div className="flex gap-2 items-center">
          {profilePath === "parents" && (
            <Button variant="ghost" onClick={table.getToggleAllRowsExpandedHandler()}>
              <ChevronsLeftRight className={`w-4 h-4 transition-transform duration-200 ${table.getIsAllRowsExpanded() ? "rotate-90" : "rotate-0"}`} />
            </Button>
          )}
          <Button className="pl-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex">
            {!row.getCanExpand() && row.depth != 0 ? (
              <div className="mx-4 flex items-center">
                <Baby size={16} />
              </div>
            ) : (
              row.getCanExpand() && (
                <Button variant="ghost" className="cursor-pointer" onClick={row.getToggleExpandedHandler()}>
                  <ChevronsLeftRight className={`w-4 h-4 transition-transform duration-200 ${row.getIsExpanded() ? "rotate-90" : "rotate-0"}`} />
                </Button>
              )
            )}
            <Badge variant="outline" className="rounded-full pl-[2px] bg-background">
              <AppAvatar
                avatarLink={row.original.avatarUrl ?? ""}
                avatarAlt="@InnovateFuture"
                avatarPlaceholder={abbreviateName(row.getValue("name"))}
                size={7}
              />
              <div className="ml-1 lowercase truncate max-w-20">{row.getValue("name")}</div>
            </Badge>
          </div>
        );
      },
      enableColumnFilter: false
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <Tooltip className="lowercase" content={row.getValue("email")}>
          <div className="lowercase truncate max-w-40 cursor-default">{row.getValue("email")}</div>
        </Tooltip>
      ),
      enableColumnFilter: false
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className={clsx(getColorStyleByIsActive.get(row.getValue("isActive")))}>
          {mutation?.isPending && row.original.id === mutation?.variables.id ? (
            <Loader2 className="h-2 w-2 animate-spin" />
          ) : (
            <div className="capitalize">{row.getValue("isActive") ? "active" : "suspended"}</div>
          )}
        </Badge>
      ),
      enableGlobalFilter: false
    },
    {
      accessorKey: "isConfirmed",
      header: "Invitation",
      cell: ({ row }) => (
        <Badge variant="secondary" className={clsx(getColorStyleByIsConfirmed.get(row.getValue("isConfirmed")))}>
          <div className="capitalize">{row.getValue("isConfirmed") ? "accepted" : "pending"}</div>
        </Badge>
      ),
      enableGlobalFilter: false
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button className="pl-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created At
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{formatDateToDDMMYYYY(row.getValue("createdAt"))}</div>,
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.original.createdAt ?? "").getTime();
        const dateB = new Date(rowB.original.createdAt ?? "").getTime();
        return dateA - dateB;
      },
      enableColumnFilter: false,
      enableGlobalFilter: false
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <Button className="pl-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Updated At
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{formatDateToDDMMYYYY(row.getValue("updatedAt"))}</div>,
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.original.updatedAt ?? "").getTime();
        const dateB = new Date(rowB.original.updatedAt ?? "").getTime();
        return dateA - dateB;
      },
      enableColumnFilter: false,
      enableGlobalFilter: false
    }
  ];

  if (!hideRole) {
    baseColumns.push({
      accessorKey: "RoleCode",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="secondary">
          <div className="capitalize">{row.getValue("RoleCode")}</div>
        </Badge>
      ),
      enableGlobalFilter: false
    });
  }

  if (!hideOrganisation) {
    baseColumns.push({
      accessorKey: "org.orgName",
      header: "Organisation",
      cell: ({ row }) => <div className="capitalize truncate max-w-40">{row.original.organisation?.orgName}</div>,
      enableColumnFilter: false
    });
  }

  baseColumns.push({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const detail = row.original;

      const handleOperateDetail = ({ detail }: { detail: Profile }) => {
        const path = `${detail.id}`;
        navigate?.(path);
      };

      const handleSuspend = (detail: Profile) => {
        mutation?.mutate?.({ id: detail.id ?? "", bodyData: { isActive: false } });
      };

      const handleActivate = (detail: Profile) => {
        mutation?.mutate?.({ id: detail.id ?? "", bodyData: { isActive: true } });
      };

      const menuItems: DropdownMenuItemType<Profile>[] = [
        {
          label: "Edit",
          onClick: () => handleOperateDetail({ detail })
        }
      ];
      if (row.getValue("isActive")) {
        menuItems.push({
          label: "Suspend",
          onClick: () => handleSuspend(detail),
          className: "text-destructive"
        });
      } else {
        menuItems.push({
          label: "Activate",
          onClick: () => handleActivate(detail),
          className: "text-secondary-foregroundGreen"
        });
      }

      return (
        <AppDropdown<Profile> item={detail} menuItems={menuItems}>
          <Button variant="ghost" className={clsx(`h-8 w-8 p-0`)}>
            <span className={clsx(`sr-only`)}>Open menu</span>
            <MoreHorizontal />
          </Button>
        </AppDropdown>
      );
    },
    enableColumnFilter: false,
    enableGlobalFilter: false
  });

  return baseColumns;
};
