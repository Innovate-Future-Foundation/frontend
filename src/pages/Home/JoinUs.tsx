export const JoinUs: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start gap-16">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img src="/images/amico.png" alt="Support or engineering illustration" className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto" />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-right">
          <h1 className="text-3xl lg:text-4xl text-[#062B48] mb-6">Join Us</h1>
          <p className="text-[#9FA8B2] text-base leading-relaxed mb-10">
            Whether you are an aspiring engineer, a seasoned professional, or a supporter of innovation, IFA welcomes you to join our journey. Together, we can
            create opportunities, empower communities, and build a future fueled by technology.
          </p>
          <div className="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start">
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
