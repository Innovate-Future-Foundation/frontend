import * as React from "react";
import { BeatLoader } from "react-spinners";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  PaginationState,
  getExpandedRowModel,
  ExpandedState,
  Updater
} from "@tanstack/react-table";
import { ChevronDown, CircleOff, Filter, Search } from "lucide-react";
import { debounce } from "lodash";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Pagenation from "@/components/Pagenation";
import { TableBaseType } from "@/types/tablebase";
import { Card } from "../ui/card";
import clsx from "clsx";
import { getFiltersItems, getfilterTitle } from "@/constants/mapper";
import { useCallback, useEffect, useMemo } from "react";
import { DEBOUNCE_TIME_MS } from "@/constants/appConfig";
import { useAuth } from "@/hooks/useAuth";

interface DataTableProps<T extends object> {
  columns: ColumnDef<T>[];
  data: TableBaseType<T>[];
  searchPlaceholder: string;
  isLoading: boolean;
  locationListType?: LocationListType;
  totalItems?: number;
  limit?: number;
  columnFilters: ColumnFiltersState;
  setColumnFilters: (updaterOrValue: ColumnFiltersState | Updater<ColumnFiltersState>) => void;
  globalFilter: string;
  setGlobalFilter: (globalFilter: string) => void;
  sorting: SortingState;
  setSorting: (updaterOrValue: Updater<SortingState>) => void;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}
export type LocationListType = "cards" | "table";

const DataTable = <T extends object>({
  columns,
  data,
  searchPlaceholder,
  isLoading,
  locationListType = "table",
  totalItems = 0,
  limit = 1,
  columnFilters,
  setColumnFilters,
  globalFilter,
  setGlobalFilter,
  sorting,
  setSorting,
  pagination,
  setPagination,
  ...inputProps
}: DataTableProps<T>) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const { role } = useAuth();
  const table = useReactTable<TableBaseType<T>>({
    data,
    columns,
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getSubRows: row => row.children,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
      pagination,
      expanded
    },
    rowCount: totalItems,
    pageCount: Math.ceil(totalItems / limit),
    manualPagination: true,
    manualFiltering: true
  });

  const debounceSearchChange = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(String(event.target.value));
      }, DEBOUNCE_TIME_MS),
    [setGlobalFilter]
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      debounceSearchChange(event);
    },
    [debounceSearchChange]
  );

  const getDropdownItems = (filterId: string): string[] => {
    const res = getFiltersItems[filterId];
    if (Array.isArray(res)) {
      return res;
    } else if (res && typeof res === "object") {
      return res[role as keyof typeof res] ?? [];
    }
    return [];
  };

  useEffect(() => {
    return () => {
      debounceSearchChange.cancel();
    };
  }, [debounceSearchChange]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <BeatLoader className="text-primary" />
      </div>
    );
  }

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
                    {getfilterTitle[filteredColumn.id]}
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
                  {getDropdownItems(filteredColumn.id).map(filterData => (
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
          <Input placeholder={searchPlaceholder} onChange={handleSearchChange} className="max-w-sm pl-10 h-8 text-sm w-96" {...inputProps} />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={14} />
          </span>
        </div>
      </div>
      {/* Table */}
      {locationListType === "table" && (
        <div className="rounded-t-md overflow-hidden">
          <Table>
            <TableHeader className="bg-accent">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="border-none ">
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead className="text-primary-foreground50 text-sm " key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={clsx(
                      `${row.depth != 0 && "bg-accent border-none text-primary-foreground60 hover:bg-secondary-green hover:text-secondary-foregroundGreen data-[state=selected]:text-secondary-foregroundGreen data-[state=selected]:bg-secondary-green"}`
                    )}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell className="h-18 font-medium" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="py-4 text-center text-primary-foreground50">
                    <div className=" w-full mb-2 flex items-center justify-center">
                      <CircleOff className="inline-block" />
                    </div>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-primary-foreground50">
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
          </div>
        </div>
      )}
      {/* cards */}
      {locationListType === "cards" && (
        <div className="rounded-md mb-4">
          <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <Card
                  key={row.id}
                  className={
                    "w-full border-primary-light rounded-md overflow-hidden hover:scale-102 hover:-translate-y-1 hover:shadow-md transition-all duration-200 ease-out hover:bg-accent"
                  }
                >
                  {row.getVisibleCells().map(cell => {
                    return <div key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>;
                  })}
                </Card>
              ))
            ) : (
              <div className="h-24 text-center">No results.</div>
            )}
          </div>
        </div>
      )}
      <Pagenation
        currentPage={table.getState().pagination.pageIndex + 1}
        totalItems={totalItems}
        itemsPerPage={limit}
        setPageIndex={table.setPageIndex}
        handlePrev={table.previousPage}
        getCanPreviousPage={table.getCanPreviousPage}
        handleNext={table.nextPage}
        getCanNextPage={table.getCanNextPage}
      />
    </div>
  );
};

export default DataTable;
