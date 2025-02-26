import { Link, useNavigate } from "react-router-dom";
import SignInAvatar from "./SignInAvatar";
import { useAuthStore } from "@/store";
import { ProfileInfo } from "@/types";
import { Button } from "../ui/button";

interface HeaderProps {
  fromHome: boolean;
  profile: ProfileInfo;
}
const Header: React.FC<HeaderProps> = ({ fromHome, profile }) => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="h-12 bg-primary w-full fixed top-0 z-10 flex justify-center">
      <nav className="max-w-[1600px] w-full px-8 h-full flex items-center justify-between">
        {fromHome ? (
          <div className="flex items-center gap-4 text-secondary font-medium">
            <Link to="/">
              <p>Home</p>
            </Link>
            <Link to="/">
              <p>Contact US</p>
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 text-secondary font-medium">
            <Link to="/">
              <p>Home</p>
            </Link>
          </div>
        )}
        <div className="flex justify-items-center gap-4">
          {fromHome && isAuthenticated && (
            <Button variant={"secondary"} onClick={() => navigate("/dashboard")}>
              Get Started
            </Button>
          )}

          {isAuthenticated ? (
            <SignInAvatar name={profile.name ?? ""} email={profile.email ?? ""} avatarUrl={profile.avatarUrl ?? ""} profile={profile} />
          ) : (
            <Button variant={"secondary"} onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
