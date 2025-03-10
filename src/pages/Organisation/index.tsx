import DataTable from "@/components/DataTable";
import { getOrgColumns } from "./orgColumns";
import ContentLayout from "@/layouts/ContentLayout";
import { Building2 } from "lucide-react";
import { useOrganisation } from "@/hooks/organisations/useOrganisation";
import { useMemo } from "react";
import { Organisation, OrganisationPaginationFilter, OrganisationPaginationOrderByType, TableBaseType } from "@/types";
import { useTableFilters } from "@/hooks/useTableFilters";
import { mapStringToType } from "@/constants/mapper";
import { useNavigate } from "react-router-dom";

const OrganisationPage = () => {
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
  } = useTableFilters<OrganisationPaginationFilter, OrganisationPaginationOrderByType>({ filterMapper: mapStringToType });
  const navigate = useNavigate();
  const { organisationsResponse, isLoadingOrganisations } = useOrganisation({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings,
    searchKey
  });

  const tableData: TableBaseType<Organisation>[] = useMemo(() => {
    return Array.isArray(organisationsResponse?.data) ? organisationsResponse?.data : [];
  }, [organisationsResponse]);

  return (
    <ContentLayout icon={Building2} title={"organisation list"}>
      <DataTable
        totalItems={organisationsResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={getOrgColumns(navigate)}
        data={tableData}
        isLoading={isLoadingOrganisations}
        searchPlaceholder="search by name and email"
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

export default OrganisationPage;
