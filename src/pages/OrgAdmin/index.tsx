import { UserRoundPen } from "lucide-react";
import { useMemo } from "react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { Profile, ProfilePaginationFilter, ProfilePaginationOrderByType, TableBaseType } from "@/types";
import { useOrgAdmin } from "@/hooks/profiles/useOrgAdmin";
import { profileColumns } from "../Profile/profileColumns";
import { usePermissions } from "@/hooks/usePermissions";
import { useTableFilters } from "@/hooks/useTableFilters";
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from "@/hooks/profiles/useUpdateProfile";

const OrgAdminPage = () => {
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
  const { orgAdminsResponse, isLoadingOrgAdmins } = useOrgAdmin({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings,
    searchKey
  });

  const tableData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(orgAdminsResponse?.data) ? orgAdminsResponse?.data : [];
  }, [orgAdminsResponse]);

  const handleSubmit = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <ContentLayout icon={UserRoundPen} title={"Admin list"} onInviteClick={handleSubmit} inviteLabel={"invite admin"} roleInvited={"OrgAdmin"}>
      <DataTable
        totalItems={orgAdminsResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={profileColumns({ profilePath: "orgadmins", hideRole: true, hideOrganisation: !needViewOrganisationOfUser, navigate, mutation })}
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
