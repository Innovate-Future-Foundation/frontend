import React, { useState } from "react";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Innovative Future Association Logo" className="h-10 w-10" />
          <div className="leading-5">
            <div className="font-bold text-[#046FFB]">INNOVATE FUTURE</div>
            <div className="text-xs text-[#046FFB]">ASSOCIATION</div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-[#062B48] hover:underline">
            Home
          </a>
          <a href="/about-us" className="text-[#062B48] hover:underline">
            About Us
          </a>
          <a href="/contact-us" className="text-[#062B48] hover:underline">
            Contact Us
          </a>
          <button className="bg-[#046FFB] text-white px-4 py-2 rounded hover:bg-[#034cb4]">Sign In</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-[#046FFB] focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 right-4 justify-items-center bg-white shadow-lg rounded-lg w-48 z-50">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <a href="/" className="block text-[#062B48] hover:bg-[#f0f4f8] rounded px-4 py-2">
                Home
              </a>
            </li>
            <li>
              <a href="/about-us" className="block text-[#062B48] hover:bg-[#f0f4f8] rounded px-4 py-2">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact-us" className="block text-[#062B48] hover:bg-[#f0f4f8] rounded px-4 py-2">
                Contact Us
              </a>
            </li>
            <li>
              <button className="bg-[#046FFB] text-white px-8 py-2 rounded hover:bg-[#034cb4]">Sign In</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
