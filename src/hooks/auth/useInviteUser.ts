import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "../useErrorNotification";
import { useState } from "react";
import { authApis } from "@/services/apiServices";
import { InviteUserCredential } from "@/types/auth";

interface useInviteUserProps {
  handleSuccess?: () => void;
  handleError?: () => void;
}

export const useInviteUser = ({ handleSuccess, handleError }: useInviteUserProps) => {
  const [errorInviteUser, setErrorInviteUser] = useState<Error>();
  const [isErrorInviteUser, setIsErrorInviteUser] = useState<boolean>(true);

  const errorTitle = ERROR_MESSAGES.FAIL_TO_INVITE_USER;
  const queryClient = useQueryClient();

  useErrorNotification(isErrorInviteUser, errorTitle, errorInviteUser);

  return useMutation({
    mutationFn: (inviteUserCredentialData: InviteUserCredential) => authApis.inviteUserReq(inviteUserCredentialData),
    onSuccess: () => {
      handleSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: error => {
      handleError?.();
      setErrorInviteUser(error);
      setIsErrorInviteUser(true);
    }
  });
};
