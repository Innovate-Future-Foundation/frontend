import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { keepPreviousData } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ProfilePaginatedRequest } from "@/types";
import { parents } from "@/queries/parents";
import { useAuth } from "../useAuth";

export const useParent = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  const { organisationId } = useAuth();
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_PARENT;

  const {
    data: parentsResponse,
    isLoading: isLoadingParents,
    error: errorParents,
    isError: isErrorParents
  } = useQuery({
    ...parents.list(profilePaginatedRequest, organisationId),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profilePaginatedRequest.limit
  });

  useErrorNotification(isErrorParents, errorTitle, errorParents);

  return { parentsResponse, isLoadingParents, isErrorParents, errorParents };
};
