import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { parents } from "@/queries/parents";

export const useParentDetail = (profileId: string) => {
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_PARENT;

  const {
    data: parentsDetailResponse,
    isLoading: isLoadingParentDetail,
    error: errorParentDetail,
    isError: isErrorParentDetail
  } = useQuery({
    ...parents.detail(profileId),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profileId
  });

  useErrorNotification(isErrorParentDetail, errorTitle, errorParentDetail);

  return { parentsDetailResponse, isLoadingParentDetail, isErrorParentDetail, errorParentDetail };
};
