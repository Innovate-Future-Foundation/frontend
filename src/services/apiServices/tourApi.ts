import { API_ENDPOINTS } from "@/constants/apiConfig";
import { tourType } from "@/types";
import request from "../httpClient";

// Create a new tour
const createTour = (tourData: tourType) =>
  request({
    url: API_ENDPOINTS.TOUR,
    method: "POST",
    data: tourData
  });

// Read (get) a tour by ID
const getTourById = (id: string) =>
  request({
    url: `${API_ENDPOINTS.TOUR}/${id}`
  });

export const tourApis = {
  createTour,
  getTourById
};
