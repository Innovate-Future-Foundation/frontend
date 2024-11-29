import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosConfig";
import { ERROR_MESSAGES } from "@/constants/errorMessages";

// avoid duplicate request
const requestHandler = (() => {
  let hasRequest: string[] = [];

  return async (config: AxiosRequestConfig) => {
    const url = config.url;

    if (!url) {
      return Promise.reject({ mes: ERROR_MESSAGES.MISSING_URL });
    }

    if (hasRequest.indexOf(url) !== -1) {
      return Promise.reject({ mes: ERROR_MESSAGES.DUPLICATE_REQUEST });
    }

    hasRequest.push(url);

    try {
      const res = await axiosInstance({ ...config });
      hasRequest = hasRequest.filter(item => item !== url);
      return res;
    } catch (error) {
      hasRequest = hasRequest.filter(item => item !== url);
      return Promise.reject(error);
    }
  };
})();

export { requestHandler as request };
