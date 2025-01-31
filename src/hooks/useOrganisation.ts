import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { organisationApis } from "@/services/apiServices/organisationApis";
import { ApiResponse, Organisation, OrganisationPaginatedRequest } from "@/types";
import { convertToQueryParams } from "@/utils/formatters";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "./useErrorNotification";

export const useOrganisation = (organisationPaginatedRequest: OrganisationPaginatedRequest) => {
  console.log("organisationPaginatedRequest", organisationPaginatedRequest);
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_ORGANISATIONS;

  const getFilteredCars = async () => {
    const response = await organisationApis.getOrganisations(convertToQueryParams(organisationPaginatedRequest));
    const extractedData: ApiResponse<Organisation> = response.data;

    console.log("organisations", extractedData.data);
    console.log("meta", extractedData.meta);

    return extractedData;
  };

  const {
    data: organisationsResponse,
    isLoading: isLoadingOrganisations,
    error: errorOrganisations,
    isError: isErrorOrganisations
  } = useQuery({
    queryKey: [QUERY_KEYS.PAGINATED_ORGANISATIONS_QUERY_KEY, organisationPaginatedRequest],
    queryFn: getFilteredCars,
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
