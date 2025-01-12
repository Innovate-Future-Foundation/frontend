import { Link } from "react-router-dom";

import { COGNITO_LOGIN_URL } from "@/constants/apiConfig";

const Header = () => {
  return (
    <header className="h-14 bg-red-200 w-full fixed top-0 z-10">
      <nav className="px-4 h-full flex align-middle items-center justify-between">
        <div className="flex gap-2">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/dashboard">
            <p>Dashboard</p>
          </Link>
        </div>
        <a href={COGNITO_LOGIN_URL}>
          <p>Sign in</p>
        </a>
      </nav>
    </header>
  );
};

export default Header;
