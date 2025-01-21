import { Users, WalletCards } from "lucide-react";

import { ScrollList } from "@/components/ScrollList";
import { TitleWithIcon } from "@/components/TitleWithIcon";
import OrganisationProfile from "./OrganisationProfile";

const OrganisationDetailPage = () => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center">
      <TitleWithIcon icon={WalletCards} title={"orgainsation profile"} />
      <OrganisationProfile />
      <TitleWithIcon icon={Users} title={"admins list"} />
      <ScrollList />
    </div>
  );
};

export default OrganisationDetailPage;
