import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface SuccessAnimationProps {
  handleButtonClick?: () => void;
}
const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ handleButtonClick }) => {
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
    <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -200 }} className="h-full flex items-center w-full">
      <div className="w-full max-w-[460px]">
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-8">
          {/* Green Check Animation */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-scale-up" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path className="animate-check" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {/* Floating Dots */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-blue-300 rounded-full animate-float-1" />
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-yellow-300 rounded-full animate-float-2" />
            <div className="absolute top-1/2 left-0 w-2 h-2 bg-green-300 rounded-full animate-float-3" />
            <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-purple-300 rounded-full animate-float-4" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Verification Email Sent!</h1>
            <p className="text-sm text-muted-foreground mt-2">Please check your email to verify your email.</p>
          </div>

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

export default SuccessAnimation;
