import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { students } from "@/queries/students";

export const useStudentDetail = (profileId: string) => {
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_STUDENT;

  const {
    data: studentDetailResponse,
    isLoading: isLoadingStudentDetail,
    error: errorStudentDetail,
    isError: isErrorStudentDetail
  } = useQuery({
    ...students.detail(profileId),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profileId
  });

  useErrorNotification(isErrorStudentDetail, errorTitle, errorStudentDetail);

  return { studentDetailResponse, isLoadingStudentDetail, isErrorStudentDetail, errorStudentDetail };
};
