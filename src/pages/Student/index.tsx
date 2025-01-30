import { Backpack } from "lucide-react";
import ProfilePage from "../Profile";
import { profileColumns } from "../Profile/profileColumns";
import { platformAdminMockApis } from "@/mocks/platformAdminMockApis";
import { ProfileWithChildren } from "@/types";
import { useEffect, useState } from "react";

const StudentPage = () => {
  const [data, setData] = useState<ProfileWithChildren[]>([]);

  //TODO: will link real api later
  useEffect(() => {
    (async () => {
      const response = await platformAdminMockApis.getStudents({ offset: 0, sorting: [], filtering: [] });
      console.log("teachersList", response.data);

      if (Array.isArray(response.data)) {
        setData(response.data);
      }
    })();
  }, []);

  return (
    <ProfilePage
      data={data}
      icon={Backpack}
      title="Student List"
      inviteLabel="Invite Student"
      columns={profileColumns({ profilePath: "students", hideRole: true, hideOrganisation: true })}
      searchPlaceholder="Search by name, email, or organization"
      onInviteClick={() => console.log("Invite Student clicked")}
    />
  );
};

export default StudentPage;
