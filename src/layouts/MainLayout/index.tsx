import { ReactNode, useEffect } from "react";

import Header from "@/components/Header";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { MyInfo } from "@/types/auth";

const myProfile: MyInfo = {
  id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  name: "Chelsea",
  email: "chelsea@exmaple.com",
  defaultProfile: {
    id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    organisation: {
      id: "0ba703ec-ea93-4c29-861b-f9e7f18313f9",
      orgName: "Acme Corporation",
      logoUrl: "https://github.com/shadcn.png",
      websiteUrl: "https://www.acmecorp.com",
      address: {
        street: "60 Walkerville St",
        suburb: "Gelberton",
        state: "SA",
        postcode: "5071",
        country: "AU"
      },
      email: "info@acmecorp.com",
      subscriptionCode: "Premium",
      orgStatusCode: "Active",
      createdAt: "2023-12-10T12:34:56Z",
      updatedAt: "2023-12-06T22:20:00Z"
    },
    roleCode: "OrgAdmin",
    inviter: null,
    name: "Marry Johnson",
    email: "alice.Green@example.com",
    phone: "+61 452345678",
    avatarUrl: "https://github.com/shadcn.png",
    isActive: true,
    isConfirmed: true,
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-15T14:30:00Z"
  }
};
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  console.log("pathname", pathname);
  const { setRole, setOrganisationId } = useAuth();

  //todo: hardcode
  useEffect(() => {
    const getMe = async () => {
      try {
        //todo: call get user + profile
        //todo: save user + profile info to state
        //todo: save role to state
        setRole(myProfile.defaultProfile.roleCode!);
        setOrganisationId(myProfile.defaultProfile.organisation!.id!);
      } catch (err) {
        console.error(err);
      }
    };
    getMe();
  }, [setOrganisationId, setRole]);

  return (
    <div className="flex flex-col h-screen">
      <Header fromHome={!pathname.includes("dashboard")} profile={myProfile.defaultProfile} />
      <div className="py-12">{children}</div>
    </div>
  );
};
export default MainLayout;
