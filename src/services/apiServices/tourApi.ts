import { API_ENDPOINTS } from "@/constants/apiConfig";
import { tourType } from "@/types";
import request from "../httpClient";

// Create a new tour
const createTour = (tourData: tourType) => request.post(API_ENDPOINTS.TOUR, tourData);

// Read (get) a tour by ID
const getTourById = (id: string) => request.get(`${API_ENDPOINTS.TOUR}/${id}`);

export const tourApis = {
  createTour,
  getTourById
};
