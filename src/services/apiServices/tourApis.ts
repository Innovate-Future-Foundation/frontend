import { API_ENDPOINTS } from "@/constants/apiConfig";
import { tourType } from "@/types";
import appRequest from "@/services/httpClient";

// Create a new tour
const createTour = (tourData: tourType) => appRequest.post(API_ENDPOINTS.TOUR, tourData);

// Get a tour by ID
const getTourById = (id: string) => appRequest.get(`${API_ENDPOINTS.TOUR}/${id}`);

export const tourApis = {
  createTour,
  getTourById
};
