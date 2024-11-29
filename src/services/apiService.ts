import { API_ENDPOINTS } from "@/constants/apis";
import { request } from "./requestHandler";

const apiMethods = {
  login: (credentials: { username: string; password: string }) => request({ url: `${API_ENDPOINTS.USER}/login`, method: "POST", data: credentials })
};

export default apiMethods;
