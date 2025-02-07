import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { keepPreviousData } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ProfilePaginatedRequest } from "@/types";
import { useAuth } from "../useAuth";
import { profiles } from "@/queries/profiles";

export const useOrgTeacher = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  const { organisationId } = useAuth();
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_ORGTEACHERS;

  const {
    data: orgTeachersResponse,
    isLoading: isLoadingOrgTeachers,
    error: errorOrgTeachers,
    isError: isErrorOrgTeachers
  } = useQuery({
    ...profiles.orgTeacherslist(profilePaginatedRequest, organisationId),
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
