import { UserRoundPen } from "lucide-react";
import ProfilePage from "../Profile";
import { profileColumns } from "../Profile/profileColumns";
import { ProfileWithChildren } from "@/types";
import { useEffect, useState } from "react";
import { platformAdminMockApis } from "@/mocks/platformAdminMockApis";

const OrgAdminPage = () => {
  const [data, setData] = useState<ProfileWithChildren[]>([]);

  //TODO: will link real api later
  useEffect(() => {
    (async () => {
      const response = await platformAdminMockApis.getOrganisationAdmins({ offset: 0, sorting: [], filtering: [] });
      console.log("organisationsList", response.data);

      if (Array.isArray(response.data)) {
        setData(response.data);
      }
    })();
  }, []);

  return (
    <ProfilePage
      data={data}
      icon={UserRoundPen}
      title="Admin List"
      inviteLabel="Invite Admin"
      columns={profileColumns({ hideRole: true })}
      searchPlaceholder="Search by name, email, or organization"
      onInviteClick={() => console.log("Invite Admin clicked")}
    />
  );
};

export default OrgAdminPage;
