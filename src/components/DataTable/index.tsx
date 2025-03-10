import * as React from "react";
import { ClipLoader } from "react-spinners";
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
import { getFiltersItems, getfilterTitle } from "@/constants/mapper";
import { useCallback, useEffect, useMemo } from "react";
import { DEBOUNCE_TIME_MS } from "@/constants/appConfig";
import { useUserStore } from "@/store";

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
  const { role } = useUserStore();
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
    pageCount: Math.ceil(totalItems / limit),
    manualPagination: true,
    manualFiltering: true,
    paginateExpandedRows: false
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
                  <Button
                    variant="outline"
                    className="ml-auto max-w-sm h-10 text-xs tracking-wide font-normal capitalize shadow-none text-primary-foreground30 "
                  >
                    <Filter size={6} className="text-primary-foreground60 " />
                    {getfilterTitle[filteredColumn.id]}:
                    <p className="text-primary">{`${table.getState().columnFilters.filter(state => state.id === filteredColumn.id).length == 0 ? "all" : table.getState().columnFilters.find(state => state.id === filteredColumn.id)?.value}`}</p>
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuCheckboxItem
                    className="capitalize text-xs"
                    checked={table.getState().columnFilters.length === 0}
                    onClick={() =>
                      table.setColumnFilters(prev => {
                        return prev.filter(ele => ele.id !== filteredColumn.id);
                      })
                    }
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
          <Input placeholder={searchPlaceholder} onChange={handleSearchChange} className="max-w-sm pl-10 text-sm h-10 w-96 bg-background" {...inputProps} />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={16} />
          </span>
        </div>
      </div>
      {isLoading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <ClipLoader color="grey" />
        </div>
      ) : (
        <>
          {locationListType === "table" && (
            <div className="rounded-t-md overflow-hidden">
              <Table>
                <TableHeader className="bg-accent">
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id} className="border-none">
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
                <TableBody className="bg-background">
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map(row => (
                      <React.Fragment key={row.id}>
                        <TableRow data-state={row.getIsSelected() && "selected"}>
                          {row.getVisibleCells().map(cell => (
                            <TableCell className="h-18 font-medium" key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                        {row.getIsExpanded() &&
                          row.subRows.length > 0 &&
                          row.subRows.map(subRow => (
                            <TableRow
                              key={subRow.id}
                              data-state={subRow.getIsSelected() && "selected"}
                              className="bg-accent border-none text-primary-foreground60 hover:bg-secondary-green hover:text-secondary-foregroundGreen data-[state=selected]:text-secondary-foregroundGreen data-[state=selected]:bg-secondary-green"
                            >
                              {subRow.getVisibleCells().map(cell => (
                                <TableCell className="h-18 font-medium" key={cell.id}>
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                      </React.Fragment>
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
          {locationListType === "cards" && (
            <div className="rounded-md mb-4">
              <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <Card
                      key={row.id}
                      className={
                        "border bg-background relative w-full shadow-none rounded-lg overflow-hidden hover:scale-102 hover:-translate-y-1 hover:shadow-md transition-all duration-200 ease-out hover:bg-background hover:shadow-primary-light"
                      }
                    >
                      {row.getVisibleCells().map(cell => {
                        return <div key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>;
                      })}
                    </Card>
                  ))
                ) : (
                  <div className="col-span-4 text-sm flex flex-col gap-2 w-full mb-2 items-center justify-center text-center text-primary-foreground50">
                    <CircleOff className="inline-block" />
                    No results.
                  </div>
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
        </>
      )}
    </div>
  );
};

export default DataTable;
