import { HoverCard as CNHoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import React, { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

const HoverCard: React.FC<HoverCardProps> = ({ children, content, className }) => {
  return (
    <CNHoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className={className}>{content}</HoverCardContent>
    </CNHoverCard>
  );
};

export default HoverCard;
