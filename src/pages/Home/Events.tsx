import React from "react";

export const Events: React.FC = () => {
  const events = [
    {
      title: "General AI Professional Development",
      date: "03/01/2025",
      location: "Sydney",
      description:
        "We are embarking on an enriching journey through the world of artificial intelligence with our exclusive AI Immersion Program in Sydney, Australia. Over three dynamic days, participants will engage in hands-on workshops, cultural exchanges, and cutting-edge technology experiences.",
      image: "/images/image of Gen AI event.png",
      bgColor: "#9E58AA"
    },
    {
      title: "General AI EOY Professional Development",
      date: "06/12/2024",
      location: "Sydney",
      description:
        "This event brings together industry experts to explore AI trends, innovation, and career opportunities. With insights from leaders in AI-driven accounting and job market dynamics, attendees will gain valuable knowledge on the future of AI and its impact on professional growth.",
      image: "/images/image of EOY event.png",
      bgColor: "#F36D26"
    },
    {
      title: "AI In AWS",
      date: "16/10/2024",
      location: "Sydney",
      description:
        "This seminar delves into the latest AI advancements within the AWS ecosystem, featuring expert insights, industry applications, and discussions on emerging trends. Attendees will explore how AI is transforming cloud computing, enhancing efficiency, and driving innovation across various sectors.",
      image: "/images/image of AWS event.png",
      bgColor: "#046FFB"
    }
  ];

  return (
    <section className="bg-[#f9f9f9] py-12">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-4xl text-[#062B48] text-center mb-12">Past Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {events.map((event, index) => {
            const cardContent = (
              <div
                className="
                  bg-white 
                  rounded-xl 
                  shadow-md 
                  overflow-hidden 
                  flex 
                  flex-col 
                  h-full 
                  text-center
                "
              >
                <div className="w-full h-40 flex items-center justify-center" style={{ backgroundColor: event.bgColor }}>
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>

                <div className="w-full p-4 flex flex-col flex-1 justify-between">
                  <h3 className="text-lg font-bold text-[#062B48]">{event.title}</h3>
                  <div className="h-20 mt-2 overflow-hidden">
                    <p className="text-sm text-[#9DABBE]">{event.description}</p>
                  </div>

                  <div className="flex items-center justify-center text-sm text-[#062B48] mt-3 gap-4">
                    <div className="flex items-center gap-1">
                      <img src="/images/date.png" alt="Date Icon" className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src="/images/location.png" alt="Location Icon" className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );

            return (
              <a key={index} href="https://jracademy.notion.site/afa-hongkong-tour" target="_blank" rel="noopener noreferrer" className="h-full">
                {cardContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
