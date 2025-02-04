import { organisations } from "@/queries/organisations";
import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { keepPreviousData } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { OrganisationPaginatedRequest } from "@/types";

export const useOrganisation = (organisationPaginatedRequest: OrganisationPaginatedRequest) => {
  console.log("organisationPaginatedRequest", organisationPaginatedRequest);

  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_ORGANISATIONS;

  const {
    data: organisationsResponse,
    isLoading: isLoadingOrganisations,
    error: errorOrganisations,
    isError: isErrorOrganisations
  } = useQuery({
    ...organisations.list(organisationPaginatedRequest),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!organisationPaginatedRequest.limit
  });

  useErrorNotification(isErrorOrganisations, errorTitle, errorOrganisations);

  return { organisationsResponse, isLoadingOrganisations, isErrorOrganisations, errorOrganisations };
};
