import { UserRoundPen } from "lucide-react";
<<<<<<< HEAD
import { useMemo } from "react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { Profile, TableBaseType } from "@/types";
import { useOrgAdmin } from "@/hooks/orgAdmins/useOrgAdmin";
import { profileColumns } from "../Profile/profileColumns";
<<<<<<< HEAD
import { usePermissions } from "@/hooks/usePermissions";
import { useTableFilters } from "@/hooks/useTableFilters";

const OrgAdminPage = () => {
  const { needViewOrganisationOfUser } = usePermissions();
  const { sorting, setSorting, columnFilters, setColumnFilters, pagination, setPagination, globalFilter, setGlobalFilter, offset, filters, sortings } =
    useTableFilters();

=======
import { useCallback, useMemo, useState } from "react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { ColumnFiltersState, PaginationState, SortingState, Updater } from "@tanstack/react-table";
import { ITEMS_PER_PAGE } from "@/constants/appConfig";
import { Profile, ProfilePaginationFilter, ProfilePaginationOrderByType, TableBaseType } from "@/types";
import { useOrgAdmin } from "@/hooks/orgAdmins/useOrgAdmin";
import { profileColumns } from "../Profile/profileColumns";
import { usePermissions } from "@/hooks/usePermissions";

const OrgAdminPage = () => {
  const { needViewOrganisationOfUser } = usePermissions();
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
>>>>>>> 52b4503 (feat: add profile apis)
  const { orgAdminsResponse, isLoadingOrgAdmins } = useOrgAdmin({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings
  });

  const tableData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(orgAdminsResponse?.data) ? orgAdminsResponse?.data : [];
  }, [orgAdminsResponse]);

<<<<<<< HEAD
=======

const OrgAdminPage = () => {
>>>>>>> a3df7f2 (feat: add env example (#51))
=======
>>>>>>> 52b4503 (feat: add profile apis)
  return (
    <ContentLayout icon={UserRoundPen} title={"organisation admin list"}>
      <DataTable
        totalItems={orgAdminsResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={profileColumns({ profilePath: "orgadmins", hideRole: true, hideOrganisation: !needViewOrganisationOfUser })}
        data={tableData}
        isLoading={isLoadingOrgAdmins}
        searchPlaceholder="search by name, email or phone"
        columnFilters={columnFilters}
<<<<<<< HEAD
        setColumnFilters={setColumnFilters}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        sorting={sorting}
        setSorting={setSorting}
=======
        setColumnFilters={handleChangeColumnFilters}
        globalFilter={globalFilter}
        setGlobalFilter={handleChangeSearchFilters}
        sorting={sorting}
        setSorting={handleChangeSortings}
>>>>>>> 52b4503 (feat: add profile apis)
        pagination={pagination}
        setPagination={setPagination}
      />
    </ContentLayout>
  );
};

export default OrgAdminPage;
