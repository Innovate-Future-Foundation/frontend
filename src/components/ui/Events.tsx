export const Events: React.FC = () => {
  const events = [
    {
      title: "Navi Kaur",
      date: "01/01/2024",
      location: "Sydney",
      description: "Level 100-mapping to AI certification by Navi Kaur",
      image: "/src/assets/images/Allura Online Searching.png",
      bgColor: "#9E58AA"
    },
    {
      title: "AWS Start Up",
      date: "01/01/2024",
      location: "Sydney",
      description: "How to apply for AWS credit for start up? Just in this AWS program.",
      image: "/src/assets/images/Allura Online Searching-1.png",
      bgColor: "#F36D26"
    },
    {
      title: "Johnny Zhao",
      date: "01/01/2024",
      location: "Sydney",
      description: "Redshift VEGA natural language query integration, generate sql query",
      image: "/src/assets/images/Allura Online Searching-2.png",
      bgColor: "#046FFB"
    }
  ];

  return (
    <section className="bg-[#f9f9f9] py-12">
      {/* 容器：标题+卡片 */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#1c2c4c] text-center mb-8">Past Events</h2>

        {/* 网格布局，始终三列并列 */}
        <div className="grid grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
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
              {/* 上半部分：如果想用彩色背景，可用一个 <div> 并利用 event.bgColor */}
              {/* 如果要放图片，可直接放 <img>，这里示例彩色背景 + 居中插图 */}
              <div className="w-full h-1/2 flex items-center justify-center" style={{ backgroundColor: event.bgColor }}>
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              </div>

              {/* 下半部分：文字区域 */}
              <div className="w-full h-1/2 p-4 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{event.description}</p>
                <div className="flex items-center justify-center text-sm text-gray-600 mt-3 gap-4">
                  <div className="flex items-center gap-1">
                    <img src="/src/assets/images/date.png" alt="Date Icon" className="w-4 h-4" />
                    <span>{event.date}</span>
                    <img src="/src/assets/images/location.png" alt="Location Icon" className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
