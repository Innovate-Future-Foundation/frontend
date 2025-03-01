import { API_ENDPOINTS } from "@/constants/apiConfig";
import { Profile, ProfileInfo, RoleType } from "@/types";
import appRequest from "@/services/httpClient";
import { CONTACT_ACCESS } from "@/constants/appConfig";

const createProfile = (bodyData: Profile) => appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}`, bodyData);

const getProfileByIdWithDetail = (id: string) => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}/${id}?includeDetails=true`);

const getProfileById = (id: string) => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}/${id}`);

const removeProfile = (id: string) => appRequest.put(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}/${id}`, { orgStatusCode: "suspended" });

const updateProfile = (id: string, bodyData: ProfileInfo) => appRequest.put(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}/${id}`, bodyData);

/**
 * Organisation Admins
 */
const getOrgAdmins = (queryData: URLSearchParams) => getUsersByRole("OrgAdmin", queryData);

/**
 * Organisation Managers
 */
const getOrgManagers = (queryData: URLSearchParams, orgId?: string) => getUsersByRole("OrgManager", queryData, orgId);

/**
 * Organisation Teachers
 */
const getOrgTeachers = (queryData: URLSearchParams, orgId?: string) => getUsersByRole("OrgTeacher", queryData, orgId);

/**
 * Parents
 */
const getParents = (queryData: URLSearchParams, orgId?: string) => getUsersByRole("Parent", queryData, orgId);

/**
 * Students
 */
const getStudentsByParentIds = (supervisors: string) =>
  appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}?includeDetails=true&limit=100&filters.supervisors=${supervisors}`);

const getStudents = (queryData: URLSearchParams, orgId?: string) => getUsersByRole("Student", queryData, orgId);

/**
 * Fetches contacts by role with optional organisation ID.
 */
const getUsersByRole = (roleCode: string, queryData: URLSearchParams, orgId?: string) => {
  const baseUrl = `${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}?filters.roleCodes=${roleCode}`;
  const orgFilter = orgId ? `&filters.orgId=${orgId}` : "";
  const includeDetailFilter = !orgId ? `&includeDetails=true` : "";
  return appRequest.get(`${baseUrl}${orgFilter}${includeDetailFilter}&${queryData}`);
};

/**
 * Fetch Users
 */
export const getContacts = (role: RoleType) => {
  return (queryData: URLSearchParams, orgId?: string) => {
    const allowedRoles = CONTACT_ACCESS[role]?.join(",");

    const queryParams = new URLSearchParams(queryData);
    if (orgId) queryParams.append("filters.orgId", orgId);

    // if queryData contains roleId do not append roleId again
    if (allowedRoles && !queryParams.has("roleCodes")) {
      queryParams.append("filters.roleCodes", allowedRoles);
    }

    return appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}?includeDetails=true&${queryParams.toString()}`);
  };
};

export const getPermissions = () => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}${API_ENDPOINTS.PERMISSION}`);

export const profileApis = {
  createProfile,
  getProfileById,
  getProfileByIdWithDetail,
  removeProfile,
  updateProfile,
  getOrgAdmins,
  getOrgManagers,
  getOrgTeachers,
  getParents,
  getStudents,
  getStudentsByParentIds,
  getContacts,
  getPermissions
};
