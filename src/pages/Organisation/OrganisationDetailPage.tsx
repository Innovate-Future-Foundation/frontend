import { WalletCards } from "lucide-react";

import OrganisationProfile from "./OrganisationProfile";
import ContentLayout from "@/layouts/ContentLayout";
import { ScrollList } from "@/components/ScrollList";
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
    <ContentLayout icon={WalletCards} title={"organisation profile"}>
      <OrganisationProfile />
      {canViewAdminList && (
        <>
          <div className="h-4"></div>
          <ScrollList title="admin list" />
        </>
      )}
    </ContentLayout>
  );
};

export default OrganisationDetailPage;
