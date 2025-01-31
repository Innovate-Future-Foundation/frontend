import { API_ENDPOINTS } from "@/constants/apiConfig";
import { Organisation } from "@/types";
import appRequest from "@/services/httpClient";

const createOrganisation = (bodyData: Organisation) => appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.ORGANISATION}`, bodyData);

const getOrganisationById = (id: string) => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.ORGANISATION}/${id}`);

const getOrganisations = (queryData: URLSearchParams) => appRequest.get(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.ORGANISATION}?${queryData}`);

const removeOrganisation = (id: string) => appRequest.put(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.ORGANISATION}/${id}`, { status: "suspended" });

const updateOrganisation = (id: string, bodyData: Organisation) => appRequest.put(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.ORGANISATION}/${id}`, bodyData);

export const organisationApis = {
  createOrganisation,
  getOrganisationById,
  getOrganisations,
  removeOrganisation,
  updateOrganisation
};
