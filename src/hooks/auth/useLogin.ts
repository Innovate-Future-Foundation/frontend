import { useMutation } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "../useErrorNotification";
import { useState } from "react";
import { authApis } from "@/services/apiServices";
import { LoginCredential } from "@/types/auth";

interface useLoginProps {
  handleSuccess: () => void;
  handleError: () => void;
}

export const useLogin = ({ handleSuccess, handleError }: useLoginProps) => {
  const [errorLogin, setErrorLogin] = useState<Error>();
  const [isErrorLogin, setIsErrorLogin] = useState<boolean>(true);

  const errorTitle = ERROR_MESSAGES.FAIL_TO_LOGIN;

  useErrorNotification(isErrorLogin, errorTitle, errorLogin);

  return useMutation({
    mutationFn: (loginCredentialData: LoginCredential) => authApis.loginReq(loginCredentialData),
    onSuccess: () => {
      handleSuccess();
    },
    onError: error => {
      handleError();
      setErrorLogin(error);
      setIsErrorLogin(true);
    }
  });
};
