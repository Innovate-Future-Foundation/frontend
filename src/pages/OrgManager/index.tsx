import { UserRoundPen } from "lucide-react";
import { useMemo } from "react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { Profile, ProfilePaginationFilter, ProfilePaginationOrderByType, TableBaseType } from "@/types";
import { profileColumns } from "../Profile/profileColumns";
import { useOrgManager } from "@/hooks/profiles/useOrgManager";
import { useTableFilters } from "@/hooks/useTableFilters";
import { usePermissions } from "@/hooks/usePermissions";
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from "@/hooks/profiles/useUpdateProfile";

const OrgManagerPage = () => {
  const navigate = useNavigate();
  const { needViewOrganisationOfUser } = usePermissions();
  const {
    searchKey,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    pagination,
    setPagination,
    globalFilter,
    setGlobalFilter,
    offset,
    filters,
    sortings
  } = useTableFilters<ProfilePaginationFilter, ProfilePaginationOrderByType>();
  const mutation = useUpdateProfile({});
  const { orgManagersResponse, isLoadingOrgManagers } = useOrgManager({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings,
    searchKey
  });

  const tableData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(orgManagersResponse?.data) ? orgManagersResponse?.data : [];
  }, [orgManagersResponse]);

  const handleSubmit = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <ContentLayout icon={UserRoundPen} title={"Manager list"} onInviteClick={handleSubmit} inviteLabel={"invite manager"} roleInvited={"OrgManager"}>
      <DataTable
        totalItems={orgManagersResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={profileColumns({ profilePath: "orgmanagers", hideRole: true, hideOrganisation: !needViewOrganisationOfUser, navigate, mutation })}
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
