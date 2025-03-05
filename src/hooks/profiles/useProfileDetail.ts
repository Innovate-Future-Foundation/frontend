import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { profiles } from "@/queries/profiles";

export const useProfileDetail = (id: string) => {
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_PROFILE;

  const {
    data: profileDetailResponse,
    isLoading: isLoadingProfileDetail,
    error: errorProfileDetail,
    isError: isErrorProfileDetail
  } = useQuery({
    ...profiles.detail(id),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!id
  });

  useErrorNotification(isErrorProfileDetail, errorTitle, errorProfileDetail);

  return { profileDetailResponse, isLoadingProfileDetail, isErrorProfileDetail, errorProfileDetail };
};
