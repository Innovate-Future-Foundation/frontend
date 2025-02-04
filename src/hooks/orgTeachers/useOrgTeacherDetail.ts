import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { orgTeachers } from "@/queries/orgTeachers";

export const useOrgTeacherDetail = (profileId: string) => {
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_ORGTEACHER;

  const {
    data: orgTeacherDetailResponse,
    isLoading: isLoadingOrgTeacherDetail,
    error: errorOrgTeacherDetail,
    isError: isErrorOrgTeacherDetail
  } = useQuery({
    ...orgTeachers.detail(profileId),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profileId
  });

  useErrorNotification(isErrorOrgTeacherDetail, errorTitle, errorOrgTeacherDetail);

  return { orgTeacherDetailResponse, isLoadingOrgTeacherDetail, isErrorOrgTeacherDetail, errorOrgTeacherDetail };
};
