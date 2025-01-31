import { Backpack } from "lucide-react";
import ProfilePage from "../Profile";
import { contactsColumns } from "./contactsColumns";
import { ProfileWithChildren } from "@/types";
import { useEffect, useState } from "react";
import { platformAdminMockApis } from "@/mocks/platformAdminMockApis";

const UserPage = () => {
  const [data, setData] = useState<ProfileWithChildren[]>([]);

  //TODO: will link real api later
  useEffect(() => {
    (async () => {
      const response = await platformAdminMockApis.getContacts({ cursor: "", sorting: [], filtering: [] });
      console.log("contacts List", response.data);

      if (Array.isArray(response.data)) {
        setData(response.data);
      }
    })();
  }, []);

  return (
    <ProfilePage
      data={data}
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
