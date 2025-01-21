import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl text-[#062B48]">Welcome to IFA</h1>
            <p className="text-lg text-[#9DABBE] italic mt-2">Empowering the Next Generation of Innovators</p>
            <p className="mt-6 text-[#062B48] max-w-2xl mx-auto leading-relaxed">
              At Innovate Future Association Inc., we believe in the power of technology and innovation to transform lives and shape a brighter future. Our
              mission is to bridge communities, foster talent, and create a thriving ecosystem where aspiring engineers, technologists, and entrepreneurs can
              learn, grow, and succeed.
            </p>
          </div>
        </section>

        <section>
          <div className="mt-8 flex justify-center">
            <img src="/src/assets/images/cuate.png" alt="About Hero Illustration" className="w-full max-w-md h-auto" />
          </div>
        </section>

        <section className="bg-[#f9f9f9] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl text-[#1c2c4c] mb-8">What We Do</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 justify-center items-center mx-auto">
              {[
                {
                  icon: "about-us-icon1.png",
                  title: "Event & Workshops",
                  description: "From professional development sessions to hands-on tech workshops, we create opportunities for individuals."
                },
                {
                  icon: "about-us-icon2.png",
                  title: "Youth Empowerment",
                  description: "We're committed to nurturing young talent by providing tailored programs."
                },
                { icon: "about-us-icon3.png", title: "Startup Enablement", description: "IFA supports startups by offering resources and guidance." },
                {
                  icon: "about-us-icon4.png",
                  title: "Cultural and Community Engagement",
                  description: "We foster cross-cultural collaborations, helping communities innovate."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                  <img src={`/src/assets/images/${item.icon}`} alt={item.title} className="w-16 h-16 mb-4" />
                  <h3 className="text-xl font-semibold text-[#1c2c4c]">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
export default AboutUs;
