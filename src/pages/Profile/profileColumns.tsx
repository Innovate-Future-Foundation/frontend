import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Baby, ChevronsLeftRight, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import AppAvatar from "@/components/Avatar";
import AppDropdown from "@/components/Dropdown";
import { abbreviateName, formatDateToDDMMYYYY } from "@/utils/formatters";
import { Profile, ProfilePathType } from "@/types";

interface GenerateColumnsOptions {
  profilePath?: ProfilePathType;
  hideRole?: boolean;
  hideOrganisation?: boolean;
}

export const profileColumns = ({ profilePath = "users", hideRole = false, hideOrganisation = false }: GenerateColumnsOptions): ColumnDef<Profile>[] => {
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
      cell: ({ row }) => <div className="lowercase truncate max-w-40">{row.getValue("email")}</div>,
      enableColumnFilter: false
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="secondary">
          <div className="capitalize">{row.getValue("isActive") ? "active" : "suspended"}</div>
        </Badge>
      ),
      enableGlobalFilter: false
    },
    {
      accessorKey: "isConfirmed",
      header: "Invitation comfirmation",
      cell: ({ row }) => (
        <Badge variant="secondary">
          <div className="capitalize">{row.getValue("isConfirmed") ? "accent" : "pending"}</div>
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
      accessorKey: "roleName",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="secondary">
          <div className="capitalize">{row.getValue("roleName")}</div>
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

      const handleOperateDetail = ({ detail, isEdit = false }: { detail: Profile; isEdit?: boolean }) => {
        const path = isEdit ? `${profilePath}/${detail.profileId}/edit` : `${profilePath}/${detail.profileId}`;
        window.location.href = path;
      };

      const handleDelete = (detail: Profile) => {
        console.log("ID about to delete: ", detail.profileId);
      };

      const menuItems = [
        {
          label: "View",
          onClick: () => handleOperateDetail({ detail })
        },
        {
          label: "Edit",
          onClick: () => handleOperateDetail({ detail, isEdit: true })
        },
        {
          label: "Delete",
          onClick: () => handleDelete(detail),
          className: "text-destructive"
        }
      ];

      return (
        <AppDropdown<Profile> item={detail} menuItems={menuItems}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
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
