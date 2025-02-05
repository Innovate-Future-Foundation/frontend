import { API_ENDPOINTS } from "@/constants/apiConfig";
import { Profile, ProfileInfo, RoleType } from "@/types";
import appRequest from "@/services/httpClient";
import { CONTACT_ACCESS, ROLE_IDS } from "@/constants/appConfig";

const createProfile = (bodyData: Profile) => appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}`, bodyData);

const getProfileById = (id: string) => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}/${id}`);

const removeProfile = (id: string) => appRequest.put(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}/${id}`, { status: "suspended" });

const updateProfile = (id: string, bodyData: ProfileInfo) => appRequest.put(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}/${id}`, bodyData);

/**
 * Organisation Admins
 */
const getOrgAdmins = (queryData: URLSearchParams) => getUsersByRole(ROLE_IDS["organisation admin"], queryData);

/**
 * Organisation Managers
 */
const getOrgManagers = (queryData: URLSearchParams, orgId?: string) => getUsersByRole(ROLE_IDS["organisation manager"], queryData, orgId);

/**
 * Organisation Teachers
 */
const getOrgTeachers = (queryData: URLSearchParams, orgId?: string) => getUsersByRole(ROLE_IDS["organisation teacher"], queryData, orgId);

/**
 * Parents
 */
const getParents = (queryData: URLSearchParams, orgId?: string) => getUsersByRole(ROLE_IDS["parent"], queryData, orgId);

/**
 * Students
 */
const getStudents = (queryData: URLSearchParams, orgId?: string) => getUsersByRole(ROLE_IDS["student"], queryData, orgId);

/**
 * Fetches users by role with optional organisation ID.
 */
const getUsersByRole = (roleId: string, queryData: URLSearchParams, orgId?: string) => {
  const baseUrl = `${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}?filters.roleIds=${roleId}`;
  const orgFilter = orgId ? `&filters.orgId=${orgId}` : "";
  const includeDetailFilter = !orgId ? `&includeDetails=true` : "";
  return appRequest.get(`${baseUrl}${orgFilter}${includeDetailFilter}&${queryData}`);
};

/**
 * Fetch Users
 */
export const getContacts = (role: RoleType) => {
  return (queryData: URLSearchParams, orgId?: string) => {
    const allowedRoles = CONTACT_ACCESS[role]?.map(r => ROLE_IDS[r]).join(",");

    const queryParams = new URLSearchParams(queryData);
    if (orgId) queryParams.append("filters.orgId", orgId);

    // if queryData contains roleId do not append roleId again
    if (allowedRoles && !queryParams.has("roleIds")) {
      queryParams.append("filters.roleIds", allowedRoles);
    }

    return appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}?includeDetails=true&${queryParams.toString()}`);
  };
};

export const profileApis = {
  createProfile,
  getProfileById,
  removeProfile,
  updateProfile,
  getOrgAdmins,
  getOrgManagers,
  getOrgTeachers,
  getParents,
  getStudents,
  getContacts
};
