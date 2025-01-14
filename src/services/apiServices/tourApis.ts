import { API_ENDPOINTS } from "@/constants/apiConfig";
import appRequest from "@/services/httpClient";
import { Tour } from "@/types";

// Create a new tour
const createTour = (tourData: Tour) => appRequest.post(API_ENDPOINTS.TOUR, tourData);

// Get a tour by ID
const getTourById = (id: string) => appRequest.get(`${API_ENDPOINTS.TOUR}/${id}`);

export const tourApis = {
  createTour,
  getTourById
};
