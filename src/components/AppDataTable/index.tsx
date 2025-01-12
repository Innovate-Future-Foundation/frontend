import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppPagenation from "../AppPagenation";
import { abbreviateName, ellipticalString, formatDateToDDMMYYYY } from "@/utils/formatters";
import { Badge } from "../ui/badge";
import AppAvatar from "../AppAvatar";

const data: Organisation[] = [
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    orgName: "Acme Corporation",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.acmecorp.com",
    address: "123 Main Street, Springfield, USA",
    email: "info@acmecorp.com",
    subscription: "Premium",
    status: "pending",
    createdAt: "2023-12-10T12:34:56Z",
    updatedAt: "2023-12-06T22:20:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae8",
    orgName: "Globex Corporation",
    logoUrl: null,
    websiteUrl: "https://www.globex.com",
    address: "456 Elm Street, Metropolis, USA",
    email: "contact@globex.com",
    subscription: "Basic",
    status: "deactivated",
    createdAt: "2023-12-09T15:00:00Z",
    updatedAt: "2023-12-06T22:21:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae9",
    orgName: "Initech",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.initech.com",
    address: "789 Oak Avenue, Gotham, USA",
    email: "support@initech.com",
    subscription: "Free",
    status: "suspended",
    createdAt: "2023-12-08T10:15:30Z",
    updatedAt: "2023-12-06T22:22:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90aea",
    orgName: "Umbrella Corporation",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.umbrella.com",
    address: "321 Willow Lane, Racoon City, USA",
    email: "info@umbrella.com",
    subscription: "Premium",
    status: "verified",
    createdAt: "2023-12-07T08:45:00Z",
    updatedAt: "2023-12-06T22:23:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90aeb",
    orgName: "Hooli",
    logoUrl: null,
    websiteUrl: "https://www.hooli.com",
    address: "654 Maple Road, Silicon Valley, USA",
    email: "contact@hooli.com",
    subscription: "Basic",
    status: "pending",
    createdAt: "2023-12-06T22:30:00Z",
    updatedAt: "2023-12-06T22:24:00Z"
  }
];

export type Organisation = {
  orgId: string;
  orgName: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  address: string | null;
  email: string | null;
  subscription: string | null;
  status: OrganisationStatus;
  createdAt: string;
  updatedAt: string;
};

export type OrganisationStatus = "pending" | "verified" | "suspended" | "deactivated";

export const columns: ColumnDef<Organisation>[] = [
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
    enableColumnFilter: false
  },
  {
    accessorKey: "orgName",
    header: ({ column }) => {
      return (
        <Button className="pl-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Organisation
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded-full pl-[2px]">
        <AppAvatar avatarLink={row.original.logoUrl ?? ""} avatarAlt={"@InnovateFuture"} avaterPlaceholder={abbreviateName(row.getValue("orgName"))} size={7} />
        <div className="ml-1 lowercase">{ellipticalString(row.getValue("orgName"), 15)}</div>
      </Badge>
    ),
    enableColumnFilter: false
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{ellipticalString(row.getValue("email"), 20)}</div>,
    enableColumnFilter: false
  },
  {
    accessorKey: "subscription",
    header: "Subscription",
    cell: ({ row }) => <div className="capitalize">{row.getValue("subscription")}</div>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="secondary">
        <div className="capitalize">{row.getValue("status")}</div>
      </Badge>
    )
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button className="pl-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created At
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{formatDateToDDMMYYYY(row.getValue("createdAt"))}</div>,
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.createdAt).getTime();
      const dateB = new Date(rowB.original.createdAt).getTime();
      return dateA - dateB;
    },
    enableColumnFilter: false
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button className="pl-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Updated At
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{formatDateToDDMMYYYY(row.getValue("updatedAt"))}</div>,
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.updatedAt).getTime();
      const dateB = new Date(rowB.original.updatedAt).getTime();
      return dateA - dateB;
    },
    enableColumnFilter: false
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const organisationDetail = row.original;

      const handleOperateDetail = ({ organisationDetail, isEdit = false }: { organisationDetail: Organisation; isEdit?: boolean }) => {
        console.log("organisationDetail: ", organisationDetail);
        console.log("isEdit", isEdit);
        // TODO: pass to organisation detail page
      };

      const handleDelete = (orgId: string) => {
        console.log("orgId about to delete: ", orgId);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleOperateDetail({ organisationDetail })}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOperateDetail({ organisationDetail, isEdit: true })}>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(organisationDetail.orgId)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableColumnFilter: false
  }
];

const AppDataTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection
    }
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2">
          {table
            .getAllColumns()
            .filter(column => column.getCanFilter())
            .map(filteredColumn => {
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      {filteredColumn.getIndex()}
                      <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* {filteredColumn
                      .map(column => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={value => column.toggleVisibility(!!value)}
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        );
                      })} */}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
        </div>
        <div className="relative">
          <Input
            placeholder="search"
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={event => table.getColumn("email")?.setFilterValue(event.target.value)}
            className="max-w-sm pl-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={18} />
          </span>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
      <AppPagenation />
    </div>
  );
};

export default AppDataTable;
