import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ProfileInfo, ProfilePaginatedRequest } from "@/types";
import { useMemo } from "react";
import { profiles } from "@/queries/profiles";
import { useUserStore } from "@/store";

export const useParent = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  const { organisaitonProfile } = useUserStore();
  const errorTitleParent = ERROR_MESSAGES.FAIL_TO_FETCH_PARENT;

  const {
    data: parentsResponse,
    isLoading: isLoadingParents,
    error: errorParents,
    isError: isErrorParents,
    isSuccess: isSuccessGetParents
  } = useQuery({
    ...profiles.parentslist(profilePaginatedRequest, organisaitonProfile?.id ?? ""),
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profilePaginatedRequest.limit
  });

  useErrorNotification(isErrorParents, errorTitleParent, errorParents);

  const parentsData: ProfileInfo[] = useMemo(() => {
    return Array.isArray(parentsResponse?.data) ? parentsResponse?.data : [];
  }, [parentsResponse]);

  return { parentsData, isLoadingParents, isSuccessGetParents, isErrorParents, errorParents };
};
