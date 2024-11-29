import { API_BASE_URL } from "@/constants/apis";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30 * 1000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
});

//todo: interceptors config for token adding in the header
//todo: interceptors config for handling different response status code

export default axiosInstance;
