import { useMutation } from "@tanstack/react-query";
import { authApis } from "@/services/apiServices";
import { ResendEmailCredential } from "@/types/auth";

export const useReSendEmail = () => {
  return useMutation({
    mutationFn: (resendEmailCredentialData: ResendEmailCredential) => authApis.reSendEmailReq(resendEmailCredentialData)
  });
};
