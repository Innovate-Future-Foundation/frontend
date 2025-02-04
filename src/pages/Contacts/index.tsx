import { UserRoundPen } from "lucide-react";
import { contactsColumns } from "./contactsColumns";
import { Profile, ProfilePaginationFilter, ProfilePaginationOrderByType, TableBaseType } from "@/types";
import { useCallback, useMemo, useState } from "react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { useOrgAdmin } from "@/hooks/orgAdmins/useOrgAdmin";
import { Updater } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { ITEMS_PER_PAGE } from "@/constants/appConfig";

const UserPage = () => {
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

  const filters: ProfilePaginationFilter | undefined = useMemo(() => {
    console.log("columnFilters", columnFilters);

    const result: Partial<ProfilePaginationFilter> = Object.fromEntries(
      columnFilters.map(({ id, value }) => {
        // const enumValue = mapStringToEnum(id, value as string);
        console.log(id, value);
        return [];
        // return [id, enumValue !== undefined ? enumValue : value];
      })
    );

    if (globalFilter) {
      result["nameOrEmailOrPhone"] = globalFilter;
    }

    console.log("result", result);
    return result as ProfilePaginationFilter;
  }, [columnFilters, globalFilter]);

  const sortings = useMemo(
    () =>
      sorting.map(({ id, desc }) => {
        return {
          orderBy: id as ProfilePaginationOrderByType,
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
  const { orgAdminsResponse, isLoadingOrgAdmins } = useOrgAdmin({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings
  });

  const tableData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(orgAdminsResponse?.data) ? orgAdminsResponse?.data : [];
  }, [orgAdminsResponse]);

  return (
    <ContentLayout icon={UserRoundPen} title={"contact list"}>
      <DataTable
        totalItems={orgAdminsResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={contactsColumns}
        data={tableData}
        isLoading={isLoadingOrgAdmins}
        searchPlaceholder="Search by name, email, or organization"
        columnFilters={columnFilters}
        setColumnFilters={handleChangeColumnFilters}
        globalFilter={globalFilter}
        setGlobalFilter={handleChangeSearchFilters}
        sorting={sorting}
        setSorting={handleChangeSortings}
        pagination={pagination}
        setPagination={setPagination}
        locationListType="cards"
      />
    </ContentLayout>
  );
};

export default UserPage;
