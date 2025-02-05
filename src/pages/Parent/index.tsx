import { UserRoundPen } from "lucide-react";
import { useMemo } from "react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { Profile, ProfilePaginationFilter, ProfilePaginationOrderByType, TableBaseType } from "@/types";
import { profileColumns } from "../Profile/profileColumns";
import { useParent } from "@/hooks/parents/useParent";
import { usePermissions } from "@/hooks/usePermissions";
import { useTableFilters } from "@/hooks/useTableFilters";

const ParentPage = () => {
  const { needViewOrganisationOfUser } = usePermissions();
  const { sorting, setSorting, columnFilters, setColumnFilters, pagination, setPagination, globalFilter, setGlobalFilter, offset, filters, sortings } =
    useTableFilters<ProfilePaginationFilter, ProfilePaginationOrderByType>();

  const { parentsResponse, isLoadingParents } = useParent({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings
  });

  const tableData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(parentsResponse?.data) ? parentsResponse?.data : [];
  }, [parentsResponse]);

  return (
    <ContentLayout icon={UserRoundPen} title={"parent list"}>
      <DataTable
        totalItems={parentsResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={profileColumns({ profilePath: "parents", hideRole: true, hideOrganisation: !needViewOrganisationOfUser })}
        data={tableData}
        isLoading={isLoadingParents}
        searchPlaceholder="search by name, email or phone"
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        sorting={sorting}
        setSorting={setSorting}
        pagination={pagination}
        setPagination={setPagination}
      />
    </ContentLayout>
  );
};

export default ParentPage;
