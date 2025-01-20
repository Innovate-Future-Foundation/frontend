import { WalletCards } from "lucide-react";

import { TitleWithIcon } from "@/components/TitleWithIcon";
import ProfileForm from "./ProfileForm";
import { RoleType } from "@/types";

const ProfileDetailPage: React.FC<{ role: RoleType }> = ({ role }) => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center">
      <TitleWithIcon icon={WalletCards} title={`${role} profile`} />
      <ProfileForm />
    </div>
  );
};

export default ProfileDetailPage;
