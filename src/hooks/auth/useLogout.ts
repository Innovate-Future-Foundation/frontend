import { useMutation } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "../useErrorNotification";
import { useState } from "react";
import { authApis } from "@/services/apiServices";

interface useLogoutProps {
  handleSuccess: () => void;
  handleError: () => void;
}

export const useLogout = ({ handleSuccess, handleError }: useLogoutProps) => {
  const [errorLogout, setErrorLogout] = useState<Error>();
  const [isErrorLogout, setIsErrorLogout] = useState<boolean>(true);

  const errorTitle = ERROR_MESSAGES.FAIL_TO_LOGOUT;

  useErrorNotification(isErrorLogout, errorTitle, errorLogout);

  return useMutation({
    mutationFn: () => authApis.logoutReq(),
    onSuccess: () => {
      handleSuccess();
    },
    onError: error => {
      handleError();
      setErrorLogout(error);
      setIsErrorLogout(true);
    }
  });
};
