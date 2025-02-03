import { createQueryKeys } from "@lukemorales/query-key-factory";
import { organisationApis } from "@/services/apiServices/organisationApis";
import { Organisation, OrganisationPaginatedRequest, ApiResponse } from "@/types";
import { convertToQueryParams } from "@/utils/formatters";

export const organisations = createQueryKeys("organisations", {
  all: null,

  list: (params: OrganisationPaginatedRequest) => ({
    queryKey: [{ params }],
    queryFn: async () => {
      const response = await organisationApis.getOrganisations(convertToQueryParams(params));
      return response.data as ApiResponse<Organisation>;
    }
  }),

  detail: (orgId: string) => ({
    queryKey: [orgId],
    queryFn: async () => {
      const response = await organisationApis.getOrganisationById(orgId);
      return response.data as ApiResponse<Organisation>;
    }
  })
});
