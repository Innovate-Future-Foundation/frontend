import { COGNITO_LOGIN_URL } from "@/constants/apiConfig";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <header>
        <nav className="flex">
          <Link to="/">
            <p>Home</p>
          </Link>
          |
          <Link to="/dashboard">
            <p>Dashboard</p>
          </Link>
          |
          <a href={COGNITO_LOGIN_URL}>
            <p>Sign in</p>
          </a>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
