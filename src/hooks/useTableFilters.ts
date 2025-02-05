import { useState, useMemo, useCallback } from "react";
import { ColumnFiltersState, PaginationState, SortingState, Updater } from "@tanstack/react-table";
import { ITEMS_PER_PAGE } from "@/constants/appConfig";
import { mapStringToBoolean } from "@/constants/mapper";

interface UseTableFiltersProps {
  filterMapper?: (id: string, value: string) => [string, any];
}
export const useTableFilters = <T extends Record<string, any>, U extends string>({ filterMapper = mapStringToBoolean }: UseTableFiltersProps = {}) => {
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
  const filters: Partial<T> = useMemo(() => {
    const result = Object.fromEntries(columnFilters.map(({ id, value }) => filterMapper(id, value as string))) as Partial<T>;

    if (globalFilter) {
      (result as any)["nameOrEmailOrPhone"] = globalFilter;
    }

    return result;
  }, [columnFilters, globalFilter, filterMapper]);

  // Convert sorting to API format
  const sortings = useMemo(
    () =>
      sorting.map(({ id, desc }) => ({
        orderBy: id as U,
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
