import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { TitleWithIcon, TitleWithIconProps } from "@/components/TitleWithIcon";
import { Button } from "@/components/ui/button";
import InviteModal, { FormInputs } from "@/pages/Dashboard/components/InviteModal";
import { RoleType } from "@/types";

export interface ContentLayoutProps extends TitleWithIconProps {
  children?: ReactNode;
  onButtonClick?: () => void;
  buttonLabel?: string;
  onInviteClick?: (data: FormInputs) => Promise<void>;
  inviteLabel?: string;
  roleInvited?: RoleType;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  onButtonClick,
  buttonLabel,
  onInviteClick,
  inviteLabel,
  roleInvited = "Student",
  ...props
}) => (
  <div className="w-full flex flex-col justify-center">
    <div className="flex justify-between items-center w-full bg-accent px-6">
      <TitleWithIcon {...props} />
      {onInviteClick ? (
        <InviteModal roleInvited={roleInvited} onSubmit={onInviteClick}>
          <Button className="capitalize active:scale-95 transition-transform duration-100">
            <Plus className="h-4 w-4 mr-2" />
            {inviteLabel}
          </Button>
        </InviteModal>
      ) : (
        onButtonClick &&
        buttonLabel && (
          <Button onClick={onButtonClick} className="capitalize active:scale-95 transition-transform duration-100">
            <Plus className="h-4 w-4 mr-2" />
            {buttonLabel}
          </Button>
        )
      )}
    </div>
    <div className="px-6">{children}</div>
  </div>
);

export default ContentLayout;
