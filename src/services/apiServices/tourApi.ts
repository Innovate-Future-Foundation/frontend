import { API_ENDPOINTS } from "@/constants/apiConfig";
import { appRequest } from "../requestHandler";

const getTourById = (id: string) => appRequest({ url: `${API_ENDPOINTS.TOUR}/${id}` });

export const tourApis = {
  getTourById
};
