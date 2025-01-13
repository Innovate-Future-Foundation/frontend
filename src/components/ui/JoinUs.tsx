export const JoinUs: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-8 flex items-center">
        <div className="w-1/2 pr-16">
          <img src="/src/assets/images/amico.png" alt="Support or engineering illustration" className="w-full h-auto" />
        </div>
        <div className="w-1/2 pl-16 text-left">
          <h1 className="text-4xl text-[#062B48] text-right mb-6">Join Us</h1>
          <br />
          <p className="text-[#9FA8B2] text-base text-right leading-relaxed mb-10">
            Whether you are an aspiring engineer, a seasoned professional, or a supporter of innovation, IFA welcomes you to join our journey. Together, we can
            create opportunities, empower communities, and build a future fueled by technology.
          </p>

          <div className="flex justify-center gap-6">
            <button className="bg-[#F36D26] text-white text-base px-8 py-3 rounded-md shadow hover:bg-orange-600 transition-colors duration-300">
              Become Member
            </button>
            <button className="bg-[#062B48] text-white text-base px-8 py-3 rounded-md shadow hover:bg-gray-900 transition-colors duration-300">
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
