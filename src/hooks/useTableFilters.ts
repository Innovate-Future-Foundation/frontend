import { useState, useMemo, useCallback } from "react";
import { ColumnFiltersState, PaginationState, SortingState, Updater } from "@tanstack/react-table";
import { ITEMS_PER_PAGE } from "@/constants/appConfig";
import { ProfilePaginationFilter, ProfilePaginationOrderByType } from "@/types";
import { mapStringToBoolean } from "@/constants/mapper";

export const useTableFilters = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: ITEMS_PER_PAGE
  });
  const [globalFilter, setGlobalFilter] = useState("");

  // Calculate offset for pagination
  const offset = useMemo(() => pagination.pageIndex * pagination.pageSize, [pagination]);

  // Convert filters to API format
  const filters: ProfilePaginationFilter | undefined = useMemo(() => {
    const result: Partial<ProfilePaginationFilter> = Object.fromEntries(
      columnFilters.map(({ id, value }) => {
        const booleanValue = mapStringToBoolean(id, value as string);
        return [id, booleanValue];
      })
    );

    if (globalFilter) {
      result["nameOrEmailOrPhone"] = globalFilter;
    }
    return result as ProfilePaginationFilter;
  }, [columnFilters, globalFilter]);

  // Convert sorting to API format
  const sortings = useMemo(
    () =>
      sorting.map(({ id, desc }) => ({
        orderBy: id as ProfilePaginationOrderByType,
        isAscending: !desc
      })),
    [sorting]
  );

  // Handlers to reset pagination index when filters/sorting change
  const handleChangeColumnFilters = useCallback((columnFilters: ColumnFiltersState | Updater<ColumnFiltersState>) => {
    setColumnFilters(columnFilters);
    setSorting([]);
    setPagination(prev => (prev.pageIndex !== 0 ? { ...prev, pageIndex: 0 } : prev));
  }, []);

  const handleChangeSearchFilters = useCallback((searchFilters: string) => {
    setGlobalFilter(searchFilters);
    setSorting([]);
    setPagination(prev => (prev.pageIndex !== 0 ? { ...prev, pageIndex: 0 } : prev));
  }, []);

  const handleChangeSortings = useCallback((columnSortings: Updater<SortingState>) => {
    setSorting(columnSortings);
    setPagination(prev => (prev.pageIndex !== 0 ? { ...prev, pageIndex: 0 } : prev));
  }, []);

  return {
    sorting,
    setSorting: handleChangeSortings,
    columnFilters,
    setColumnFilters: handleChangeColumnFilters,
    pagination,
    setPagination,
    globalFilter,
    setGlobalFilter: handleChangeSearchFilters,
    offset,
    filters,
    sortings
  };
};
