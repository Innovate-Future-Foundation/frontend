import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import WhyAttend from "@/pages/EventPage/WhyAttend";

const EventPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-[#BEE7F9] text-center py-20">
          <h1 className="text-4xl text-[#05224F] font-bold mb-4">GenAI Professional Development</h1>
          <p className="text-md text-[#046FFB] mb-2">Future Engineer Program</p>
          <p className="text-sm mb-6 mt-2 bg-[#F36D26] text-white py-2 px-4 rounded-md inline-block shadow-lg">Thu, 23/01/2025 - Sat, 25/01/2025</p>
          <img src="/src/assets/images/main-picture.png" alt="GenAI Event" className="bottom-0 w-full h-auto" />
        </section>

        <section className="bg-white py-12">
          <div className="container mx-auto px-4 text-center">
            {/* Logos Container */}
            <div className="flex flex-wrap justify-center items-center gap-8">
              <img src="/src/assets/images/logo group.png" alt="logo group" className="h-12" />
            </div>
          </div>
        </section>

        <section className="py-10 bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/images/introduction-background.png')" }}>
          <div className="container mx-auto px-4">
            <h1 className="text-[#05224F] text-3xl text-center mb-6">Introduction</h1>
            <p className="text-[#05224F] text-center mx-auto leading-relaxed max-w-4xl">
              We are embarking on an enriching journey through the world of artificial intelligence with our exclusive AI Immersion Program in Sydney,
              Australia. Over three dynamic days, participants will engage in hands-on workshops, cultural exchanges, and cutting-edge technology experiences.
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#046FFB]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl text-white text-center mb-10">Agenda At A Glance</h2>
            <div className="flex justify-center gap-8">
              {/* Each day's agenda */}
              <div className="bg-[#046FFB] text-white rounded-lg p-6 shadow-lg w-[250px] h-[350px] border-2 border-white">
                <h6 className="text-2xl mb-4">Thursday, 23/01/2025</h6>
                <ul className="list-disc pl-5">
                  <li>Uni Sydney AI Workshop</li>
                  <li>Uni Canteen - food included</li>
                  <li>Uni Sydney Nano-Quantum Lab</li>
                </ul>
              </div>
              <div className="bg-[#046FFB] text-white rounded-lg p-6 shadow-lg w-[250px] h-[350px] border-2 border-white">
                <h6 className="text-2xl mb-4">Friday, 24/01/2025</h6>
                <ul className="list-disc pl-5">
                  <li>Uni Sydney AI Workshop</li>
                  <li>Uni Canteen - food included</li>
                  <li>Sydney City Visit</li>
                </ul>
              </div>
              <div className="bg-[#046FFB] text-white rounded-lg p-6 shadow-lg w-[250px] h-[350px] border-2 border-white">
                <h6 className="text-2xl mb-4">Saturday, 25/01/2025</h6>
                <ul className="list-disc pl-5">
                  <li>AI Robot Lab, Sydney Polytechnic College</li>
                  <li>Canteen Food</li>
                  <li>AI Translator Development Competition</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <WhyAttend />
      </main>
      <Footer />
    </div>
  );
};
export default EventPage;
