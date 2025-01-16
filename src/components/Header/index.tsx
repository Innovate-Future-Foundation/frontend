import { Link } from "react-router-dom";
// import { COGNITO_LOGIN_URL } from "@/constants/apiConfig";
import SignInAvatar from "./SignInAvatar";

const Header = () => {
  return (
    <nav className="bg-[#046FFB] border-b border-white fixed h-14 w-full z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <img src="/src/assets/images/logo.png" alt="Innovative Future Association Logo" className="h-10 w-10" />
          <div className="leading-5">
            <div className="font-bold text-[#046FFB]">INNOVATIVE FUTURE</div>
            <div className="text-xs text-[#046FFB]">ASSOCIATION</div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <Link to="/">
            <p className="text-secondary hover:underline">Home</p>
          </Link>
          <Link to="/about-us">
            <p className="text-secondary  hover:underline">About Us</p>
          </Link>
          <a href="/contact-us" className="text-secondary  hover:underline">
            Contact Us
          </a>
          <Link to="/dashboard">
            <p className="text-secondary  hover:underline">Dashboard</p>
          </Link>
          <SignInAvatar name={"John Doe"} email={"johndoe@example.com"} avatarLink={"https://github.com/davidmiller.png"} />
          {/* <button className="bg-[#046FFB] text-white px-4 py-2 rounded hover:bg-[#046FFB]">Sign In</button> */}
          {/* <a href={COGNITO_LOGIN_URL}>
          <p>Sign in</p>
        </a> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
