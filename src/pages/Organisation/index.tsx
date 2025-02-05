import DataTable from "@/components/DataTable";
import { orgColumns } from "./orgColumns";
import ContentLayout from "@/layouts/ContentLayout";
import { Building2 } from "lucide-react";
import { useOrganisation } from "@/hooks/organisations/useOrganisation";
import { useMemo } from "react";
import { Organisation, OrganisationPaginationFilter, OrganisationPaginationOrderByType, TableBaseType } from "@/types";
import { mapStringToEnum } from "@/constants/mapper";
import { useTableFilters } from "@/hooks/useTableFilters";

const OrganisationPage = () => {
  const { sorting, setSorting, columnFilters, setColumnFilters, pagination, setPagination, globalFilter, setGlobalFilter, offset, filters, sortings } =
    useTableFilters<OrganisationPaginationFilter, OrganisationPaginationOrderByType>({ filterMapper: mapStringToEnum });

  const { organisationsResponse, isLoadingOrganisations } = useOrganisation({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings
  });

  const tableData: TableBaseType<Organisation>[] = useMemo(() => {
    return Array.isArray(organisationsResponse?.data) ? organisationsResponse?.data : [];
  }, [organisationsResponse]);

  return (
    <ContentLayout icon={Building2} title={"organisation list"}>
      <DataTable
        totalItems={organisationsResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={orgColumns}
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
