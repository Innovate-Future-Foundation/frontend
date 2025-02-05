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
        <div className="flex flex-col bg-secondary-light">
          <div className="flex items-center gap-2 p-3 pb-0">
            <Avatar avatarLink={row.original.avatarUrl ?? ""} avatarAlt="@InnovateFuture" avatarPlaceholder={abbreviateName(row.getValue("name"))} size={8} />
            <div className="capitalize text-primary-foreground30 text-sm truncate max-w-40 font-semibold">{row.getValue("name")}</div>
          </div>
          <Separator className="mt-2 bg-background h-1" />
        </div>
      );
    },
    enableColumnFilter: false
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center m-3 mt-2 text-primary-foreground30">
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
      <div className="flex gap-2 items-center m-3 text-primary-foreground30">
        <Smartphone size={16} />
        <div className="text-sm lowercase truncate max-w-40">{row.getValue("phone")}</div>
      </div>
    ),
    enableColumnFilter: false
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: "",
  //   enableGlobalFilter: false
  // },
  {
    accessorKey: "roleName",
    header: "Role",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center m-3 text-primary-foreground30">
        <Tag size={16} />
        <Badge variant={"secondary"} className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-secondary-foreground"></div>
          <div className="lowercase truncate max-w-40">{row.getValue("roleName")}</div>
        </Badge>
      </div>
    ),
    enableGlobalFilter: false
  }
];
