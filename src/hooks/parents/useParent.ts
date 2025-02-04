import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { keepPreviousData } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ProfilePaginatedRequest } from "@/types";
import { parents } from "@/queries/parents";
<<<<<<< HEAD
import { useAuth } from "../useAuth";

export const useParent = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  const { organisationId } = useAuth();
=======

export const useParent = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  console.log("profilePaginatedRequest", profilePaginatedRequest);

>>>>>>> 52b4503 (feat: add profile apis)
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_PARENT;

  const {
    data: parentsResponse,
    isLoading: isLoadingParents,
    error: errorParents,
    isError: isErrorParents
  } = useQuery({
<<<<<<< HEAD
    ...parents.list(profilePaginatedRequest, organisationId),
=======
    ...parents.list(profilePaginatedRequest),
>>>>>>> 52b4503 (feat: add profile apis)
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
