import { UserRoundPen } from "lucide-react";
import ProfilePage from "../Profile";
import { profileColumns } from "../Profile/profileColumns";

const OrgTeacherPage = () => {
  return (
    <ProfilePage
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
