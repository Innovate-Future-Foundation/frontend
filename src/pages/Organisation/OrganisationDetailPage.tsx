import { WalletCards } from "lucide-react";

import OrganisationProfile from "./OrganisationProfile";
import ContentLayout from "@/layouts/ContentLayout";
import { ScrollList } from "@/components/ScrollList";
import { usePermissions } from "@/hooks/usePermissions";

const OrganisationDetailPage = () => {
  const { canEditOrganisationProfile, canViewManagerScrollList } = usePermissions();

  return (
    <ContentLayout icon={WalletCards} title={"organisation profile"}>
      <OrganisationProfile disabled={!canEditOrganisationProfile} />
      {canViewManagerScrollList && (
        <>
          <div className="h-4"></div>
          <ScrollList title="manager" />
        </>
      )}
    </ContentLayout>
  );
};

export default OrganisationDetailPage;
