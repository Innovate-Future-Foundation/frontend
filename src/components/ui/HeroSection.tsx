import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Column: Text & Button */}
        <div className="w-1/2 pr-8">
          <h1 className="text-4xl font-bold text-[#1c2c4c] mb-4">Welcome to Innovative Future</h1>
          <br />
          <p className="text-[#9FA8B2] text-base leading-relaxed mb-8">A non-profit organization focusing on empowering the next generation of innovators</p>
          <Button className="bg-[#F36D26] hover:bg-orange-600 text-white px-6 py-3 rounded-md">Start your journey</Button>
        </div>

        {/* Right Column: Image */}
        <div className="w-1/2">
          <img src="/src/assets/images/rafiki.png" alt="Welcome Innovate Future" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
};
