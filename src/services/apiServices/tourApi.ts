import { API_ENDPOINTS } from "@/constants/apiConfig";
import { appRequest } from "../requestHandler";
import { tourType } from "@/types";

// Create a new tour
const createTour = (tourData: tourType) =>
  appRequest({
    url: API_ENDPOINTS.TOUR,
    method: "POST",
    data: tourData
  });

// Read (get) a tour by ID
const getTourById = (id: string) =>
  appRequest({
    url: `${API_ENDPOINTS.TOUR}/${id}`
  });

// Update a tour by ID
const updateTourById = (id: string, updatedData: tourType) =>
  appRequest({
    url: `${API_ENDPOINTS.TOUR}/${id}`,
    method: "PUT",
    data: updatedData
  });

// Delete a tour by ID
const deleteTourById = (id: string) =>
  appRequest({
    url: `${API_ENDPOINTS.TOUR}/${id}`,
    method: "DELETE"
  });

export const tourApis = {
  createTour,
  getTourById,
  updateTourById,
  deleteTourById
};
