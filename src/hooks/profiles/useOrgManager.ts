import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { keepPreviousData } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ProfilePaginatedRequest } from "@/types";
import { profiles } from "@/queries/profiles";
import { useAuthStore } from "@/store";

export const useOrgManager = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  const { organisationId } = useAuthStore();
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_ORGMANEGERS;

  const {
    data: orgManagersResponse,
    isLoading: isLoadingOrgManagers,
    error: errorOrgManagers,
    isError: isErrorOrgManagers
  } = useQuery({
    ...profiles.orgManagerslist(profilePaginatedRequest, organisationId!),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profilePaginatedRequest.limit
  });

  useErrorNotification(isErrorOrgManagers, errorTitle, errorOrgManagers);

  return { orgManagersResponse, isLoadingOrgManagers, isErrorOrgManagers, errorOrgManagers };
};
