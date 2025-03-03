import SuccessAnimation from "@/components/SuccessAnimation";
import { useEmailVerification } from "@/hooks/auth/useEmailVerification";
import { EmailVerificationCredential, ResendEmailCredential } from "@/types/auth";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useReSendEmail } from "@/hooks/auth/useReSendEmail";
import EmailVerificationAnimation from "../EmailSendAnimation";

const EmailVerification = () => {
  const pathname = window.location.href;
  const params = pathname.split("/").at(-1)?.split("?").at(-1);
  const searchParams = new URLSearchParams(params);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const profileId = searchParams.get("pid");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = () => {
    // save state
    login();
    // redirect to dashboard page
    setTimeout(() => {
      navigate("/dashboard");
    }, 5000);
  };

  const { error, isPending, isError, isSuccess, mutate } = useEmailVerification({ handleSuccess });

  const reSendEmailMutation = useReSendEmail();

  const handleResendVerificationEmail = () => {
    console.debug("handleResendVerificationEmail...");
    if (email) {
      reSendEmailMutation.mutate({ email } as ResendEmailCredential);
    }
  };

  useEffect(() => {
    if (token && email && profileId) {
      const verifyEmail = async () => {
        mutate({ token, email, profileId } as EmailVerificationCredential);
      };
      verifyEmail();
    }
  }, [mutate, token, email, profileId]);

  return (
    <div className="w-screen h-screen w-max-[1440px] flex items-center justify-center ">
      {isPending || reSendEmailMutation.isPending ? (
        <FadeLoader />
      ) : isSuccess ? (
        <SuccessAnimation title={"Verify Email Successfully!"} subtitle={"Redirect to landing page..."} />
      ) : (
        <EmailVerificationAnimation
          message={error?.message ?? reSendEmailMutation.error?.message}
          handleButtonClick={handleResendVerificationEmail}
          isResendSuccess={reSendEmailMutation.isSuccess}
        />
      )}
      {!isPending && !reSendEmailMutation.isPending && !isSuccess && !isError && <div className="text-center">Waiting for user action...</div>}
    </div>
  );
};

export default EmailVerification;
