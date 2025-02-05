import { UserRoundPen } from "lucide-react";
import { useMemo } from "react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { Profile, ProfilePaginationFilter, ProfilePaginationOrderByType, TableBaseType } from "@/types";
import { profileColumns } from "../Profile/profileColumns";
import { useOrgManager } from "@/hooks/orgManagers/useOrgManager";
import { useTableFilters } from "@/hooks/useTableFilters";
import { usePermissions } from "@/hooks/usePermissions";

const OrgManagerPage = () => {
  const { needViewOrganisationOfUser } = usePermissions();
  const { sorting, setSorting, columnFilters, setColumnFilters, pagination, setPagination, globalFilter, setGlobalFilter, offset, filters, sortings } =
    useTableFilters<ProfilePaginationFilter, ProfilePaginationOrderByType>();

  const { orgManagersResponse, isLoadingOrgManagers } = useOrgManager({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings
  });

  const tableData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(orgManagersResponse?.data) ? orgManagersResponse?.data : [];
  }, [orgManagersResponse]);

  return (
    <ContentLayout icon={UserRoundPen} title={"organisation manager list"}>
      <DataTable
        totalItems={orgManagersResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={profileColumns({ profilePath: "orgmanagers", hideRole: true, hideOrganisation: !needViewOrganisationOfUser })}
        data={tableData}
        isLoading={isLoadingOrgManagers}
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

export default OrgManagerPage;
