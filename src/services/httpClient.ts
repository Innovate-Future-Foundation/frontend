import axios from "axios";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { API_BASE_URL, API_REQUEST_TIMEOUT, WHITE_LIST_API } from "@/constants/apiConfig";

const appRequest = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_REQUEST_TIMEOUT,
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
});

// handle request
appRequest.interceptors.request.use(
  config => {
    let path;

    if (/^https?:\/\//i.test(config.url ?? "")) {
      path = new URL(config.url ?? "").pathname;
    } else {
      path = new URL(config.url ?? "", API_BASE_URL).pathname;
    }

    const accessToken = localStorage.getItem("accessToken");

    // Check if the path is not in the whitelist and token exists
    if (!WHITE_LIST_API.includes(path) && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    console.error("Request Error:", error);
    return Promise.reject(new Error(error));
  }
);

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
