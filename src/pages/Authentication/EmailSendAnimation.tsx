import SuccessAnimation from "@/components/SuccessAnimation";
import ErrorAnimation from "@/components/ErrorAnimation";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface EmailSendAnimationProps {
  handleButtonClick?: () => void;
  isSuccess?: boolean;
  message?: string;
}

const EmailSendAnimation: React.FC<EmailSendAnimationProps> = ({ handleButtonClick, isSuccess, message }) => {
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
      key={isSuccess ? "success" : "error"}
      initial={{ opacity: 0, y: isSuccess ? 0 : -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: isSuccess ? -200 : 200 }}
      className="flex items-center justify-center"
    >
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-8">
        {message ? (
          <ErrorAnimation title="Verify Email Failed" subTitle={message || "Something went wrong."} />
        ) : (
          <SuccessAnimation title={"Email Sent!"} subtitle="Please check your email." />
        )}

        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          {countdown > 0 ? (
            <span>{isSuccess ? `Resend Send email in ${countdown}s` : `Retry send Send email in ${countdown}s`}</span>
          ) : (
            <>
              <span>{isSuccess ? "Didn't receive the email?" : "Want to try again?"}</span>
              <a
                className="font-bold text-secondary-foreground hover:text-secondary-foreground/80 cursor-pointer"
                onClick={() => {
                  handleButtonClick?.();
                  setCountdown(60);
                }}
              >
                {isSuccess ? "Resend" : "Resend email"}
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EmailSendAnimation;
