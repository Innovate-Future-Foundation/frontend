export const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <img src="/src/assets/images/logo.png" alt="Innovative Future Association Logo" className="h-10 w-10" />
          <div className="leading-5">
            <div className="font-bold text-[#046FFB]">INNOVATE FUTURE</div>
            <div className="text-xs text-[#046FFB]">ASSOCIATION</div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <a href="/" className="text-[#062B48] hover:underline">
            Home
          </a>
          <a href="/about-us" className=" text-[#062B48] hover:underline">
            About Us
          </a>
          <a href="/contact-us" className="text-[#062B48] hover:underline">
            Contact Us
          </a>
          <button className="bg-[#046FFB] text-white px-4 py-2 rounded hover:bg-[#046FFB]">Sign In</button>
        </div>
      </div>
    </nav>
  );
};
