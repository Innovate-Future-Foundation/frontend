import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 flex flex-col-reverse lg:flex-row items-center lg:gap-16">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#062B48] leading-tight mb-6">Welcome to Innovate Future</h1>
          <p className="text-[#9DABBE] text-base leading-relaxed mb-10">A non-profit organization focusing on empowering the next generation of innovators</p>
          <Button className="bg-[#F36D26] hover:bg-orange-600 text-white px-6 py-3 rounded-md">Start your journey</Button>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src="/images/rafiki.png" alt="Welcome to Innovate Future" className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto" />
        </div>
      </div>
    </section>
  );
};
