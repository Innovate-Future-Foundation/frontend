import { useNavigate, useLocation } from "react-router-dom";
import SignInAvatar from "./SignInAvatar";
import { useAuthStore } from "@/store";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface HeaderProps {
  fromHome: boolean;
}

const Header: React.FC<HeaderProps> = ({ fromHome }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, userProfile } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("Home");

  // Set the active item based on the current path
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveItem("Home");
    } else {
      const path = location.pathname.slice(1);
      const matchedItem = ["Home", "Events", "Partners", "Membership", "About Us", "Contact Us"].find(item => item.toLowerCase().replace(/\s+/g, "") === path);
      if (matchedItem) {
        setActiveItem(matchedItem);
      }
    }
  }, [location.pathname]);

  return (
    <header
      className={clsx(
        `flex items-center justify-between ${fromHome ? "h-20 px-[5.6%] bg-background/50 backdrop-blur-lg" : "h-14 px-6 bg-background"} fixed w-full z-20 shadow-sm`
      )}
    >
      {/* Logo section */}
      <div className={"flex items-center cursor-pointer"} onClick={() => navigate("/")}>
        <img src="/assets/images/logo1.png" alt="INNOVATE FUTURE" className={clsx(`${fromHome ? "w-10 h-10" : "w-8 h-8"}`)} />
        <div className={clsx(`flex flex-col ml-3 text-primary ${fromHome ? "font-bold " : "font-semibold opacity-0"}`)}>
          <span className={clsx(`${fromHome ? "text-base" : "text-sm"}`)}>INNOVATE FUTURE</span>
          <span className={clsx(`${fromHome ? "text-xs" : "text-[0.6rem]"}`)}>ASSOCIATION</span>
        </div>
      </div>

      {/* Desktop Navigation - hidden on mobile */}
      {fromHome && (
        <nav className="hidden xl:flex items-center justify-end flex-1 mr-8">
          <div className="flex items-center gap-8">
            {["Home", "Events", "Partners", "Membership", "About Us", "Contact Us"].map(item => (
              <div key={item} className="relative group">
                <div
                  className={clsx(
                    "text-base font-['Helvetica-Rounded-Bold'] font-bold cursor-pointer transition-colors whitespace-nowrap",
                    activeItem === item ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                  onClick={() => {
                    setActiveItem(item);
                  }}
                >
                  {item}
                </div>
                <div
                  className={clsx(
                    "absolute -bottom-2 left-1/2 w-4 h-1 bg-primary rounded-full transition-transform duration-300 origin-center -translate-x-1/2",
                    activeItem === item ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </div>
            ))}
          </div>
        </nav>
      )}

      {/* Right section with sign in button and mobile menu */}
      <div className="flex items-center gap-4">
        {fromHome && isAuthenticated && (
          <Button variant={"secondary"} onClick={() => navigate("/dashboard")}>
            Get Started
          </Button>
        )}
        {isAuthenticated && userProfile ? (
          <SignInAvatar name={userProfile.name ?? ""} email={userProfile.email ?? ""} avatarUrl={userProfile.avatarUrl ?? ""} />
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="px-4 py-2 rounded-full border border-primary-foreground30 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors whitespace-nowrap"
          >
            Sign In
          </button>
        )}

        {/* Mobile menu button */}
        <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 bg-background z-50">
          <div className="flex flex-col h-full">
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center">
                <img src="/assets/images/logo1.png" alt="INNOVATE FUTURE" className="w-8 h-8" />
                <div className="flex flex-col ml-2">
                  <span className="font-bold text-sm text-primary">INNOVATE FUTURE</span>
                  <span className="text-primary text-xs font-bold">ASSOCIATION</span>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Mobile menu items */}
            <div className="flex flex-col p-5 space-y-4">
              {["Home", "Events", "Partners", "Membership", "About Us", "Contact Us"].map(item => (
                <div
                  key={item}
                  onClick={() => {
                    setActiveItem(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={clsx("text-lg font-medium cursor-pointer", activeItem === item ? "text-primary" : "text-foreground hover:text-primary")}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
