import { useEffect } from "react";
import { NavbarEvent } from "@/pages/EventPage/Navbar-event";
import { Footer } from "@/components/ui/Footer";
import WhyAttend from "@/pages/EventPage/WhyAttend";

const EventPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEvent />
      <main className="flex-grow">
        <section className="text-center py-20 bg-[#BEE7F9] justify-items-center">
          <h1 className="text-4xl text-[#05224F] font-bold mb-4">GenAI Professional Development</h1>
          <p className="text-md font-bold text-[#046FFB] mb-2">Future Engineer Program</p>
          <p className="text-sm mb-6 mt-2 bg-[#F36D26] text-white py-2 px-4 rounded-md inline-block shadow-lg">Thu, 23/01/2025 - Sat, 25/01/2025</p>
        </section>

        <section className="bg-[#BEE7F9] justify-items-center">
          <img src="/images/event image.png" alt="event image" />
        </section>

        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols3 lg:grid-cols-4 gap-8 justify-tems-center">
              <div className="flex justify-start">
                <img src="/images/inff logo.png" alt="INFF Logo" className="h-16 w-auto" />
              </div>
              <div className="flex justify-end">
                <img src="/images/aws startups.png" alt="AWS Startups" className="h-16 w-auto" />
              </div>
              <div className="flex justify-start">
                <img src="/images/sydney uni logo.png" alt="Sydney Uni Logo" className="h-16 w-auto" />
              </div>
              <div className="flex justify-end">
                <img src="/images/jr logo.png" alt="JR Academy Logo" className="h-16 w-auto" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/introduction-background.png')" }}>
          <div className="container mx-auto px-4">
            <h1 className="text-[#05224F] text-4xl text-center mb-12">Introduction</h1>
            <p className="text-[#05224F] text-center mx-auto leading-relaxed max-w-4xl">
              We are embarking on an enriching journey through the world of artificial intelligence with our exclusive AI Immersion Program in Sydney,
              Australia. Over three dynamic days, participants will engage in hands-on workshops, cultural exchanges, and cutting-edge technology experiences.
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#046FFB]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl text-white text-center mb-12">Agenda At A Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              {/* Each day's agenda */}
              <div className="bg-[#046FFB] text-white rounded-lg p-6 shadow-lg border-2 border-white">
                <h6 className="font-bold mb-4">Thursday, 23/01/2025</h6>
                <h6 className="font-bold">Amazon Sydney and University of Sydney Tour</h6>
                <br />
                <ul className="list-disc pl-5">
                  <li>9:30, Amazon Sydney Tour and AI Workshop</li>
                  <li>11:30, Workshop</li>
                  <li>12:30, Lunch</li>
                  <li>13:30, USYD Computer science venue activity</li>
                  <li>16:00, Campus Tour, USYD venue and Amazon venue</li>
                </ul>
              </div>
              <div className="bg-[#046FFB] text-white rounded-lg p-6 shadow-lg border-2 border-white">
                <h6 className="font-bold mb-4">Friday, 24/01/2025</h6>
                <h6 className="font-bold">Quantum Workshop</h6>
                <br />
                <ul className="list-disc pl-5">
                  <li>9:30, Introduction / Seminar setup</li>
                  <li>
                    11:00, An introduction from Professor Der Derian on the implications of quantum technology for security, ethics, and how we think about the
                    world
                  </li>
                  <li>11:10, A short-cut screening of 'PROJECT Q: War, Peace, and Quantum Mechanics</li>
                  <li>11:50, A Q&A session in response to the documentary</li>
                  <li>12:00, Lunch Break and Chit-Chats</li>
                  <li>
                    12:40, Workshop/tutorial: Brief introduction from Dr. Stuart, Dr. Gabi Sko, and Dr. Jayson Waters on each of our focus areas of quantum
                    international relations, industry, and theory(including student discussion)
                  </li>
                  <li>16:00, Final Q&A, facilitate students to register and log into the short course</li>
                </ul>
              </div>
              <div className="bg-[#046FFB] text-white rounded-lg p-6 shadow-lg border-2 border-white">
                <h6 className="font-bold mb-4">Saturday, 25/01/2025</h6>
                <h6 className="font-bold">RoboCamp</h6>
                <br />
                <ul className="list-disc pl-5">
                  <li>9:00, Workshop Setup</li>
                  <li>10:00, Welcome and Orientation</li>
                  <li>10:30, Robot's Playground</li>
                  <li>12:00, Lunch Break & Watch the Transformer Movie</li>
                  <li>13:00, The Transformer Story</li>
                  <li>14:00, Show Time for Robot actors</li>
                  <li>15:30, Study Tour Wrap up and Certification</li>
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
