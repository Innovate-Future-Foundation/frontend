import { ScrollList } from "@/components/ScrollList";
import OrganisationProfile from "./OrganisationProfile";

const OrganisationDetailPage = () => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center">
      <OrganisationProfile />
      <ScrollList />
    </div>
  );
};

export default OrganisationDetailPage;
