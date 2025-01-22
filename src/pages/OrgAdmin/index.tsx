import { UserRoundPen } from "lucide-react";
import ProfilePage from "../Profile";
import { profileColumns } from "../Profile/profileColumns";

const OrgAdminPage = () => {
  return (
    <ProfilePage
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
