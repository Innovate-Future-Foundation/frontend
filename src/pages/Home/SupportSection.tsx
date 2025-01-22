import { Button } from "@/components/ui/button";

export const SupportSection = () => {
  return (
    <section className="bg-[#f9f9f9] py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl text-[#062B48] mb-6">Support IFA</h1>
          <p className="text-[#9DABBE] text-base leading-relaxed mb-10">
            Help us drive our mission forward by contributing to our programs and initiatives. Your support directly impacts the lives of young professionals,
            students, and startups around the world.
          </p>
          <Button className="bg-[#F36D26] hover:bg-orange-600 text-white px-8 py-3 rounded-md shadow-md transition-colors duration-300">Donate Now</Button>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src="/images/amico 2.png" alt="Support" className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto" />
        </div>
      </div>
    </section>
  );
};
