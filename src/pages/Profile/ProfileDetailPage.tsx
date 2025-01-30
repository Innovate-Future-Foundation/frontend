import { WalletCards } from "lucide-react";

import ProfileForm from "./ProfileForm";
import { RoleType } from "@/types";
import ContentLayout from "@/layouts/ContentLayout";

const ProfileDetailPage: React.FC<{ role: RoleType }> = ({ role }) => {
  return (
    <ContentLayout icon={WalletCards} title={`${role} profile`}>
      <ProfileForm />
    </ContentLayout>
  );
};

export default ProfileDetailPage;
