import { Backpack } from "lucide-react";
import ProfilePage from "../Profile";
import { contactsColumns } from "./contactsColumns";

const UserPage = () => {
  return (
    <ProfilePage
      icon={Backpack}
      title="Contacts List"
      inviteLabel="Invite User"
      columns={contactsColumns}
      locationListType="cards"
      searchPlaceholder="Search by name, email, or organization"
    />
  );
};

export default UserPage;
