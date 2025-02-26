import ErrorAnimation from "@/components/ErrorAnimation";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface VerificationFailProps {
  handleButtonClick?: () => void;
  errorMsg: string;
}

const VerificationFail: React.FC<VerificationFailProps> = ({ handleButtonClick, errorMsg }) => {
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
      key="error"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="h-full flex items-center w-full"
    >
      <div className="w-full max-w-[460px]">
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-8">
          <ErrorAnimation title={"Verify Email Failed"} subTitle={errorMsg} />
          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            {countdown > 0 ? (
              <span>Retry send verification email {countdown}s</span>
            ) : (
              <>
                <span>Want to try again?</span>
                <a
                  className="font-bold text-secondary-foreground hover:text-secondary-foreground/80 cursor-pointer"
                  onClick={() => {
                    handleButtonClick?.();
                    setCountdown(60);
                  }}
                >
                  Resend verification email
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationFail;
