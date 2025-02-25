import { useMutation } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "../useErrorNotification";
import { useState } from "react";
import { authApis } from "@/services/apiServices";
import { RegisterOrgWithAdminCredentials } from "@/types/auth";

interface useRegisterProps {
  handleSuccess: () => void;
  handleError: () => void;
}

export const useRegister = ({ handleSuccess, handleError }: useRegisterProps) => {
  const [errorRegister, setErrorRegister] = useState<Error>();
  const [isErrorRegister, setIsErrorRegister] = useState<boolean>(true);

  const errorTitle = ERROR_MESSAGES.FAIL_TO_REGISTER;

  useErrorNotification(isErrorRegister, errorTitle, errorRegister);

  return useMutation({
    mutationFn: (orgWithAdminCredentialsData: RegisterOrgWithAdminCredentials) => authApis.registerOrgWithAdminReq(orgWithAdminCredentialsData),
    onSuccess: () => {
      handleSuccess();
    },
    onError: error => {
      handleError();
      setErrorRegister(error);
      setIsErrorRegister(true);
    }
  });
};
