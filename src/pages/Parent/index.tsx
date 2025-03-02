import { UserRoundPen } from "lucide-react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { ProfilePaginationFilter, ProfilePaginationOrderByType } from "@/types";
import { profileColumns } from "../Profile/profileColumns";
import { usePermissions } from "@/hooks/usePermissions";
import { useTableFilters } from "@/hooks/useTableFilters";
import { useParentWithChildren } from "@/hooks/profiles/useParentWithChildren";
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from "@/hooks/profiles/useUpdateProfile";

const ParentPage = () => {
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
  const { totalItems, parentsData, isLoadingParents, isLoadingChildren } = useParentWithChildren({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings,
    searchKey
  });

  const handleSubmit = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <ContentLayout icon={UserRoundPen} title={"Parent list"} onInviteClick={handleSubmit} inviteLabel={"invite parent"} roleInvited={"Parent"}>
      <DataTable
        totalItems={totalItems}
        limit={pagination.pageSize}
        columns={profileColumns({ profilePath: "parents", hideRole: true, hideOrganisation: !needViewOrganisationOfUser, navigate, mutation })}
        data={parentsData}
        isLoading={isLoadingParents || isLoadingChildren}
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
