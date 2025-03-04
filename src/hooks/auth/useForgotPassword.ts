import { useMutation } from "@tanstack/react-query";
import { authApis } from "@/services/apiServices";
import { ForgotPasswordCredential } from "@/types/auth";

interface EmailVerificationProps {
  handleSuccess?: () => void;
}

export const useForgotPassword = ({ handleSuccess }: EmailVerificationProps) => {
  return useMutation({
    mutationFn: (forgotPasswordCredentialData: ForgotPasswordCredential) => authApis.forgotPasswordReq(forgotPasswordCredentialData),
    onSuccess: () => {
      handleSuccess?.();
    }
  });
};
