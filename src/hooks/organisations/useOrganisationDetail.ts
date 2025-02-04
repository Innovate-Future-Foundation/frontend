import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { organisations } from "@/queries/organisations";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";

export const useOrganisationDetail = (organisationId: string) => {
  const errorTitle = ERROR_MESSAGES.FAIL_TO_FETCH_ORGANISATIONS;

  const {
    data: organisationDetailResponse,
    isLoading: isLoadingOrganisationDetail,
    error: errorOrganisationDetail,
    isError: isErrorOrganisationDetail
  } = useQuery({
    ...organisations.detail(organisationId),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!organisationId
  });

  useErrorNotification(isErrorOrganisationDetail, errorTitle, errorOrganisationDetail);

  return { organisationDetailResponse, isLoadingOrganisationDetail, isErrorOrganisationDetail, errorOrganisationDetail };
};
