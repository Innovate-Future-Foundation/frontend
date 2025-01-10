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
        <h2 className="text-4xl font-bold text-center text-[#05224F] mb-10">Why Attend</h2>
        <div className="flex justify-center gap-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center text-center w-[333px] h-[640px]">
              <div className={`${card.bgColor} w-full h-[240px] flex justify-center items-center rounded-t-lg`}>
                <img src={card.imgSrc} alt={card.title} className="w-[191px] h-[172px]" />
              </div>
              <h3 className="text-2xl text-[#05224F] font-bold my-4">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAttend;
