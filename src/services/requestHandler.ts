import { ERROR_MESSAGES } from "@/constants/errorMessages";
import request from "./httpClient";
import { AxiosRequestConfig, AxiosResponse } from "axios";

// Avoids duplicate requests while a previous request is in progress
const requestHandler = (() => {
  let hasRequest: string[] = [];

  // Return the request handler
  return async <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const { url, method } = config;
    // default method to GET
    const methodReq = method ? method : "GET";

    if (url && hasRequest.includes(url)) {
      return Promise.reject(new Error(ERROR_MESSAGES.DUPLICATE_REQUEST));
    }

    if (url) hasRequest.push(url);

    try {
      const response = await request({ ...config, method: methodReq });
      hasRequest = hasRequest.filter(item => item !== url);

      return response;
    } catch (error) {
      hasRequest = hasRequest.filter(item => item !== url);

      return Promise.reject(error);
    }
  };
})();

export { requestHandler as appRequest };
