import { useMutation } from "@tanstack/react-query";
import { authApis } from "@/services/apiServices";
import { EmailVerificationCredential } from "@/types/auth";

interface EmailVerificationProps {
  handleSuccess: () => void;
}

export const useEmailVerification = ({ handleSuccess }: EmailVerificationProps) => {
  return useMutation({
    mutationFn: (emailVerificationCredentialData: EmailVerificationCredential) => authApis.emailVerificationReq(emailVerificationCredentialData),
    onSuccess: () => {
      handleSuccess();
    }
  });
};
