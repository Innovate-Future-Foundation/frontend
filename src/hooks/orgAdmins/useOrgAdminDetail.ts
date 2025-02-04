import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { orgAdmins } from "@/queries/orgAdmins";

export const useOrgAdminDetail = (profileId: string) => {
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_ORGADMIN;

  const {
    data: orgAdminDetailResponse,
    isLoading: isLoadingOrgAdminDetail,
    error: errorOrgAdminDetail,
    isError: isErrorOrgAdminDetail
  } = useQuery({
    ...orgAdmins.detail(profileId),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profileId
  });

  useErrorNotification(isErrorOrgAdminDetail, errorTitle, errorOrgAdminDetail);

  return { orgAdminDetailResponse, isLoadingOrgAdminDetail, isErrorOrgAdminDetail, errorOrgAdminDetail };
};
