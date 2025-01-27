import { ApiResponse, Profile, TableBaseType } from "@/types";
import { fetchData, fetchDataCursorPagination, fetchDataOffsetPagination, makeData } from "./makeData";
import { newProfile } from "./mockProfile";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export const createProfilesPaginationFetcher = () => {
  const profileList = makeData<TableBaseType<Profile>>(newProfile, 1000);

  /**
   * Fetch paginated contacts
   */
  const fetchContacts = ({ cursor, sorting, filtering }: { cursor: string | null; sorting: SortingState; filtering: ColumnFiltersState }) => {
    return fetchDataCursorPagination({
      data: profileList,
      cursor,
      cursorField: "profileId",
      size: 16,
      sorting,
      filtering
    });
  };

  /**
   * Fetch organisation managers
   */
  const fetchOrganisationManagers = ({ sorting, filtering }: { sorting: SortingState; filtering: ColumnFiltersState }) =>
    fetchData({
      data: profileList,
      sorting,
      filtering: [
        {
          id: "role",
          value: "organisation manager"
        },
        ...filtering
      ]
    });

  /**
   * Fetch organisation admins
   */
  const fetchOrganisationAdmins = ({ offset, sorting, filtering }: { offset: number; sorting: SortingState; filtering: ColumnFiltersState }) =>
    fetchDataOffsetPagination({
      data: profileList,
      offset,
      limit: 8,
      sorting,
      filtering: [
        {
          id: "role",
          value: "organisation admin"
        },
        ...filtering
      ]
    });

  /**
   * Fetch organisation teachers
   */
  const fetchOrganisationTeachers = ({ offset, sorting, filtering }: { offset: number; sorting: SortingState; filtering: ColumnFiltersState }) =>
    fetchDataOffsetPagination({
      data: profileList,
      offset,
      limit: 8,
      sorting,
      filtering: [
        {
          id: "role",
          value: "organisation teacher"
        },
        ...filtering
      ]
    });

  /**
   * Fetch parents
   */
  const fetchParents = async ({ offset, sorting, filtering }: { offset: number; sorting: SortingState; filtering: ColumnFiltersState }) => {
    const parentsData: ApiResponse<Profile> = await fetchDataOffsetPagination({
      data: profileList,
      offset,
      limit: 8,
      sorting,
      filtering: [
        {
          id: "role",
          value: "parent"
        },
        ...filtering
      ]
    });

    // Add children to each row
    if (Array.isArray(parentsData.data)) {
      const parentProfilesWithChildren = await Promise.all(
        parentsData.data.map(async parentProfile => {
          // const childStudents = await fetchData({
          //   data: profileList,
          //   filtering: [
          //     {
          //       id: "role",
          //       value: "student"
          //     },
          //     {
          //       id: "supervisedBy",
          //       value: parentProfile.profileId
          //     }
          //   ]
          // });
          const childStudents = makeData<TableBaseType<Profile>>(() => newProfile("student"), 3);
          console.log("childStudents", childStudents);
          return {
            ...parentProfile,
            children: childStudents
          };
        })
      );
      return {
        ...parentsData,
        data: parentProfilesWithChildren
      };
    }
  };

  /**
   * Fetch students
   */
  const fetchStudents = ({ offset, sorting, filtering }: { offset: number; sorting: SortingState; filtering: ColumnFiltersState }) =>
    fetchDataOffsetPagination({
      data: profileList,
      offset,
      limit: 8,
      sorting,
      filtering: [
        {
          id: "role",
          value: "student"
        },
        ...filtering
      ]
    });

  return {
    fetchContacts,
    fetchOrganisationManagers,
    fetchOrganisationAdmins,
    fetchOrganisationTeachers,
    fetchParents,
    fetchStudents
  };
};
