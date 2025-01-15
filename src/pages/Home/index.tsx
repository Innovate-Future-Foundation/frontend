import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/pages/Home/HeroSection";
import { Features } from "@/pages/Home/Features";
import { Partners } from "@/pages/Home/Partners";
import { Events } from "@/pages/Home/Events";
import { JoinUs } from "@/pages/Home/JoinUs";
import { SupportSection } from "@/pages/Home/SupportSection";
import { Footer } from "@/components/ui/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto">
          <HeroSection />
          <Features />
          <Partners />
          <Events />
          <JoinUs />
          <SupportSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
