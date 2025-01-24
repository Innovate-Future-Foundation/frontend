import { Users, WalletCards } from "lucide-react";
import { ScrollList } from "@/components/ScrollList";
import { TitleWithIcon } from "@/components/TitleWithIcon";
import OrganisationProfile from "./OrganisationProfile";
import { usePermissions } from "@/hooks/use-permissions";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const OrganisationDetailPage = () => {
  const { id } = useParams();
  const { role } = useAuth();
  const { canViewOrganisationProfile, canEditOrganisationProfile, canViewAdminList } = usePermissions();

  console.log("OrganisationDetailPage rendered with:", {
    id,
    role,
    permissions: {
      canViewOrganisationProfile,
      canEditOrganisationProfile,
      canViewAdminList
    }
  });

  if (!canViewOrganisationProfile) {
    return <div>No permission to view organisation profile</div>;
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-center">
      <TitleWithIcon icon={WalletCards} title={"organisation profile"} />
      <OrganisationProfile />
      {canViewAdminList && (
        <>
          <TitleWithIcon icon={Users} title={"admins list"} />
          <ScrollList />
        </>
      )}
    </div>
  );
};

export default OrganisationDetailPage;
