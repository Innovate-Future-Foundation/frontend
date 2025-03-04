import { useMutation } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "../useErrorNotification";
import { useState } from "react";
import { authApis } from "@/services/apiServices";
import { RegisterOrgWithAdminCredentials } from "@/types/auth";

interface useRegisterProps {
  handleSuccess: () => void;
}

export const useRegister = ({ handleSuccess }: useRegisterProps) => {
  const [errorRegister, setErrorRegister] = useState<Error>();
  const [isErrorRegister, setIsErrorRegister] = useState<boolean>(true);

  const errorTitle = ERROR_MESSAGES.FAIL_TO_REGISTER;

  useErrorNotification(isErrorRegister, errorTitle, errorRegister);

  return useMutation({
    mutationFn: (orgWithAdminCredentialsData: RegisterOrgWithAdminCredentials) => authApis.signupOrgWithAdminReq(orgWithAdminCredentialsData),
    onSuccess: () => {
      handleSuccess();
    },
    onError: error => {
      setErrorRegister(error);
      setIsErrorRegister(true);
    }
  });
};
