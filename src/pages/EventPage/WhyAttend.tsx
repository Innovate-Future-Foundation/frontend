const WhyAttend: React.FC = () => {
  const cards = [
    {
      title: "LEARNING",
      description:
        "Students will participate in real-world projects via workshops, laying a solid foundation for their future academic and professional development.",
      imgSrc: "/src/assets/images/rafiki2.png",
      bgColor: "bg-[#BEE7F9]"
    },
    {
      title: "COMMUNICATING",
      description:
        "Students will engage in meaningful conversations with local students, learn about their study and lifestyle, and experience the authentic atmosphere of university life.",
      imgSrc: "/src/assets/images/pana.png",
      bgColor: "bg-[#BEE7F9]"
    },
    {
      title: "VISITING",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col items-center">
              <div className={`${card.bgColor} w-full flex justify-center items-center p-6`}>
                <img src={card.imgSrc} alt={card.title} className="h-[180px] object-contain" />
              </div>
              <div className="p-6 text-center flex flex-col flex-grow">
                <h4 className="text-2xl text-[#05224F] font-bold mb-4">{card.title}</h4>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAttend;
