import React from "react";

interface SuccessAnimationProps {
  title?: string;
  subtitle?: string;
}
const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ title, subtitle }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center space-y-8">
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
        <div className="absolute top-0 right-0 w-3 h-3 bg-blue-300 rounded-full animate-float-1" />
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-yellow-300 rounded-full animate-float-2" />
        <div className="absolute top-1/2 left-0 w-2 h-2 bg-green-300 rounded-full animate-float-3" />
        <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-purple-300 rounded-full animate-float-4" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
      </div>
    </div>
  );
};

export default SuccessAnimation;
