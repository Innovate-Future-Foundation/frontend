import SuccessAnimation from "@/components/SuccessAnimation";
import ErrorAnimation from "@/components/ErrorAnimation";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface EmailSendAnimationProps {
  handleButtonClick?: () => void;
  isInitalSuccess?: boolean;
  isResendSuccess: boolean;
  message?: string;
}

const EmailSendAnimation: React.FC<EmailSendAnimationProps> = ({ handleButtonClick, isInitalSuccess, isResendSuccess, message }) => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <motion.div
      key={isResendSuccess || isInitalSuccess ? "success" : "error"}
      initial={{ opacity: 0, y: isResendSuccess || isInitalSuccess ? 0 : -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: isResendSuccess || isInitalSuccess ? -200 : 200 }}
      className="flex items-center justify-center"
    >
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-8">
        {isResendSuccess || isInitalSuccess ? (
          <SuccessAnimation
            title={isInitalSuccess && !isResendSuccess ? "Send Email Sent!" : "Resend Email Successfully!"}
            subtitle="Please check your email to verify your email."
          />
        ) : (
          <ErrorAnimation title="Verify Email Failed" subTitle={message || "Something went wrong."} />
        )}

        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          {countdown > 0 ? (
            <span>{isResendSuccess ? `Resend Send email in ${countdown}s` : `Retry send Send email in ${countdown}s`}</span>
          ) : (
            <>
              <span>{isResendSuccess ? "Didn't receive the email?" : "Want to try again?"}</span>
              <a
                className="font-bold text-secondary-foreground hover:text-secondary-foreground/80 cursor-pointer"
                onClick={() => {
                  handleButtonClick?.();
                  setCountdown(60);
                }}
              >
                {isResendSuccess ? "Resend" : "Resend email"}
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EmailSendAnimation;
