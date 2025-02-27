import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { formatDateToMMDDYY, formatTimeAgo } from "@/utils/formatters";
import { Tour } from "@/types";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, CalendarDays, MapPinCheckInside, MoreHorizontal, Smartphone } from "lucide-react";
import clsx from "clsx";
import Dropdown from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import { NavigateFunction } from "react-router-dom";

export const getToursColumns = (navigate?: NavigateFunction): ColumnDef<Tour>[] => {
  return [
    {
      accessorKey: "statusCode",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div className="p-1">
            <div
              className={clsx(`relative rounded-md flex justify-between p-1 w-full h-20 bg-cover bg-center`)}
              style={{ backgroundImage: row.original.coverImgUrl ? `url(${row.original.coverImgUrl})` : "none" }}
            >
              <div className="absolute text-foreground bg-background/70 flex gap-1 rounded-sm text-[10px] justify-center items-center px-1">
                {row.original.studentTourEnrollments?.length} <p>Enrolled</p> <BadgeCheck size={10} />
              </div>
              <Badge variant={"secondary"} className="absolute right-1 top-[60px] text-[8px] bg-secondary-green text-secondary-foregroundGreen">
                {row.original.statusCode ?? ""}
              </Badge>
            </div>
            <Separator className="bg-background" />
          </div>
        );
      },
      enableGlobalFilter: false
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className={clsx(`flex gap-2 items-center ml-3 mt-1`)}>
          <div className="text-sm truncate max-w-100 flex items-center gap-2 font-semibold">{row.getValue("title")}</div>
        </div>
      ),
      enableColumnFilter: false
    },
    {
      accessorKey: "comment",
      header: "Comment",
      cell: ({ row }) => (
        <div className={clsx(`flex gap-2 items-center ml-3 mt-0 mb-8`)}>
          <div className="lowercase text-xs truncate max-w-100 flex items-center gap-2 text-primary-foreground50">{row.getValue("comment")}</div>
        </div>
      ),
      enableColumnFilter: false
    },
    {
      accessorKey: "orgName",
      header: "OrgName",
      cell: ({ row }) => (
        <div className={clsx(`flex gap-2 items-center m-2 ml-3 text-primary-foreground30`)}>
          <Smartphone size={14} />
          <Badge variant={"secondary"}>
            <div className="capitalize text-[10px] truncate max-w-60">{row.getValue("orgName")}</div>
          </Badge>
        </div>
      ),
      enableColumnFilter: false
    },
    {
      accessorKey: "days",
      header: "Days",
      cell: ({ row }) => (
        <div>
          <div className={clsx(`flex gap-2 items-center m-2 ml-3 text-primary-foreground30`)}>
            <MapPinCheckInside size={14} />
            <div className="capitalize text-[12px] truncate max-w-60">
              {row.original.days?.map(day => day.activities?.map(activity => activity.location) || []).join(", ")}
            </div>
          </div>
          {/* <div className="flex ">
          <div className={clsx(`flex gap-2 items-center m-3 text-[12px]`)}>
            Days:
            <div>{row.original.days?.length}</div>
          </div>
        </div> */}
        </div>
      ),
      enableColumnFilter: false,
      enableGlobalFilter: false
    },
    {
      accessorKey: "startDate",
      header: "StartDate",
      cell: ({ row }) => (
        <div className={clsx(`flex gap-2 items-center m-2 ml-3 text-primary-foreground30`)}>
          <CalendarDays size={14} />
          <div className="lowercase text-xs truncate max-w-100 flex items-center gap-2 ">
            {formatDateToMMDDYY(row.getValue("startDate"))} - {formatDateToMMDDYY(row.original.endTime ?? "")}
          </div>
        </div>
      ),
      enableColumnFilter: false,
      enableGlobalFilter: false
    },
    {
      accessorKey: "updatedAt",
      header: "UpdatedAt",
      cell: ({ row }) => (
        <div className={clsx(`items-center m-3 text-[10px] text-primary-foreground50 font-semibold`)}>
          Edit&nbsp;
          {formatTimeAgo(row.getValue("updatedAt"))}
          &nbsp;ago
        </div>
      ),
      enableColumnFilter: false,
      enableGlobalFilter: false
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const tourDetail = row.original;

        const handleOperateDetail = ({ tourDetail }: { tourDetail: Tour }) => {
          const path = `${tourDetail.id}`;
          navigate?.(path);
        };

        const handleDelete = (tour: Tour) => {
          console.log("id about to delete: ", tour.id);
        };

        const menuItems = [
          {
            label: "Edit",
            onClick: () => handleOperateDetail({ tourDetail })
          },
          {
            label: "Delete",
            onClick: handleDelete,
            className: "text-destructive"
          }
        ];

        return (
          <Dropdown<Tour> item={tourDetail} menuItems={menuItems}>
            <Button variant="ghost" className="absolute bottom-0 right-0">
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
