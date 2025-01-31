import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

import { Organisation, TableBaseType } from "@/types";
import { fetchDataOffsetPagination, makeData } from "./makeData";
import { newOrganisation } from "./mockOrganisation";

export const createOrganisationsPaginationFetcher = () => {
  const organisationList = makeData<TableBaseType<Organisation>>(newOrganisation, 1000);

  /**
   * Fetch organisations
   */
  const fetchOrganisations = ({ offset, sorting, filtering }: { offset: number; sorting: SortingState; filtering: ColumnFiltersState }) =>
    fetchDataOffsetPagination({
      data: organisationList,
      offset,
      limit: 8,
      sorting,
      filtering
    });

  return {
    fetchOrganisations
  };
};
