export const Partners: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl text-gray-800 mb-6">Our Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <img src="/src/assets/images/aws.png" alt="AWS" className="h-12" />
          <img src="/src/assets/images/asianAtAmazon.png" alt="Asians at Amazon" className="h-12" />
          <img src="/src/assets/images/aws startups.png" alt="AWS Startups" className="h-12" />
          <img src="/src/assets/images/premierAustralia.png" alt="Premier Australia" className="h-12" />
          <img src="/src/assets/images/jobPin.png" alt="Job Pin" className="h-12" />
          <img src="/src/assets/images/jr.png" alt="Additional Partner" className="h-12" />
        </div>
      </div>
    </section>
  );
};
