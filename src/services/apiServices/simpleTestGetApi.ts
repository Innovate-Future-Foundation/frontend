import { API_ENDPOINTS } from "@/constants/apiConfig";

import appRequest from "@/services/httpClient";

const MockGetQuery = async () => {
  const response = await appRequest.get(API_ENDPOINTS.MockGet);
  return response;
};

export const SimpleTestGetApi = {
  MockGetQuery
};
