import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "../useErrorNotification";
import { useState } from "react";
import { Profile } from "@/types";
import { profileApis } from "@/services/apiServices";

interface useUpdateOrgAdminProps {
  handleSuccess: () => void;
  handleError: () => void;
}

export const useUpdateOrgAdmin = ({ handleSuccess, handleError }: useUpdateOrgAdminProps) => {
  const [errorOrgAdmins, setErrorOrgAdmins] = useState<Error>();
  const [isErrorOrgAdmins, setIsErrorOrgAdmins] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const errorTitle = ERROR_MESSAGES.FAIL_TO_SAVE_ORGADMIN;

  useErrorNotification(isErrorOrgAdmins, errorTitle, errorOrgAdmins);

  return useMutation({
    mutationFn: ({ id, bodyData }: { id: string; bodyData: Profile }) => profileApis.updateProfile(id, bodyData),
    onSuccess: () => {
      handleSuccess();
      queryClient.invalidateQueries({ queryKey: ["orgAdmins"] });
    },
    onError: error => {
      handleError();
      setErrorOrgAdmins(error);
      setIsErrorOrgAdmins(true);
    }
  });
};
