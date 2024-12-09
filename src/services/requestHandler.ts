import { ERROR_MESSAGES } from "@/constants/errorMessages";
import request from "./httpClient";
import { API_BASE_URL } from "@/constants/apiConfig";

// Avoids duplicate requests while a previous request is in progress
const requestHandler = (() => {
  let hasRequest: string[] = [];

  // Return the request handler
  return async <T>(config: { endpoint: string; method?: string; params?: any; data?: any }): Promise<T> => {
    // default method to GET
    const { endpoint, method = "GET", ...rest } = config;

    const url = `${API_BASE_URL}${endpoint}`;

    if (hasRequest.includes(url)) {
      return Promise.reject(new Error(ERROR_MESSAGES.DUPLICATE_REQUEST));
    }

    hasRequest.push(url);

    try {
      const response = await request({ ...config, method, ...rest });
      hasRequest = hasRequest.filter(item => item !== url);

      return response.data;
    } catch (error) {
      hasRequest = hasRequest.filter(item => item !== url);

      return Promise.reject(error);
    }
  };
})();

export { requestHandler as appRequest };
