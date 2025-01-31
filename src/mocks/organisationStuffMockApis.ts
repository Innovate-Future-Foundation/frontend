import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { createProfilesPaginationFetcher } from "./profilesFetchMockApi";

const getOrganisationAdmins = ({
  orgId,
  offset,
  sorting,
  filtering
}: {
  orgId: string;
  offset: number;
  sorting: SortingState;
  filtering: ColumnFiltersState;
}) =>
  createProfilesPaginationFetcher().fetchOrganisationAdmins({
    offset,
    sorting,
    filtering: [
      {
        id: "organisation",
        value: orgId
      },
      ...filtering
    ]
  });

const getOrganisationTeachers = ({
  orgId,
  offset,
  sorting,
  filtering
}: {
  orgId: string;
  offset: number;
  sorting: SortingState;
  filtering: ColumnFiltersState;
}) =>
  createProfilesPaginationFetcher().fetchOrganisationTeachers({
    offset,
    sorting,
    filtering: [
      {
        id: "organisation",
        value: orgId
      },
      ...filtering
    ]
  });

const getParents = ({ orgId, offset, sorting, filtering }: { orgId: string; offset: number; sorting: SortingState; filtering: ColumnFiltersState }) =>
  createProfilesPaginationFetcher().fetchParents({
    offset,
    sorting,
    filtering: [
      {
        id: "organisation",
        value: orgId
      },
      ...filtering
    ]
  });

const getStudents = ({ orgId, offset, sorting, filtering }: { orgId: string; offset: number; sorting: SortingState; filtering: ColumnFiltersState }) =>
  createProfilesPaginationFetcher().fetchStudents({
    offset,
    sorting,
    filtering: [
      {
        id: "organisation",
        value: orgId
      },
      ...filtering
    ]
  });

const getContacts = ({ orgId, cursor, sorting, filtering }: { orgId: string; cursor: string | null; sorting: SortingState; filtering: ColumnFiltersState }) =>
  createProfilesPaginationFetcher().fetchContacts({
    cursor,
    sorting,
    filtering: [
      {
        id: "organisation",
        value: orgId
      },
      ...filtering
    ]
  });

export const organisationStuffMockApis = {
  getOrganisationAdmins,
  getOrganisationTeachers,
  getParents,
  getStudents,
  getContacts
};
