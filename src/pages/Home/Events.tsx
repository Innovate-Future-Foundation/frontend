import React from "react";
import { Link } from "react-router-dom";

export const Events: React.FC = () => {
  const events = [
    {
      title: "Navi Kaur",
      date: "18/01/2025",
      location: "Sydney",
      description: "Level 100-mapping to AI certification by Navi Kaur.",
      image: "/images/Allura Online Searching.png",
      bgColor: "#9E58AA"
    },
    {
      title: "AWS Start Up",
      date: "23/01/2025",
      location: "Sydney",
      description: "How to apply for AWS credit for start up? Just in this AWS program.",
      image: "/images/Allura Online Searching-1.png",
      bgColor: "#F36D26"
    },
    {
      title: "Johnny Zhao",
      date: "01/03/2025",
      location: "Sydney",
      description: "Redshift VEGA natural language query integration.",
      image: "/images/Allura Online Searching-2.png",
      bgColor: "#046FFB"
    }
  ];

  return (
    <section className="bg-[#f9f9f9] py-12">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-4xl text-[#062B48] text-center mb-12">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {events.map((event, index) => {
            const cardContent = (
              <div
                className="
                  bg-white 
                  rounded-xl 
                  shadow-md 
                  overflow-hidden 
                  flex flex-col 
                  items-center 
                  text-center
                "
              >
                <div className="w-full h-40 flex items-center justify-center" style={{ backgroundColor: event.bgColor }}>
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>

                <div className="w-full p-4 flex flex-col justify-between">
                  <h3 className="text-lg font-bold text-[#062B48]">{event.title}</h3>
                  <p className="text-sm text-[#9DABBE] mt-2">{event.description}</p>
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
            return event.title === "AWS Start Up" ? (
              <Link to="/eventpage" key={index}>
                {cardContent}
              </Link>
            ) : (
              <div key={index}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
