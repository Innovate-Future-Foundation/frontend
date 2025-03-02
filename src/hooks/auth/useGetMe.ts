import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { userInfo } from "@/queries/auth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";

export const useGetMe = ({ enabled }: { enabled: boolean }) => {
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_USER_INFO;
  const {
    data: myDetailResponse,
    isLoading: isLoadingGetMe,
    error: errorGetMe,
    isError: isErrorGetMe,
    isSuccess: isSuccessGetMe
  } = useQuery({
    ...userInfo.detail(),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: enabled
  });

  useErrorNotification(isErrorGetMe, errorTitle, errorGetMe);

  return { isLoadingGetMe, myDetailResponse, isErrorGetMe, errorGetMe, isSuccessGetMe };
};
