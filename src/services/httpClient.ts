import axios from "axios";
import { API_BASE_URL } from "@/constants/apiConfig";
import { ERROR_MESSAGES } from "@/constants/errorMessages";

const appRequest = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30 * 1000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
});

// handle response
appRequest.interceptors.response.use(
  res => {
    // get 2** response
    return res;
  },
  error => {
    let errorMsg = ERROR_MESSAGES.UNKNOWN;
    // Handle network and timeout errors
    if (error.message.includes("Network Error")) {
      errorMsg = ERROR_MESSAGES.NETWORK_ERROR;
    } else if (error.code === "ECONNABORTED") {
      errorMsg = ERROR_MESSAGES.TIME_OUT;
    }
    // Handle HTTP errors with response status
    if (error.response) {
      const statusCode = error.response.status;

      switch (statusCode) {
        case 401:
          errorMsg = ERROR_MESSAGES.UNAUTHORIZED;
          break;
        case 403:
          errorMsg = ERROR_MESSAGES.FORBIDDEN;
          break;
        case 409:
          errorMsg = ERROR_MESSAGES.CONFLICT;
          break;
        default:
          errorMsg = ERROR_MESSAGES.UNKNOWN;
          break;
      }
      console.error(`Error occurred: HTTP ${statusCode}; ${errorMsg}`);
    } else {
      console.error(`Error occurred: ${errorMsg}`);
    }
    return Promise.reject(new Error(errorMsg));
  }
);

export default appRequest;
