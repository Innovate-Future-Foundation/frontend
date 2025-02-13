import { Tooltip as CNTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, className }) => {
  return (
    <TooltipProvider>
      <CNTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={className}>
          <p>{content}</p>
        </TooltipContent>
      </CNTooltip>
    </TooltipProvider>
  );
};
