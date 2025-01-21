import { Backpack } from "lucide-react";
import ProfilePage from "../Profile";
import { profileColumns } from "../Profile/profileColumns";

const StudentPage = () => {
  return (
    <ProfilePage
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
