import { API_ENDPOINTS, AWS_API_GATE_WAY_URL } from "@/constants/apiConfig";
import appRequest from "@/services/httpClient";

const getTokenReq = (codeQueryParams: URLSearchParams) =>
  appRequest.get(`${AWS_API_GATE_WAY_URL}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.TOKEN}?${codeQueryParams}`, { withCredentials: true });

const inviteReq = () => appRequest.post(`${AWS_API_GATE_WAY_URL}${API_ENDPOINTS.AUTH}${API_ENDPOINTS.INVITE}`);

export const authApis = {
  getTokenReq,
  inviteReq
};
