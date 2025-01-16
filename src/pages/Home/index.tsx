import { HeroSection } from "@/pages/Home/HeroSection";
import { Features } from "@/pages/Home/Features";
import { Partners } from "@/pages/Home/Partners";
import { Events } from "@/pages/Home/Events";
import { JoinUs } from "@/pages/Home/JoinUs";
import { SupportSection } from "@/pages/Home/SupportSection";
import MainLayout from "@/layouts/MainLayout";

const Home = () => {
  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default Home;
