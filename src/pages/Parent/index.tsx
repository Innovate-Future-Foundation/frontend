import { UsersRound } from "lucide-react";
import ProfilePage from "../Profile";
import { profileColumns } from "../Profile/profileColumns";

const ParentPage = () => {
  return (
    <ProfilePage
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
