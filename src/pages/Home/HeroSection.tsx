import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="bg-white py-20 px-8">
      <div className="container mx-auto flex items-center">
        <div className="w-1/2 pr-16">
          <h1 className="text-6xl font-bold text-[#062B48] leading-tight mb-6">Welcome to Innovative Future</h1>
          <br />
          <p className="text-[#9DABBE] text-base leading-relaxed mb-10">A non-profit organization focusing on empowering the next generation of innovators</p>
          <Button className="bg-[#F36D26] hover:bg-orange-600 text-white px-6 py-3 rounded-md">Start your journey</Button>
        </div>
        <div className="w-1/2 flex justify-center">
          <img src="/src/assets/images/rafiki.png" alt="Welcome Innovate Future" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
};
