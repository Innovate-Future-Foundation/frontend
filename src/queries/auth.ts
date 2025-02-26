import { createQueryKeys } from "@lukemorales/query-key-factory";
import { ApiResponse } from "@/types";

import { authApis } from "@/services/apiServices";
import { MyInfo } from "@/types/auth";

export const userInfo = createQueryKeys("user", {
  detail: () => ({
    queryKey: ["GETME"],
    queryFn: async () => {
      const response = await authApis.getMeReq();
      return response.data as ApiResponse<MyInfo>;
    }
  })
});
