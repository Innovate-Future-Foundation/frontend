export const Partners: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="text-4xl text-[#062B48] text-center mb-12">Our Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          <img src="/src/assets/images/aws.png" alt="AWS" className="h-12 w-auto" />
          <img src="/src/assets/images/asianAtAmazon.png" alt="Asians at Amazon" className="h-12 w-auto" />
          <img src="/src/assets/images/aws startups.png" alt="AWS Startups" className="h-12 w-auto" />
          <img src="/src/assets/images/premierAustralia.png" alt="Premier Australia" className="h-12 w-auto" />
          <img src="/src/assets/images/jobPin.png" alt="Job Pin" className="h-12 w-auto" />
          <img src="/src/assets/images/jr.png" alt="Additional Partner" className="h-12 w-auto" />
        </div>
      </div>
    </section>
  );
};
