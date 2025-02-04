import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { keepPreviousData } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ProfilePaginatedRequest } from "@/types";
import { students } from "@/queries/students";

export const useStudent = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  console.log("profilePaginatedRequest", profilePaginatedRequest);

  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_STUDENT;

  const {
    data: studentsResponse,
    isLoading: isLoadingStudents,
    error: errorStudents,
    isError: isErrorStudents
  } = useQuery({
    ...students.list(profilePaginatedRequest),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profilePaginatedRequest.limit
  });

  useErrorNotification(isErrorStudents, errorTitle, errorStudents);

  return { studentsResponse, isLoadingStudents, isErrorStudents, errorStudents };
};
