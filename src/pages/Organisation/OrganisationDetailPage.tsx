import { ScrollList } from "@/components/ScrollList";
import OrganisationProfile from "./OrganisationProfile";
import { TitleWithIcon } from "@/components/TitleWithIcon";
import { Users, WalletCards } from "lucide-react";

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
