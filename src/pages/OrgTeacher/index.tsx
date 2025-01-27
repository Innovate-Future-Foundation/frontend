import { UserRoundPen } from "lucide-react";
import ProfilePage from "../Profile";
import { profileColumns } from "../Profile/profileColumns";
import { useEffect, useState } from "react";
import { ProfileWithChildren } from "@/types";
import { platformAdminMockApis } from "@/mocks/platformAdminMockApis";

const OrgTeacherPage = () => {
  const [data, setData] = useState<ProfileWithChildren[]>([]);

  //TODO: will link real api later
  useEffect(() => {
    (async () => {
      const response = await platformAdminMockApis.getOrganisationTeachers({ offset: 0, sorting: [], filtering: [] });
      console.log("teachersList", response.data);

      if (Array.isArray(response.data)) {
        setData(response.data);
      }
    })();
  }, []);
  return (
    <ProfilePage
      data={data}
      icon={UserRoundPen}
      title="Teacher List"
      inviteLabel="Invite Teacher"
      columns={profileColumns({ profilePath: "orgteachers", hideRole: true, hideOrganisation: true })}
      searchPlaceholder="Search by name, email, or organization"
      onInviteClick={() => console.log("Invite Teacher clicked")}
    />
  );
};

export default OrgTeacherPage;
