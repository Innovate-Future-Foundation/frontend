import { Backpack } from "lucide-react";
import ProfilePage from "../Profile";
import { profileColumns } from "../Profile/profileColumns";

const UserPage = () => {
  return (
    <ProfilePage
      icon={Backpack}
      title="User List"
      inviteLabel="Invite User"
      columns={profileColumns({ profilePath: "users" })}
      searchPlaceholder="Search by name, email, or organization"
      onInviteClick={() => console.log("Invite User clicked")}
    />
  );
};

export default UserPage;
