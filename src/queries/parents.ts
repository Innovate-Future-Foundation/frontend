import { createQueryKeys } from "@lukemorales/query-key-factory";
import { ApiResponse, ProfilePaginatedRequest, Profile } from "@/types";
import { convertToQueryParams } from "@/utils/formatters";
import { profileApis } from "@/services/apiServices";

export const parents = createQueryKeys("parents", {
  all: null,

  list: (params: ProfilePaginatedRequest) => ({
    queryKey: [{ params }],
    queryFn: async () => {
      const response = await profileApis.getParents(convertToQueryParams(params));
      return response.data as ApiResponse<Profile>;
    }
  }),

  detail: (profileId: string) => ({
    queryKey: [profileId],
    queryFn: async () => {
      const response = await profileApis.getProfileById(profileId);
      return response.data as ApiResponse<Profile>;
    }
  })
});
