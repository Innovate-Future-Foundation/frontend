import { API_ENDPOINTS } from "@/constants/apiConfig";
import { appRequest } from "../requestHandler";

const getTourById = (id: string) => appRequest({ endpoint: `${API_ENDPOINTS.TOUR}/${id}` });

export const tourApis = {
  getTourById
};
