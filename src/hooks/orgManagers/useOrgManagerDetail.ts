import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { orgManagers } from "@/queries/orgManagers";

export const useOrgManagerDetail = (profileId: string) => {
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_ORGMANEGER;

  const {
    data: orgManagerDetailResponse,
    isLoading: isLoadingOrgManagerDetail,
    error: errorOrgManagerDetail,
    isError: isErrorOrgManagerDetail
  } = useQuery({
    ...orgManagers.detail(profileId),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profileId
  });

  useErrorNotification(isErrorOrgManagerDetail, errorTitle, errorOrgManagerDetail);

  return { orgManagerDetailResponse, isLoadingOrgManagerDetail, isErrorOrgManagerDetail, errorOrgManagerDetail };
};
