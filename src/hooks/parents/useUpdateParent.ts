import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "../useErrorNotification";
import { useState } from "react";
import { Profile } from "@/types";
import { profileApis } from "@/services/apiServices";

interface useUpdateParentProps {
  handleSuccess: () => void;
  handleError: () => void;
}

export const useUpdateParent = ({ handleSuccess, handleError }: useUpdateParentProps) => {
  const [errorParents, setErrorParents] = useState<Error>();
  const [isErrorParents, setIsErrorParents] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const errorTitle = ERROR_MESSAGES.FAIL_TO_SAVE_PARENT;

  useErrorNotification(isErrorParents, errorTitle, errorParents);

  return useMutation({
    mutationFn: ({ id, bodyData }: { id: string; bodyData: Profile }) => profileApis.updateProfile(id, bodyData),
    onSuccess: () => {
      handleSuccess();
      queryClient.invalidateQueries({ queryKey: ["parents"] });
    },
    onError: error => {
      handleError();
      setErrorParents(error);
      setIsErrorParents(true);
    }
  });
};
