import { WalletCards } from "lucide-react";

import OrganisationProfile from "./OrganisationProfile";
import ContentLayout from "@/layouts/ContentLayout";
import { ScrollList } from "@/components/ScrollList";

const OrganisationDetailPage = () => {
  return (
    <ContentLayout icon={WalletCards} title={"organisation profile"}>
      <OrganisationProfile />
      <div className="h-4"></div>
      <ScrollList title="admin list" />
    </ContentLayout>
  );
};

export default OrganisationDetailPage;
