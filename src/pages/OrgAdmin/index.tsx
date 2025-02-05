import { UserRoundPen } from "lucide-react";
import { useMemo } from "react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { Profile, ProfilePaginationFilter, ProfilePaginationOrderByType, TableBaseType } from "@/types";
import { useOrgAdmin } from "@/hooks/orgAdmins/useOrgAdmin";
import { profileColumns } from "../Profile/profileColumns";
import { usePermissions } from "@/hooks/usePermissions";
import { useTableFilters } from "@/hooks/useTableFilters";

const OrgAdminPage = () => {
  const { needViewOrganisationOfUser } = usePermissions();
  const { sorting, setSorting, columnFilters, setColumnFilters, pagination, setPagination, globalFilter, setGlobalFilter, offset, filters, sortings } =
    useTableFilters<ProfilePaginationFilter, ProfilePaginationOrderByType>();

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
    <ContentLayout icon={UserRoundPen} title={"organisation admin list"}>
      <DataTable
        totalItems={orgAdminsResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={profileColumns({ profilePath: "orgadmins", hideRole: true, hideOrganisation: !needViewOrganisationOfUser })}
        data={tableData}
        isLoading={isLoadingOrgAdmins}
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

export default OrgAdminPage;
