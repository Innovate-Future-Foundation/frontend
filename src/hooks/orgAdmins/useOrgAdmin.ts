import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { keepPreviousData } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ProfilePaginatedRequest } from "@/types";
import { orgAdmins } from "@/queries/orgAdmins";

export const useOrgAdmin = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  console.log("profilePaginatedRequest", profilePaginatedRequest);

  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_ORGADMINS;

  const {
    data: orgAdminsResponse,
    isLoading: isLoadingOrgAdmins,
    error: errorOrgAdmins,
    isError: isErrorOrgAdmins
  } = useQuery({
    ...orgAdmins.list(profilePaginatedRequest),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profilePaginatedRequest.limit
  });

  useErrorNotification(isErrorOrgAdmins, errorTitle, errorOrgAdmins);

  return { orgAdminsResponse, isLoadingOrgAdmins, isErrorOrgAdmins, errorOrgAdmins };
};
