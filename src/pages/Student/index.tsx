import { UserRoundPen } from "lucide-react";
import { useMemo } from "react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { Profile, ProfilePaginationFilter, ProfilePaginationOrderByType, TableBaseType } from "@/types";
import { profileColumns } from "../Profile/profileColumns";
import { useStudent } from "@/hooks/profiles/useStudent";
import { usePermissions } from "@/hooks/usePermissions";
import { useTableFilters } from "@/hooks/useTableFilters";
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
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

  const { studentsResponse, isLoadingStudents } = useStudent({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings,
    searchKey
  });

  const tableData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(studentsResponse?.data) ? studentsResponse?.data : [];
  }, [studentsResponse]);

  const handleSubmit = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <ContentLayout icon={UserRoundPen} title={"Student list"} onInviteClick={handleSubmit} inviteLabel={"invite student"} roleInvited={"Student"}>
      <DataTable
        totalItems={studentsResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={profileColumns({ profilePath: "students", hideRole: true, hideOrganisation: !needViewOrganisationOfUser, navigate })}
        data={tableData}
        isLoading={isLoadingStudents}
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

export default StudentPage;
