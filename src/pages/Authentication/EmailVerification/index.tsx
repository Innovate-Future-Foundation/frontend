import SuccessAnimation from "@/components/SuccessAnimation";
import { useEmailVerification } from "@/hooks/auth/useEmailVerification";
import { EmailVerificationCredential } from "@/types/auth";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";
import VerificationFail from "../VerificationFail";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";

const EmailVerification = () => {
  const pathname = window.location.href;
  const params = pathname.split("/").at(-1)?.split("?").at(-1);
  const searchParams = new URLSearchParams(params);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const profileId = searchParams.get("pid");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthStore();

  const handleSuccess = () => {
    // redirect to dashboard page
    setIsAuthenticated(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 5000);
  };

  const { error, isError, isPending, isSuccess, mutate } = useEmailVerification({ handleSuccess });

  const handleResendVerificationEmail = () => {
    console.debug("handleResendVerificationEmail...");
    //todo: call ResendVerificationEmail api (email)
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
      {isPending && <FadeLoader />}

      {isSuccess && <SuccessAnimation title={"Verify Email Successfully!"} subtitle={"Redirect to landing page..."} />}

      {isError && <VerificationFail errorMsg={error?.message ?? "An unknown error occurred."} handleButtonClick={handleResendVerificationEmail} />}

      {!isPending && !isSuccess && !isError && <div className="text-center">Waiting for user action...</div>}
    </div>
  );
};

export default EmailVerification;
