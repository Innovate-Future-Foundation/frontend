import { useMutation } from "@tanstack/react-query";
import { authApis } from "@/services/apiServices";
import { ResetPasswordCredential } from "@/types/auth";

interface ResetPasswordProps {
  handleSuccess: () => void;
}

export const useResetPassword = ({ handleSuccess }: ResetPasswordProps) => {
  return useMutation({
    mutationFn: (resetPasswordCredentialData: ResetPasswordCredential) => authApis.resetPasswordReq(resetPasswordCredentialData),
    onSuccess: () => {
      handleSuccess();
    }
  });
};
