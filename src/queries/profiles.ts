import { createQueryKeys } from "@lukemorales/query-key-factory";
import { ApiResponse, Profile } from "@/types";
import { profileApis } from "@/services/apiServices";

export const profiles = createQueryKeys("profiles", {
  all: null,

  detail: (profileId: string) => ({
    queryKey: [profileId],
    queryFn: async () => {
      const response = await profileApis.getProfileById(profileId);
      return response.data as ApiResponse<Profile>;
    }
  })
});
