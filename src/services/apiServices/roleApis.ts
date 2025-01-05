import { API_ENDPOINTS } from "@/constants/apiConfig";
import appRequest from "@/services/httpClient";

// Get a tour by ID
const getRolesReq = () => appRequest.get(`${API_ENDPOINTS.API}${API_ENDPOINTS.ROLE}`);

export const roleApis = {
  getRolesReq
};
