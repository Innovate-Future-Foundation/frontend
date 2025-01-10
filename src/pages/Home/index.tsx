import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { Features } from "@/components/ui/Features";
import { Partners } from "@/components/ui/Partners";
import { Events } from "@/components/ui/Events";
import { JoinUs } from "@/components/ui/JoinUs";
import { SupportSection } from "@/components/ui/SupportSection";
import { Footer } from "@/components/ui/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <Partners />
      <Events />
      <JoinUs />
      <SupportSection />
      <Footer />
    </div>
  );
};

export default Home;
