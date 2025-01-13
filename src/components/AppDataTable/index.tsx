import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppPagenation from "../AppPagenation";
import { OrganisationType } from "@/types";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Filter, Search } from "lucide-react";
import { Input } from "../ui/input";
import { ITEMS_PER_PAGE } from "@/constants/appConfig";

const data: OrganisationType[] = [
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
  },
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
  },
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

interface AppDataTableProps {
  columns: ColumnDef<OrganisationType>[];
}
interface ColumnFilter {
  id: string;
  value: unknown;
}
type ColumnFiltersState = ColumnFilter[];

export type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

export type PaginationTableState = {
  pagination: PaginationState;
};

const AppDataTable: React.FC<AppDataTableProps> = ({ columns }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: ITEMS_PER_PAGE
  });
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable<OrganisationType>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
      pagination
    },
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: false
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        {/* Filters */}
        <div className="flex gap-2">
          {table
            .getAllColumns()
            .filter(column => column.getCanFilter())
            .map(filteredColumn => (
              <DropdownMenu key={filteredColumn.id}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto max-w-sm h-8 text-xs capitalize">
                    <Filter size={6} className="text-gray-500" />
                    {filteredColumn.id}
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuCheckboxItem
                    className="capitalize text-xs"
                    checked={table.getState().columnFilters.length === 0}
                    onClick={() => table.setColumnFilters([])}
                  >
                    all
                  </DropdownMenuCheckboxItem>
                  {[...new Set(data.map((row: any) => row[filteredColumn.id]))].map(filterData => (
                    <DropdownMenuCheckboxItem
                      key={filterData}
                      className="capitalize text-xs"
                      checked={table.getState().columnFilters.some(state => state.id === filteredColumn.id && state.value === filterData)}
                      onClick={() =>
                        table.setColumnFilters(prevFilters => [
                          ...prevFilters.filter(filter => filter.id != filteredColumn.id),
                          { id: filteredColumn.id, value: filterData }
                        ])
                      }
                    >
                      {filterData}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Input
            placeholder="search by name or email"
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={event => {
              setGlobalFilter(String(event.target.value));
            }}
            className="max-w-sm pl-10 h-8 text-sm w-96"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={14} />
          </span>
        </div>
      </div>

      {/* Table */}
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
      <AppPagenation
        currentPage={table.getState().pagination.pageIndex + 1}
        totalItems={table.getFilteredRowModel().rows.length}
        itemsPerPage={table.getState().pagination.pageSize}
        setPageIndex={table.setPageIndex}
        handlePrev={table.previousPage}
        getCanPreviousPage={table.getCanPreviousPage}
        handleNext={table.nextPage}
        getCanNextPage={table.getCanNextPage}
      />
    </div>
  );
};

export default AppDataTable;
