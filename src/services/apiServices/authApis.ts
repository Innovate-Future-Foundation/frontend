import { API_ENDPOINTS } from "@/constants/apiConfig";
import appRequest from "@/services/httpClient";
import { inviteInfoType } from "@/types";

const getTokenReq = (codeQueryParams: URLSearchParams) => appRequest.get(`${API_ENDPOINTS.AUTH}${API_ENDPOINTS.TOKEN}?${codeQueryParams}`);

const inviteReq = (inviteData: inviteInfoType) => appRequest.post(`${API_ENDPOINTS.AUTH}${API_ENDPOINTS.INVITE}`, inviteData);

export const authApis = {
  getTokenReq,
  inviteReq
};
