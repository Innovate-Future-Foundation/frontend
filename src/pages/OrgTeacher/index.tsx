import { UserRoundPen } from "lucide-react";
import { useMemo } from "react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { Profile, ProfilePaginationFilter, ProfilePaginationOrderByType, TableBaseType } from "@/types";
import { profileColumns } from "../Profile/profileColumns";
import { useOrgTeacher } from "@/hooks/orgTeachers/useOrgTeacher";
import { usePermissions } from "@/hooks/usePermissions";
import { useTableFilters } from "@/hooks/useTableFilters";

const OrgTeacherPage = () => {
  const { needViewOrganisationOfUser } = usePermissions();
  const { sorting, setSorting, columnFilters, setColumnFilters, pagination, setPagination, globalFilter, setGlobalFilter, offset, filters, sortings } =
    useTableFilters<ProfilePaginationFilter, ProfilePaginationOrderByType>();

  const { orgTeachersResponse, isLoadingOrgTeachers } = useOrgTeacher({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings
  });

  const tableData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(orgTeachersResponse?.data) ? orgTeachersResponse?.data : [];
  }, [orgTeachersResponse]);

  return (
    <ContentLayout icon={UserRoundPen} title={"organisation teacher list"}>
      <DataTable
        totalItems={orgTeachersResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={profileColumns({ profilePath: "orgteachers", hideRole: true, hideOrganisation: !needViewOrganisationOfUser })}
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
