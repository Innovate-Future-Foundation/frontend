import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import AppAvatar from "@/components/Avatar";
import AppDropdown from "@/components/Dropdown";
import { abbreviateName, formatDateToDDMMYYYY } from "@/utils/formatters";
import { Profile } from "@/types";

export const teacherAdminColumns: ColumnDef<Profile>[] = [
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
        Teacher Name
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
    accessorKey: "org.orgName",
    header: "Organisation",
    cell: ({ row }) => <div className="capitalize truncate max-w-40">{row.original.org?.orgName}</div>,
    enableColumnFilter: false
  },
  {
    accessorKey: "invitedBy.name",
    header: "Invited By",
    cell: ({ row }) => <div className="capitalize truncate max-w-40">{row.original.invitedBy?.name}</div>,
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
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const teacherDetail = row.original;

      const handleOperateDetail = ({ teacherDetail, isEdit = false }: { teacherDetail: Profile; isEdit?: boolean }) => {
        console.log("teacherDetail: ", teacherDetail);
        console.log("isEdit", isEdit);
        const path = isEdit ? `teachers/${teacherDetail.profileId}/edit` : `teachers/${teacherDetail.profileId}`;
        window.location.href = path;
      };

      const handleDelete = (teacherDetail: Profile) => {
        console.log("teacherId about to delete: ", teacherDetail.profileId);
      };

      const menuItems = [
        {
          label: "View",
          onClick: () => handleOperateDetail({ teacherDetail })
        },
        {
          label: "Edit",
          onClick: () => handleOperateDetail({ teacherDetail, isEdit: true })
        },
        {
          label: "Delete",
          onClick: handleDelete,
          className: "text-destructive"
        }
      ];

      return (
        <AppDropdown<Profile> item={teacherDetail} menuItems={menuItems}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </AppDropdown>
      );
    },
    enableColumnFilter: false,
    enableGlobalFilter: false
  }
];
