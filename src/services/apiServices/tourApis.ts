import { API_ENDPOINTS } from "@/constants/apiConfig";
import { Tour } from "@/types";
import appRequest from "@/services/httpClient";

const createTour = (tourData: Tour) => appRequest.post(API_ENDPOINTS.TOUR, tourData);

const getTourById = (id: string) => appRequest.get(`${API_ENDPOINTS.TOUR}/${id}`);

export const tourApis = {
  createTour,
  getTourById
};
