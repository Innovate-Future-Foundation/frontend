import SuccessAnimation from "@/components/SuccessAnimation";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface SendEmailSuccessProps {
  handleButtonClick?: () => void;
}
const SendEmailSuccess: React.FC<SendEmailSuccessProps> = ({ handleButtonClick }) => {
  const [countdown, setCountdown] = useState(0);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <motion.div key="signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -200 }} className="h-full flex items-center w-full">
      <div className="w-full max-w-[460px]">
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-8">
          <SuccessAnimation title={"Verification Email Sent!"} subtitle={"Please check your email to verify your email."} />

          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            {countdown > 0 ? (
              <span>Resend verification email in ${countdown}s</span>
            ) : (
              <>
                <span>Didn't receive the email?</span>
                <a
                  className="font-bold text-secondary-foreground hover:text-secondary-foreground/80 cursor-pointer"
                  onClick={() => {
                    handleButtonClick?.();
                    setCountdown(60);
                  }}
                >
                  Resend
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SendEmailSuccess;
