import { createQueryKeys } from "@lukemorales/query-key-factory";
import { ApiResponse, ProfilePaginatedRequest, Profile, RoleType } from "@/types";
import { convertToQueryParams } from "@/utils/formatters";
import { profileApis } from "@/services/apiServices";

export const contacts = createQueryKeys("contacts", {
  all: null,

  list: (params: ProfilePaginatedRequest, organisationId: string, role: RoleType) => ({
    queryKey: [{ params }],
    queryFn: async () => {
      const getContactsReq = profileApis.getContacts(role);
      const response = await getContactsReq(convertToQueryParams(params), organisationId);
      return response.data as ApiResponse<Profile>;
    }
  })
});
