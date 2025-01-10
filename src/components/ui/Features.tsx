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
      {/* Container with a single row of three columns */}
      <div className="container mx-auto flex text-white">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`
              w-1/3 flex items-start gap-4 px-4 py-8
              ${index < features.length - 1 ? "border-r border-white/40" : ""}
            `}
          >
            {/* Icon */}
            <img src={feature.icon} alt={feature.title} className="w-12 h-12" />

            {/* Title & Description */}
            <div>
              <h6 className="text-lg font-bold mb-1">{feature.title}</h6>
              <p className="leading-relaxed text-sm"> {feature.description} </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
