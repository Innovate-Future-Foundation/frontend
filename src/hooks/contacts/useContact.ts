import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { keepPreviousData } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ProfilePaginatedRequest } from "@/types";
import { contacts } from "@/queries/contacts";
import { useUserStore } from "@/store";

export const useContact = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  const { organisaitonProfile, role } = useUserStore();
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_CONTACTS;

  const {
    data: contactsResponse,
    isLoading: isLoadingContacts,
    error: errorContacts,
    isError: isErrorContacts
  } = useQuery({
    ...contacts.list(profilePaginatedRequest, organisaitonProfile?.id ?? "", role!),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profilePaginatedRequest.limit
  });

  useErrorNotification(isErrorContacts, errorTitle, errorContacts);

  return { contactsResponse, isLoadingContacts, isErrorContacts, errorContacts };
};
