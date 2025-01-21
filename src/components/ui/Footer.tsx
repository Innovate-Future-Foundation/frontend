import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className=" text-white py-12 px-6 bg-[#046FFB]">
      <div className="container mx-auto grid grid-cols-4 gap-8 mb-8">
        {/* Logo & Branding */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/src/assets/images/logo white.png" alt="Innovative Future logo" className="h-8 w-8" />
            <div className="leading-5">
              <div className="text-lg font-bold">INNOVATE FUTURE</div>
              <div className="text-sm">ASSOCIATION</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-bold mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about-us">About us</a>
            </li>
            <li>
              <a href="/contact-us">Contact us</a>
            </li>
          </ul>
        </div>

        {/* Partner Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Partner Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://www.sunflowerai.io/">Sunflower AI</a>
            </li>
            <li>
              <a href="https://www.bookwell.ai/">Bookwell AI</a>
            </li>
            <li>
              <a href="https://beequant.ai/">Beequant.AI</a>
            </li>
            <li>
              <a href="https://jobpin.com.au/">Jobpin AI</a>
            </li>
          </ul>
        </div>

        {/* Subscribe Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4">Subscribe Newsletter</h3>
          <p className="mb-4"> Subscribe our newsletter to get updates about our services and offers. </p>
          <div className="flex gap-2">
            <Input type="email" placeholder="input your email" className="bg-white border-white/20 text-black" />
            <Button className="bg-[#062B48] hover:bg-gray-800 text-white"> Subscribe </Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm opacity-80">
        <p> © 2024 Innovative Future Association. All rights reserved. </p>
        <p>Illustrations provided by Freepik.</p>
      </div>
    </footer>
  );
};
