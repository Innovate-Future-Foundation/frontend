import { HoverCard as CNHoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ReactNode } from "react";

interface HoverCardProps {
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
}

const HoverCard: React.FC<HoverCardProps> = ({ trigger, content, className }) => {
  const contentStyle = `w-80 ${className || ""}`;
  return (
    <CNHoverCard>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardContent className={contentStyle}>{content}</HoverCardContent>
    </CNHoverCard>
  );
};
export default HoverCard;
