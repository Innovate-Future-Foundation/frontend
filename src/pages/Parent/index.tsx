import { UserRoundPen } from "lucide-react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { ProfilePaginationFilter, ProfilePaginationOrderByType } from "@/types";
import { profileColumns } from "../Profile/profileColumns";
import { usePermissions } from "@/hooks/usePermissions";
import { useTableFilters } from "@/hooks/useTableFilters";
import { useParentWithChildren } from "@/hooks/profiles/useParentWithChildren";

const ParentPage = () => {
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

  const { totalItems, parentsData, isLoadingParents, isLoadingChildren } = useParentWithChildren({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings,
    searchKey
  });
  console.log("searchKey", searchKey);
  console.log("isLoadingParents", isLoadingParents);
  console.log("isLoadingChildren", isLoadingChildren);
  return (
    <ContentLayout icon={UserRoundPen} title={"Parent list"}>
      <DataTable
        totalItems={totalItems}
        limit={pagination.pageSize}
        columns={profileColumns({ profilePath: "parents", hideRole: true, hideOrganisation: !needViewOrganisationOfUser })}
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
