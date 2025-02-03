import { useMutation, useQueryClient } from "@tanstack/react-query";
import { organisations } from "@/queries/organisations";
import { organisationApis } from "@/services/apiServices/organisationApis";
import { Organisation } from "@/types";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "./useErrorNotification";
import { useState } from "react";

interface useUpdateOrganisationProps {
  handleSuccess: () => void;
  handleError: () => void;
}

export const useUpdateOrganisation = ({ handleSuccess, handleError }: useUpdateOrganisationProps) => {
  const [errorOrganisations, setErrorOrganisations] = useState<Error>();
  const [isErrorOrganisations, setIsErrorOrganisations] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const errorTitle = ERROR_MESSAGES.FAIL_TO_SAVE_ORGANISATION;

  useErrorNotification(isErrorOrganisations, errorTitle, errorOrganisations);

  return useMutation({
    mutationFn: ({ id, bodyData }: { id: string; bodyData: Organisation }) => organisationApis.updateOrganisation(id, bodyData),
    onSuccess: (updatedOrg: Organisation) => {
      handleSuccess();
      queryClient.setQueryData(organisations.detail(updatedOrg.orgId!).queryKey, updatedOrg);
    },
    onError: error => {
      handleError();
      setErrorOrganisations(error);
      setIsErrorOrganisations(true);
    }
  });
};
