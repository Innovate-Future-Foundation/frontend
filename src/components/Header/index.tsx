import { Link } from "react-router-dom";
import SignInAvatar from "./SignInAvatar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { MyInfo } from "@/types/auth";

const myProfile: MyInfo = {
  id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  name: "Chelsea",
  email: "chelsea@exmaple.com",
  defaultProfile: {
    id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    organisation: {
      id: "41a85578-04e3-471a-9902-6ebff23c622d",
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

interface HeaderProps {
  fromHome: boolean;
}
const Header: React.FC<HeaderProps> = ({ fromHome }) => {
  const { setRole, setOrganisationId, role } = useAuth();

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
  }, []);

  return (
    <header className="h-12 bg-primary w-full fixed top-0 z-10 flex justify-center">
      <nav className="max-w-[1600px] w-full px-8 h-full flex items-center justify-between">
        {fromHome ? (
          <>
            <div className="flex gap-4 text-secondary font-medium">
              <Link to="/">
                <p>Home</p>
              </Link>
            </div>
            <div className="flex gap-4 text-secondary font-medium">
              <Link to="/">
                <p>Contact US</p>
              </Link>
            </div>
          </>
        ) : (
          <div className="flex gap-4 text-secondary font-medium">
            <Link to="/">
              <p>Home</p>
            </Link>
          </div>
        )}

        <div className="flex justify-items-center gap-4">
          {!fromHome && (
            <Link to="/">
              <p>Get Started</p>
            </Link>
          )}
          {role ? (
            <SignInAvatar
              name={myProfile.defaultProfile.name ?? ""}
              email={myProfile.defaultProfile.email ?? ""}
              avatarUrl={myProfile.defaultProfile.avatarUrl ?? ""}
              profile={myProfile.defaultProfile}
            />
          ) : (
            <Link to="/auth">Sign In</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
