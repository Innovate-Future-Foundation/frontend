import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { TitleWithIcon, TitleWithIconProps } from "@/components/TitleWithIcon";
import { Button } from "@/components/ui/button";

export interface ContentLayoutProps extends TitleWithIconProps {
  children?: ReactNode;
  onInviteClick?: () => void;
  inviteLabel?: string;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ children, onInviteClick, inviteLabel, ...props }) => (
  <div className="w-full flex flex-col justify-center">
    <div className="flex justify-between items-center w-full bg-accent px-6">
      <TitleWithIcon {...props} />
      {onInviteClick && (
        <Button className="capitalize active:scale-95 transition-transform duration-100" onClick={onInviteClick}>
          <Plus className="h-4 w-4 mr-2" />
          {inviteLabel}
        </Button>
      )}
    </div>
    <div className="px-6">{children}</div>
  </div>
);
export default ContentLayout;
