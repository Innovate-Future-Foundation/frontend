import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "../useErrorNotification";
import { useState } from "react";
import { Profile } from "@/types";
import { profileApis } from "@/services/apiServices";

interface useUpdateOrgManagerProps {
  handleSuccess: () => void;
  handleError: () => void;
}

export const useUpdateOrgManager = ({ handleSuccess, handleError }: useUpdateOrgManagerProps) => {
  const [errorOrgManagers, setErrorOrgManagers] = useState<Error>();
  const [isErrorOrgManagers, setIsErrorOrgManagers] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const errorTitle = ERROR_MESSAGES.FAIL_TO_SAVE_ORGMANEGER;

  useErrorNotification(isErrorOrgManagers, errorTitle, errorOrgManagers);

  return useMutation({
    mutationFn: ({ id, bodyData }: { id: string; bodyData: Profile }) => profileApis.updateProfile(id, bodyData),
    onSuccess: () => {
      handleSuccess();
      queryClient.invalidateQueries({ queryKey: ["orgManagers"] });
    },
    onError: error => {
      handleError();
      setErrorOrgManagers(error);
      setIsErrorOrgManagers(true);
    }
  });
};
