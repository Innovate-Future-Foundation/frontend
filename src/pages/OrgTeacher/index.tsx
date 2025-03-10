import { UserRoundPen } from "lucide-react";
import { useMemo } from "react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { Profile, ProfilePaginationFilter, ProfilePaginationOrderByType, TableBaseType } from "@/types";
import { profileColumns } from "../Profile/profileColumns";
import { useOrgTeacher } from "@/hooks/profiles/useOrgTeacher";
import { usePermissions } from "@/hooks/usePermissions";
import { useTableFilters } from "@/hooks/useTableFilters";
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from "@/hooks/profiles/useUpdateProfile";

const OrgTeacherPage = () => {
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
  const { orgTeachersResponse, isLoadingOrgTeachers } = useOrgTeacher({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings,
    searchKey
  });

  const tableData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(orgTeachersResponse?.data) ? orgTeachersResponse?.data : [];
  }, [orgTeachersResponse]);

  const handleSubmit = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <ContentLayout icon={UserRoundPen} title={"Teacher list"} onInviteClick={handleSubmit} inviteLabel={"invite teacher"} roleInvited={"OrgTeacher"}>
      <DataTable
        totalItems={orgTeachersResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={profileColumns({ profilePath: "orgteachers", hideRole: true, hideOrganisation: !needViewOrganisationOfUser, navigate, mutation })}
        data={tableData}
        isLoading={isLoadingOrgTeachers}
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

export default OrgTeacherPage;
