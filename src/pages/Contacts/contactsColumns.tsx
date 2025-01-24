import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import Avatar from "@/components/Avatar";
import { abbreviateName } from "@/utils/formatters";
import { Profile } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Mail, Smartphone, Tag } from "lucide-react";

export const contactsColumns: ColumnDef<Profile>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 p-3 pb-0">
            <Avatar avatarLink={row.original.avatarLink ?? ""} avatarAlt="@InnovateFuture" avatarPlaceholder={abbreviateName(row.getValue("name"))} size={8} />
            <div className="capitalize text-sm truncate max-w-40 font-semibold">{row.getValue("name")}</div>
          </div>
          <Separator className="my-4" />
        </div>
      );
    },
    enableColumnFilter: false
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center m-3 mt-0">
        <Mail size={16} />
        <div className="text-sm lowercase truncate max-w-100">{row.getValue("email")}</div>
      </div>
    ),
    enableColumnFilter: false
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center m-3">
        <Smartphone size={16} />
        <div className="text-sm lowercase truncate max-w-40">{row.getValue("phone")}</div>
      </div>
    ),
    enableColumnFilter: false
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: "",
    enableGlobalFilter: false
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center m-3">
        <Tag size={16} />
        <Badge variant={"outline"}>
          <div className="lowercase truncate max-w-40">{row.getValue("role")}</div>
        </Badge>
      </div>
    ),
    enableGlobalFilter: false
  }
];
