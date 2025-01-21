export const Features: React.FC = () => {
  const features = [
    {
      icon: "/src/assets/images/Vector1.png",
      title: "Professional Development",
      description: "Offering workshops, events, and seminars on cutting-edge technologies like Generative AI, cloud computing, and more."
    },
    {
      icon: "/src/assets/images/Vector2.png",
      title: "Community Building",
      description: "Connecting individuals from diverse backgrounds to create a global network of innovators."
    },
    {
      icon: "/src/assets/images/Vector3.png",
      title: "Future-Ready Programs",
      description: "Preparing the next generation for careers in technology through mentorship, resources, and skill-building opportunities."
    }
  ];

  return (
    <section className="bg-[#046FFB] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 text-left ${
                index < features.length - 1 ? "border-b md:border-r md:border-b-0 border-white/40" : ""
              } md:w-1/3`}
            >
              <img src={feature.icon} alt={feature.title} className="w-12 h-12" />
              <div>
                <h6 className="text-lg font-bold mb-1">{feature.title}</h6>
                <p className="leading-relaxed text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
