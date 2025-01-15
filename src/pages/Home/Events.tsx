import React from "react";
import { Link } from "react-router-dom";

export const Events: React.FC = () => {
  const events = [
    {
      title: "Navi Kaur",
      date: "18/01/2024",
      location: "Sydney",
      description: "Level 100-mapping to AI certification by Navi Kaur",
      image: "/src/assets/images/Allura Online Searching.png",
      bgColor: "#9E58AA"
    },
    {
      title: "AWS Start Up",
      date: "23/01/2024",
      location: "Sydney",
      description: "How to apply for AWS credit for start up? Just in this AWS program.",
      image: "/src/assets/images/Allura Online Searching-1.png",
      bgColor: "#F36D26"
    },
    {
      title: "Johnny Zhao",
      date: "01/03/2024",
      location: "Sydney",
      description: "Redshift VEGA natural language query integration, generate sql query",
      image: "/src/assets/images/Allura Online Searching-2.png",
      bgColor: "#046FFB"
    }
  ];

  return (
    <section className="bg-[#f9f9f9] py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-[#062B48] text-center mb-8">Upcoming Events</h2>
        <div className="flex flex-row justify-center items-start gap-8">
          {events.map((event, index) => {
            const cardContent = (
              <div
                className="
                  w-64 h-80 
                  bg-white 
                  rounded-xl 
                  shadow-md 
                  overflow-hidden 
                  flex flex-col 
                  items-center 
                  text-center
                "
              >
                <div className="w-full h-1/2 flex items-center justify-center" style={{ backgroundColor: event.bgColor }}>
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>

                <div className="w-full h-1/2 p-4 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-[#062B48]">{event.title}</h3>
                  <p className="text-sm text-[#9DABBE] mt-1">{event.description}</p>
                  <div className="flex items-center justify-center text-sm text-[#062B48] mt-3 gap-4">
                    <div className="flex items-center gap-1">
                      <img src="/src/assets/images/date.png" alt="Date Icon" className="w-4 h-4" />
                      <span>{event.date}</span>
                      <img src="/src/assets/images/location.png" alt="Location Icon" className="w-4 h-4" />
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
