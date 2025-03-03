import { API_ENDPOINTS } from "@/constants/apiConfig";
import appRequest from "@/services/httpClient";
import { Profile } from "@/types";
import {
  EmailVerificationCredential,
  ForgotPasswordCredential,
  LoginCredential,
  RegisterOrgWithAdminCredentials,
  ResendEmailCredential,
  ResetPasswordCredential
} from "@/types/auth";

const getTokenReq = (codeQueryParams: URLSearchParams) => appRequest.get(`${API_ENDPOINTS.AUTH}${API_ENDPOINTS.TOKEN}?${codeQueryParams}`);

const inviteReq = (inviteData: Profile) => appRequest.post(`${API_ENDPOINTS.AUTH}${API_ENDPOINTS.INVITE}`, inviteData);

const signupOrgWithAdminReq = (orgWithAdminCredentialsData: RegisterOrgWithAdminCredentials) =>
  appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.REGISTER}`, orgWithAdminCredentialsData);

const loginReq = (loginCredentialData: LoginCredential) =>
  appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.LOGIN}`, loginCredentialData);

const logoutReq = () => appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.LOGOUT}`);

const emailVerificationReq = (emailVerifyCredentialData: EmailVerificationCredential) =>
  appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.EMAILVERIFICATION}`, emailVerifyCredentialData);

const reSendEmailReq = (emailVerifyCredentialData: ResendEmailCredential) =>
  appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.RESENDEMAIL}`, emailVerifyCredentialData);

const forgotPasswordReq = (forgotPasswordCredentialData: ForgotPasswordCredential) =>
  appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.FORGOTPASSWORD}`, forgotPasswordCredentialData);

const resetPasswordReq = (resetPasswordCredentialData: ResetPasswordCredential) =>
  appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.RESETPASSWORD}`, resetPasswordCredentialData);

const getMeReq = () => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.ME}`);

export const authApis = {
  getTokenReq,
  inviteReq,
  signupOrgWithAdminReq,
  loginReq,
  logoutReq,
  emailVerificationReq,
  reSendEmailReq,
  getMeReq,
  forgotPasswordReq,
  resetPasswordReq
};
