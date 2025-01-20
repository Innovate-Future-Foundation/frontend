import { UserRoundPen } from "lucide-react";
import ProfilePage from "../Profile";
import { profileColumns } from "../Profile/profileColumns";

const StuffPage = () => {
  return (
    <ProfilePage
      icon={UserRoundPen}
      title="Stuff List"
      inviteLabel="Invite Stuff"
      columns={profileColumns({})}
      searchPlaceholder="Search by name, email, or organization"
      onInviteClick={() => console.log("Invite Stuff clicked")}
    />
  );
};

export default StuffPage;
