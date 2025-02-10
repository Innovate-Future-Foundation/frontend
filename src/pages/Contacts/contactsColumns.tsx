import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import Avatar from "@/components/Avatar";
import { abbreviateName } from "@/utils/formatters";
import { Profile, RoleType } from "@/types";
import { Separator } from "@/components/ui/separator";
import { CheckCheck, Dot, Mail, Smartphone, Tag } from "lucide-react";
import clsx from "clsx";
import { getColorStyleByRole } from "@/constants/mapper";

export const contactsColumns: ColumnDef<Profile>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div
          className={clsx(`flex flex-col ${row.getValue("isActive") ? "bg-secondary-light text-primary-foreground30" : "bg-accent text-primary-foreground60"}`)}
        >
          <div className="flex items-center gap-2 p-3 pb-0 justify-between">
            <div className="flex items-center gap-2">
              <Avatar avatarLink={row.original.avatarUrl ?? ""} avatarAlt="@InnovateFuture" avatarPlaceholder={abbreviateName(row.getValue("name"))} size={8} />
              <div className="capitalize text-sm truncate max-w-40 font-semibold">{row.getValue("name")}</div>
            </div>

            {!row.getValue("isActive") ? (
              <Badge variant={"outline"} className="text-primary-foreground60">
                suspended
              </Badge>
            ) : (
              ""
            )}
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
      <div className={clsx(`flex gap-2 items-center m-3 ${!row.getValue("isActive") ? "text-primary-foreground60" : "text-primary-foreground30"}`)}>
        <Mail size={16} />
        <div className="text-sm lowercase truncate max-w-100 flex items-center gap-2">
          {row.getValue("email")}
          {row.getValue("isConfirmed") ? (
            <CheckCheck size={16} className={clsx(`${row.getValue("isActive") ? "text-secondary-foregroundGreen" : "text-primary-foreground60"}`)} />
          ) : (
            ""
          )}
        </div>
      </div>
    ),
    enableColumnFilter: false
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className={clsx(`flex gap-2 items-center m-3 ${!row.getValue("isActive") ? "text-primary-foreground60" : "text-primary-foreground30"}`)}>
        <Smartphone size={16} />
        <div className="text-sm lowercase truncate max-w-40">{row.getValue("phone")}</div>
      </div>
    ),
    enableColumnFilter: false
  },
  {
    accessorKey: "isActive",
    header: "orgStatusCode",
    cell: "",
    enableGlobalFilter: false,
    enableColumnFilter: false
  },
  {
    accessorKey: "isConfirmed",
    header: "invitation confirmation",
    cell: "",
    enableGlobalFilter: false,
    enableColumnFilter: false
  },
  {
    accessorKey: "roleCode",
    header: "Role",
    cell: ({ row }) => (
      <div className={clsx(`flex gap-2 items-center m-3 ${!row.getValue("isActive") ? "text-primary-foreground60" : "text-primary-foreground30"}`)}>
        <Tag size={16} />
        <Badge
          variant={"secondary"}
          className={clsx(
            `${!row.getValue("isActive") ? "bg-muted text-primary-foreground60" : getColorStyleByRole[row.getValue("roleCode") as RoleType]} flex items-center py-0 px-2 rounded-full`
          )}
        >
          <Dot className="-m-1 -mx-1 -ml-3" />
          <div className="lowercase truncate max-w-40">{row.getValue("roleCode")}</div>
        </Badge>
      </div>
    ),
    enableGlobalFilter: false
  }
];
