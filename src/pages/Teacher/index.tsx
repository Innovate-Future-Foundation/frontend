import { UserRoundPen } from "lucide-react";
import ProfilePage from "../Profile";
import { profileColumns } from "../Profile/profileColumns";

const TeacherPage = () => {
  return (
    <ProfilePage
      icon={UserRoundPen}
      title="Teacher List"
      inviteLabel="Invite Teacher"
      columns={profileColumns({ profilePath: "teachers", hideRole: true, hideOrganisation: true })}
      searchPlaceholder="Search by name, email, or organization"
      onInviteClick={() => console.log("Invite Teacher clicked")}
    />
  );
};

export default TeacherPage;
