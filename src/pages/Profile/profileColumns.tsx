import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
  includeChildren?: boolean;
}

export const profileColumns = ({
  profilePath = "orgstuffs",
  hideRole = false,
  hideOrganisation = false,
  includeChildren = false
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
      header: ({ column }) => (
        <Button className="pl-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="outline" className="rounded-full pl-[2px]">
          <AppAvatar avatarLink={row.original.avatarLink ?? ""} avatarAlt="@InnovateFuture" avatarPlaceholder={abbreviateName(row.getValue("name"))} size={7} />
          <div className="ml-1 lowercase truncate max-w-20">{row.getValue("name")}</div>
        </Badge>
      ),
      enableColumnFilter: false
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="lowercase truncate max-w-40">{row.getValue("email")}</div>,
      enableColumnFilter: false
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="secondary">
          <div className="capitalize">{row.getValue("status")}</div>
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
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="secondary">
          <div className="capitalize">{row.getValue("role")}</div>
        </Badge>
      ),
      enableGlobalFilter: false
    });
  }

  if (!hideOrganisation) {
    baseColumns.push({
      accessorKey: "org.orgName",
      header: "Organisation",
      cell: ({ row }) => <div className="capitalize truncate max-w-40">{row.original.org?.orgName}</div>,
      enableColumnFilter: false
    });
  }

  if (includeChildren) {
    //TODO: expand for parent
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
