import { Button } from "@/components/ui/button";

export const SupportSection = () => {
  return (
    <section className="bg-[#f9f9f9] py-20 px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="w-1/2 pr-16">
          <h1 className="text-4xl text-[#062B48] mb-6"> Support IFA </h1>
          <br />
          <p className="text-[#9DABBE] text-base leading-relaxed mb-10">
            Help us drive our mission forward by contributing to our programs and initiatives. Your support directly impacts the lives of young professionals,
            students, and startups around the world.
          </p>
          <Button className="bg-[#F36D26] hover:bg-orange-600 text-white px-8 py-3 rounded-md"> Donate Now </Button>
        </div>
        <div className="w-1/2 flex justify-center">
          <img src="/src/assets/images/amico 2.png" alt="Support" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
};
