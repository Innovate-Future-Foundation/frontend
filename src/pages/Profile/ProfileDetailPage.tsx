import { WalletCards } from "lucide-react";

import ProfileForm from "./ProfileForm";
import { Profile, RoleType } from "@/types";
import ContentLayout from "@/layouts/ContentLayout";
import { useParams } from "react-router-dom";
import { useProfileDetail } from "@/hooks/profiles/useProfileDetail";
import { useMemo } from "react";
import { BeatLoader } from "react-spinners";

const ProfileDetailPage: React.FC<{ role: RoleType }> = ({ role }) => {
  const { id } = useParams();
  console.log("ProfileId", id);
  const { profileDetailResponse, isLoadingProfileDetail } = useProfileDetail(id ?? "");
  console.log("ProfileDetail", profileDetailResponse);

  const userProfileDetail: Profile = useMemo(() => {
    return !Array.isArray(profileDetailResponse?.data) && profileDetailResponse?.data ? profileDetailResponse.data : ({} as Profile);
  }, [profileDetailResponse]);

  if (isLoadingProfileDetail) {
    return (
      <div className="flex items-center justify-center">
        <BeatLoader className="text-primary" />
      </div>
    );
  }
  return (
    <ContentLayout icon={WalletCards} title={`${role} profile`}>
      <ProfileForm userProfileDetail={userProfileDetail} />
    </ContentLayout>
  );
};

export default ProfileDetailPage;
