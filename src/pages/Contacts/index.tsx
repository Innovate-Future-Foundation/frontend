import { UserRoundPen } from "lucide-react";
import { useMemo } from "react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { Profile, ProfilePaginationFilter, ProfilePaginationOrderByType, TableBaseType } from "@/types";
import { useTableFilters } from "@/hooks/useTableFilters";
import { useContact } from "@/hooks/contacts/useContact";
import { contactsColumns } from "./contactsColumns";
import { mapTypeToId } from "@/constants/mapper";

const ContactPage = () => {
  const { sorting, setSorting, columnFilters, setColumnFilters, pagination, setPagination, globalFilter, setGlobalFilter, offset, filters, sortings } =
    useTableFilters<ProfilePaginationFilter, ProfilePaginationOrderByType>({ filterMapper: mapTypeToId });

  const { contactsResponse, isLoadingContacts } = useContact({
    offset,
    limit: pagination.pageSize,
    filters,
    sortings
  });

  const tableData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(contactsResponse?.data) ? contactsResponse?.data : [];
  }, [contactsResponse]);

  return (
    <ContentLayout icon={UserRoundPen} title={"contact list"}>
      <DataTable
        totalItems={contactsResponse?.meta?.totalItems}
        limit={pagination.pageSize}
        columns={contactsColumns}
        data={tableData}
        isLoading={isLoadingContacts}
        searchPlaceholder="search by name, email or phone"
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        sorting={sorting}
        setSorting={setSorting}
        pagination={pagination}
        setPagination={setPagination}
        locationListType="cards"
      />
    </ContentLayout>
  );
};

export default ContactPage;
