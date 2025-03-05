import { createQueryKeys } from "@lukemorales/query-key-factory";
import { ApiResponse, Profile } from "@/types";

import { authApis } from "@/services/apiServices";

export const userInfo = createQueryKeys("user", {
  detail: () => ({
    queryKey: ["GETME"],
    queryFn: async () => {
      const response = await authApis.getMeReq();
      const apiResponse = response.data as ApiResponse<Profile>;
      return apiResponse?.data as Profile;
    }
  })
});
