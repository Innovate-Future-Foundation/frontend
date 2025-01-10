import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className=" text-white py-12 px-6 bg-[#046FFB]">
      <div className="container mx-auto grid grid-cols-4 gap-8 mb-8">
        {/* Logo & Branding */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/src/assets/images/logo.png" alt="Innovative Future logo" className="h-8 w-8" />
            <div>
              <div className="text-xl font-bold leading-5">INNOVATIVE FUTURE</div>
              <div className="text-sm">ASSOCIATION</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Partner Links */}
        <div>
          <h3 className="font-semibold mb-4">Partner Links</h3>
          <ul className="space-y-2">
            <li>Sunflower AI</li>
            <li>Bookwell AI</li>
            <li>Beequant.AI</li>
            <li>Jobpin AI</li>
          </ul>
        </div>

        {/* Subscribe Newsletter */}
        <div>
          <h3 className="font-semibold mb-4">Subscribe Newsletter</h3>
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
