import { UsersRound } from "lucide-react";
import ProfilePage from "../Profile";
import { profileColumns } from "../Profile/profileColumns";
import { useEffect, useState } from "react";
import { ProfileWithChildren } from "@/types";
import { platformAdminMockApis } from "@/mocks/platformAdminMockApis";

const ParentPage = () => {
  const [data, setData] = useState<ProfileWithChildren[]>([]);

  //TODO: will link real api later
  useEffect(() => {
    (async () => {
      const response = await platformAdminMockApis.getParents({ offset: 0, sorting: [], filtering: [] });
      console.log("Parent list", response?.data);

      if (Array.isArray(response?.data)) {
        setData(response.data);
      }
    })();
  }, []);
  return (
    <ProfilePage
      data={data}
      icon={UsersRound}
      title="Parent List"
      inviteLabel="Invite Parent"
      columns={profileColumns({ profilePath: "parents", hideRole: true, hideOrganisation: true })}
      searchPlaceholder="Search by name, email, or organization"
      onInviteClick={() => console.log("Invite Parent clicked")}
    />
  );
};

export default ParentPage;
