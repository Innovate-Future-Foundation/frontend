import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleOff, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import AppAvatar from "@/components/Avatar";
import { abbreviateName, formatDateToDDMMYYYY } from "@/utils/formatters";
import { Organisation, OrgStatusCode, SubscriptionCode } from "@/types";
import Dropdown from "@/components/Dropdown";
import Avatar from "@/components/Avatar";
import { getColorStyleByStatus, getImageBySubscription } from "@/constants/mapper";
import clsx from "clsx";
import { Tooltip } from "@/components/Tooltip";
import { NavigateFunction } from "react-router-dom";

export const getOrgColumns = (navigate?: NavigateFunction): ColumnDef<Organisation>[] => {
  return [
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
      accessorKey: "orgName",
      header: ({ column }) => (
        <Button className="pl-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Organisation
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Button
          variant="outline"
          className="rounded-full pl-[2px]"
          onClick={() => {
            const websiteUrl = row.original.websiteUrl;

            if (websiteUrl) {
              window.open(websiteUrl, "_blank");
            } else {
              console.warn("Website URL is not available for this row.");
            }
          }}
        >
          <AppAvatar avatarLink={row.original.logoUrl ?? ""} avatarAlt="@InnovateFuture" avatarPlaceholder={abbreviateName(row.getValue("orgName"))} size={7} />
          <div className="ml-1 lowercase truncate max-w-20">{row.getValue("orgName")}</div>
        </Button>
      ),
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
      accessorKey: "subscriptionCode",
      header: "Subscription",
      cell: ({ row }) => (
        <>
          {row.getValue("subscriptionCode") === "UndefinedSubscription" ? (
            <div className="capitalize mx-2 text-primary-foreground60">
              <CircleOff size={14} />
            </div>
          ) : (
            <Badge variant="secondary" className="text-muted-foreground bg-muted px-1">
              <div className="capitalize mr-1">{row.getValue("subscriptionCode") as SubscriptionCode}</div>
              <Avatar
                avatarLink={getImageBySubscription[row.getValue("subscriptionCode") as SubscriptionCode]}
                avatarPlaceholder={abbreviateName(row.getValue("subscriptionCode"))}
                size={4}
              />
            </Badge>
          )}
        </>
      ),
      enableGlobalFilter: false
    },
    {
      accessorKey: "orgStatusCode",
      header: "Status",
      cell: ({ row }) => (
        <>
          {row.getValue("orgStatusCode") === "UndefinedOrgStatus" ? (
            <div className="capitalize mx-2 text-primary-foreground60">
              <CircleOff size={14} />
            </div>
          ) : (
            <Badge variant="outline" className={clsx(getColorStyleByStatus[row.getValue("orgStatusCode") as OrgStatusCode])}>
              <div className="capitalize">{row.getValue("orgStatusCode")}</div>
            </Badge>
          )}
        </>
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
        const organisationDetail = row.original;

        const handleOperateDetail = ({ organisationDetail }: { organisationDetail: Organisation }) => {
          const path = `${organisationDetail.id}`;
          navigate?.(path);
        };

        const handleDelete = (organisation: Organisation) => {
          console.log("id about to delete: ", organisation.id);
        };

        const menuItems = [
          {
            label: "Edit",
            onClick: () => handleOperateDetail({ organisationDetail })
          },
          {
            label: "Delete",
            onClick: handleDelete,
            className: "text-destructive"
          }
        ];

        return (
          <Dropdown<Organisation> item={organisationDetail} menuItems={menuItems}>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </Dropdown>
        );
      },
      enableColumnFilter: false,
      enableGlobalFilter: false
    }
  ];
};
