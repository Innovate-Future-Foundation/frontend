import { Button } from "@/components/ui/button";

export const SupportSection = () => {
  return (
    <section className="bg-[#f9f9f9] py-16 px-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Column: Text & Button */}
        <div className="w-1/2 pr-8">
          <h2 className="text-4xl font-bold text-[#1c2c4c] mb-4"> Support IFA </h2>
          <br />
          <p className="text-[#9FA8B2] text-base leading-relaxed mb-8">
            Help us drive our mission forward by contributing to our programs and initiatives. Your support directly impacts the lives of young professionals,
            students, and startups around the world.
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md"> Donate Now </Button>
        </div>

        {/* Right Column: Image */}
        <div className="w-1/2">
          <img src="/src/assets/images/amico 2.png" alt="Support" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
};
