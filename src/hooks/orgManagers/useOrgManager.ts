import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { keepPreviousData } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ProfilePaginatedRequest } from "@/types";
import { orgManagers } from "@/queries/orgManagers";
<<<<<<< HEAD
import { useAuth } from "../useAuth";

export const useOrgManager = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  const { organisationId } = useAuth();
=======

export const useOrgManager = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  console.log("profilePaginatedRequest", profilePaginatedRequest);

>>>>>>> 52b4503 (feat: add profile apis)
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_ORGMANEGERS;

  const {
    data: orgManagersResponse,
    isLoading: isLoadingOrgManagers,
    error: errorOrgManagers,
    isError: isErrorOrgManagers
  } = useQuery({
<<<<<<< HEAD
    ...orgManagers.list(profilePaginatedRequest, organisationId),
=======
    ...orgManagers.list(profilePaginatedRequest),
>>>>>>> 52b4503 (feat: add profile apis)
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
