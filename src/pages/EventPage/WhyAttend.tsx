const WhyAttend: React.FC = () => {
  const cards = [
    {
      title: "Learning",
      description:
        "Students will participate in real-world projects via workshop, laying a solid foundation for their future academic and professional development.",
      imgSrc: "/src/assets/images/rafiki2.png",
      bgColor: "bg-[#BEE7F9]"
    },
    {
      title: "Communicating",
      description:
        "Students will engage in meaningful conversations with local students, learn about their study and lifestyle, and experience the authentic atmosphere of university life.",
      imgSrc: "/src/assets/images/pana.png",
      bgColor: "bg-[#BEE7F9]"
    },
    {
      title: "Visiting",
      description:
        "Students will visit Sydney's iconic landmarks such as the Sydney Opera House, Royal Botanic Garden, and more, enjoying the natural beauty and urban scenery.",
      imgSrc: "/src/assets/images/amico2.png",
      bgColor: "bg-[#BEE7F9]"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center text-[#05224F] mb-12">Why Attend</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {cards.map((card, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center text-center w-[250px] h-[435px]">
              <div className={`${card.bgColor} w-full flex justify-center items-center rounded-t-lg p-4`}>
                <img src={card.imgSrc} alt={card.title} className="w-[191px] h-[172px]" />
              </div>
              <h4 className="text-2xl text-[#05224F] font-bold mb-4">{card.title}</h4>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAttend;
