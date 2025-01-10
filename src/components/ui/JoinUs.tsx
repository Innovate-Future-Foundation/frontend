export const JoinUs: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 flex items-center">
        <div className="w-1/2 pr-8">
          <img src="/src/assets/images/amico.png" alt="Support or engineering illustration" className="w-full h-auto rounded-lg" />
        </div>
        <div className="w-1/2 text-left">
          <h2 className="text-4xl font-bold text-gray-800 text-right">Join Us</h2>
          <br />
          <p className="text-[#9FA8B2] text-base text-right leading-relaxed mb-8">
            Whether you are an aspiring engineer, a seasoned professional, or a supporter of innovation, IFA welcomes you to join our journey. Together, we can
            create opportunities, empower communities, and build a future fueled by technology.
          </p>

          <div className="mt-6 flex justify-center gap-8">
            <button className="bg-[#F36D26] text-white text-base px-6 py-3 rounded-md shadow hover:bg-orange-600 transition-colors duration-300">
              Become Member
            </button>
            <button className="bg-[#062B48] text-white text-base px-6 py-3 rounded-md shadow hover:bg-gray-900 transition-colors duration-300">
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
