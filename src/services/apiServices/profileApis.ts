import { API_ENDPOINTS } from "@/constants/apiConfig";
import { Profile, ProfileInfo } from "@/types";
import appRequest from "@/services/httpClient";
import { ROLE_IDS } from "@/constants/appConfig";

const createProfile = (bodyData: Profile) => appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}`, bodyData);

const getProfileById = (id: string) => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}/${id}`);

const removeProfile = (id: string) => appRequest.put(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}/${id}`, { status: "suspended" });

const updateProfile = (id: string, bodyData: ProfileInfo) => appRequest.put(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}/${id}`, bodyData);

/**
 * platform admin Users
 */
// const getPlatformAdminUsers = (queryData: URLSearchParams) => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}?${queryData}`);

// const getOrgAdminUsers = (queryData: URLSearchParams) => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}?${queryData}`);

// const getOrgManagerUsers = (queryData: URLSearchParams) => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}?${queryData}`);

// const getPlatformAdminUsers = (queryData: URLSearchParams) => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}?${queryData}`);

// const getPlatformAdminUsers = (queryData: URLSearchParams) => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}?${queryData}`);
/**
 * Organisation Admins
 */
const getOrgAdmins = (queryData: URLSearchParams) => getUsersByRole(ROLE_IDS.ORG_ADMIN, queryData);

/**
 * Organisation Managers
 */
const getOrgManagers = (queryData: URLSearchParams, orgId?: string) => getUsersByRole(ROLE_IDS.ORG_MANAGER, queryData, orgId);

/**
 * Organisation Teachers
 */
const getOrgTeachers = (queryData: URLSearchParams, orgId?: string) => getUsersByRole(ROLE_IDS.ORG_TEACHER, queryData, orgId);

/**
 * Parents
 */
const getParents = (queryData: URLSearchParams, orgId?: string) => getUsersByRole(ROLE_IDS.PARENT, queryData, orgId);

/**
 * Students
 */
const getStudents = (queryData: URLSearchParams, orgId?: string) => getUsersByRole(ROLE_IDS.STUDENT, queryData, orgId);

/**
 * Fetches users by role with optional organisation ID.
 */
const getUsersByRole = (roleId: string, queryData: URLSearchParams, orgId?: string) => {
  const baseUrl = `${API_ENDPOINTS.API_V1}${API_ENDPOINTS.PROFILE}?filters.roleId=${roleId}`;
  const orgFilter = orgId ? `&filters.orgId=${orgId}` : "";
  const includeDetailFilter = !orgId ? `&includeDetails=true` : "";
  return appRequest.get(`${baseUrl}${orgFilter}${includeDetailFilter}&${queryData}`);
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
  getStudents
  // getPlatformAdminUsers
};
