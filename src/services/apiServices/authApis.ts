import { API_ENDPOINTS } from "@/constants/apiConfig";
import appRequest from "@/services/httpClient";
import { Profile } from "@/types";
import { LoginCredential, RegisterOrgWithAdminCredentials } from "@/types/auth";

const getTokenReq = (codeQueryParams: URLSearchParams) => appRequest.get(`${API_ENDPOINTS.AUTH}${API_ENDPOINTS.TOKEN}?${codeQueryParams}`);

const inviteReq = (inviteData: Profile) => appRequest.post(`${API_ENDPOINTS.AUTH}${API_ENDPOINTS.INVITE}`, inviteData);

const registerOrgWithAdminReq = (orgWithAdminCredentialsData: RegisterOrgWithAdminCredentials) =>
  appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.REGISTER}`, orgWithAdminCredentialsData);

const loginReq = (loginCredentialData: LoginCredential) =>
  appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.LOGIN}`, loginCredentialData);

const logoutReq = () => appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.LOGOUT}`);

export const authApis = {
  getTokenReq,
  inviteReq,
  registerOrgWithAdminReq,
  loginReq,
  logoutReq
};
