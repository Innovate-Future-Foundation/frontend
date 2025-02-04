import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { keepPreviousData } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ProfilePaginatedRequest } from "@/types";
import { orgTeachers } from "@/queries/orgTeachers";
<<<<<<< HEAD
import { useAuth } from "../useAuth";

export const useOrgTeacher = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  const { organisationId } = useAuth();
=======

export const useOrgTeacher = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  console.log("profilePaginatedRequest", profilePaginatedRequest);

>>>>>>> 52b4503 (feat: add profile apis)
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_ORGTEACHERS;

  const {
    data: orgTeachersResponse,
    isLoading: isLoadingOrgTeachers,
    error: errorOrgTeachers,
    isError: isErrorOrgTeachers
  } = useQuery({
<<<<<<< HEAD
    ...orgTeachers.list(profilePaginatedRequest, organisationId),
=======
    ...orgTeachers.list(profilePaginatedRequest),
>>>>>>> 52b4503 (feat: add profile apis)
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
