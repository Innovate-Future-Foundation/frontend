import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { keepPreviousData } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ProfilePaginatedRequest } from "@/types";
import { profiles } from "@/queries/profiles";
import { useUserStore } from "@/store";

export const useOrgTeacher = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  const { organisaitonProfile } = useUserStore();
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_ORGTEACHERS;

  const {
    data: orgTeachersResponse,
    isLoading: isLoadingOrgTeachers,
    error: errorOrgTeachers,
    isError: isErrorOrgTeachers
  } = useQuery({
    ...profiles.orgTeacherslist(profilePaginatedRequest, organisaitonProfile?.id ?? ""),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profilePaginatedRequest.limit
  });

  useErrorNotification(isErrorOrgTeachers, errorTitle, errorOrgTeachers);

  return { orgTeachersResponse, isLoadingOrgTeachers, isErrorOrgTeachers, errorOrgTeachers };
};
