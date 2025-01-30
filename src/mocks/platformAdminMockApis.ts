import { createOrganisationsPaginationFetcher } from "./organisationsFetchMockApi";
import { createProfilesPaginationFetcher } from "./profilesFetchMockApi";

const getOrganisations = createOrganisationsPaginationFetcher().fetchOrganisations;

const getOrganisationManagers = createProfilesPaginationFetcher().fetchOrganisationManagers;

const getOrganisationAdmins = createProfilesPaginationFetcher().fetchOrganisationAdmins;

const getOrganisationTeachers = createProfilesPaginationFetcher().fetchOrganisationTeachers;

const getParents = createProfilesPaginationFetcher().fetchParents;

const getStudents = createProfilesPaginationFetcher().fetchStudents;

const getContacts = createProfilesPaginationFetcher().fetchContacts;

export const platformAdminMockApis = {
  getOrganisations,
  getOrganisationManagers,
  getOrganisationTeachers,
  getOrganisationAdmins,
  getParents,
  getStudents,
  getContacts
};
