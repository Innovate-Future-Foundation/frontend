import DataTable from "@/components/DataTable";
import { orgColumns } from "./orgColumns";
import ContentLayout from "@/layouts/ContentLayout";
import { Building2 } from "lucide-react";
import { useOrganisation } from "@/hooks/useOrganisation";
import { useCallback, useMemo, useState } from "react";
import { Organisation, OrganisationPaginationFilter, OrganisationPaginationOrderByType, TableBaseType } from "@/types";
import { ColumnFiltersState, PaginationState, SortingState, Updater } from "@tanstack/react-table";
import { ITEMS_PER_PAGE } from "@/constants/appConfig";
import { mapStringToEnum } from "@/constants/mapper";

const OrganisationPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: ITEMS_PER_PAGE
  });
  const [globalFilter, setGlobalFilter] = useState("");

  /**
   * Convert format for request
   */
  const offset = useMemo(() => pagination.pageIndex * pagination.pageSize, [pagination]);

  const filters: OrganisationPaginationFilter | undefined = useMemo(() => {
    console.log("columnFilters", columnFilters);

    const result: Partial<OrganisationPaginationFilter> = Object.fromEntries(
      columnFilters.map(({ id, value }) => {
        const enumValue = mapStringToEnum(id, value as string);
        return [id, enumValue !== undefined ? enumValue : value];
      })
    );

    if (globalFilter) {
      result["orgNameOrEmail"] = globalFilter;
    }

    console.log("result", result);
    return result as OrganisationPaginationFilter;
  }, [columnFilters, globalFilter]);

  const sortings = useMemo(
    () =>
      sorting.map(({ id, desc }) => {
        return {
          orderBy: id as OrganisationPaginationOrderByType,
          isAscending: !desc
        };
      }),
    [sorting]
  );

  /**
   * reset pagination index to 0 when filters/sortings update
   * reset sortings and pagination index when filters update
   */
  const handleChangeColumnFilters = useCallback((columnFilters: ColumnFiltersState | Updater<ColumnFiltersState>) => {
    setColumnFilters(columnFilters);
    setSorting([]);
    setPagination(prev => {
      if (prev.pageIndex != 0) {
        return {
          ...prev,
          pageIndex: 0
        };
      }
      return prev;
    });
  }, []);

  const handleChangeSearchFilters = useCallback((searchFilters: string) => {
    setGlobalFilter(searchFilters);
    setSorting([]);
    setPagination(prev => {
      if (prev.pageIndex != 0) {
        return {
          ...prev,
          pageIndex: 0
        };
      }
      return prev;
    });
  }, []);

  const handleChangeSortings = useCallback((columnSortings: Updater<SortingState>) => {
    setSorting(columnSortings);
    setPagination(prev => {
      if (prev.pageIndex != 0) {
        return {
          ...prev,
          pageIndex: 0
        };
      }
      return prev;
    });
  }, []);

  /**
   * Invoke get organisations api
   */
  const { organisationsResponse, isLoadingOrganisations } = useOrganisation({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings
  });

  const tableData: TableBaseType<Organisation>[] = useMemo(() => {
    return Array.isArray(organisationsResponse?.data) ? organisationsResponse?.data : [];
  }, [organisationsResponse]);

  return (
    <ContentLayout icon={Building2} title={"organisation list"}>
      <DataTable
        totalItems={organisationsResponse?.meta?.totalItems}
        limit={organisationsResponse?.meta?.limit}
        columns={orgColumns}
        data={tableData}
        isLoading={isLoadingOrganisations}
        searchPlaceholder="search by name and email"
        columnFilters={columnFilters}
        setColumnFilters={handleChangeColumnFilters}
        globalFilter={globalFilter}
        setGlobalFilter={handleChangeSearchFilters}
        sorting={sorting}
        setSorting={handleChangeSortings}
        pagination={pagination}
        setPagination={setPagination}
      />
    </ContentLayout>
  );
};

export default OrganisationPage;
