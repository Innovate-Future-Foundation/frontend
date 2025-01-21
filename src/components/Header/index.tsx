import { Link } from "react-router-dom";
// import { COGNITO_LOGIN_URL } from "@/constants/apiConfig";
import SignInAvatar from "./SignInAvatar";

const Header = () => {
  return (
    <header className="h-12 bg-[#046FFB] w-full fixed top-0 z-10">
      <nav className="px-4 h-full flex align-middle items-center justify-between">
        <div className="flex gap-4 text-secondary font-medium">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/dashboard">
            <p>Dashboard</p>
          </Link>
        </div>
        {/* <a href={COGNITO_LOGIN_URL}>
          <p>Sign in</p>
        </a> */}
        <SignInAvatar name={"John Doe"} email={"johndoe@example.com"} avatarLink={"https://github.com/davidmiller.png"} />
      </nav>
    </header>
  );
};

export default Header;
