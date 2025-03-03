import React, { useState } from "react";
import technologyIcon from "/assets/icons/futureScienceTechnologyEducation.svg";
import educationIcon from "/assets/icons/internationalStudyToursExploration.svg";
import mentorIcon from "/assets/icons/industryMentorGrowthCommunity.svg";
import communityIcon from "/assets/icons/exclusiveCommunityNetworkExpansion.svg";
import competitionIcon from "/assets/icons/aiScienceTechnologyCompetition.svg";
import futureTechnology from "/assets/images/futureTechnologyDriven.jpg";
import internationalStudy from "/assets/images/internationalStudyTours.jpg";
import industryMentor from "/assets/images/industryMentorPracticalTraining.jpg";
import exclusiveCommunity from "/assets/images/exclusiveCommunityNetworkExpansion.jpg";
import aiCompetition from "/assets/images/aiScienceTechnologyCompetition.jpg";
import MainLayout from "@/layouts/MainLayout";

interface WhyChooseIFABenefit {
  title: string;
  description: string;
}

interface WhyChooseIFA {
  title: string;
  description: string;
  benefits: WhyChooseIFABenefit[];
}

interface Module {
  icon: string;
  title: string;
  features: string[];
}

interface Tab {
  id: string;
  title: string;
  content: string;
  features?: string[];
  modules?: Module[];
  whyChooseIFA?: WhyChooseIFA;
}

const HomePage: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(0);

  const CorePrograms = () => {
    const [activeTab, setActiveTab] = useState("01");

    const tabs: Tab[] = [
      {
        id: "01",
        title: "Global Study Tours",
        content: "Lead the students to visit the world famous science and technology & enterprise, expand the international field of vision.",
        features: [
          "MIT, Harvard, Stanford and other well-known universities in-depth experience",
          "Visit Silicon Valley technology companies, close contact with AI, robotics and other industries",
          "Cultural exploration, language learning, international exchange"
        ]
      },
      {
        id: "02",
        title: "Real-time AI Travel Translator",
        content: "Advanced AI translation technology to break down language barriers during international travel.",
        features: [
          "Instant voice translation in 20+ languages",
          "OCR image translation, real-time scanning menu, mark",
          "AI context optimization makes communication more natural"
        ]
      },
      {
        id: "03",
        title: "IFA Saas",
        content:
          "IFA SaaS is an intelligent management platform specifically designed for overseas study tours, helping students, parents, teachers and enterprise managers easily connect information and efficiently manage itineraries to ensure a smoother, safer and more efficient study tour experience.",
        modules: [
          {
            icon: "/assets/icons/studentPortal.svg",
            title: "Student Portal",
            features: ["AI real-time translation", "Social learning journal", "Itinerary View & Task alerts", "Awards and certifications"]
          },
          {
            icon: "/assets/icons/teacherPortal.svg",
            title: "Teacher Portal",
            features: [
              "Schedule & Classroom management",
              "Attendance & real-time check-in",
              "Student status update",
              "Commodity purchasing & receiving management",
              "Quick Tax Refund"
            ]
          },
          {
            icon: "/assets/icons/adminPortal.svg",
            title: "Admin Portal",
            features: ["Enterprise account management", "Study tour project management", "Student & Teacher management", "Data Analysis & Feedback"]
          },
          {
            icon: "/assets/icons/parentPortal.svg",
            title: "Parent Portal",
            features: [
              "Real-time location & security monitoring",
              "Daily news & itinerary updates",
              "Shopping Mall & Payment management",
              "Order & Expense Management"
            ]
          }
        ],
        whyChooseIFA: {
          title: "Why Choose IFA",
          description: "Experience seamless study tour management with our comprehensive SaaS platform",
          benefits: [
            {
              title: "Efficient Management",
              description: "Streamline all aspects of study tour organization"
            },
            {
              title: "Real-time Updates",
              description: "Stay informed with instant notifications and updates"
            },
            {
              title: "Enhanced Safety",
              description: "Ensure student safety with advanced tracking features"
            }
          ]
        }
      }
    ];

    return (
      <div className="px-[5.6%] pb-16 w-full">
        <h2 className="text-3xl font-bold text-center mb-16">Our Core Programs – Learn, Innovate, Lead</h2>

        {/* Tabs - Responsive layout with reduced gap */}
        <div className="font-['Helvetica-Bold'] flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-20 xl:gap-56 mb-8">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="relative pb-4 group">
              <div className="flex items-center gap-2">
                {activeTab !== tab.id && <span className="text-gray-400 font-semibold">{tab.id}</span>}
                <span className={`${activeTab === tab.id ? "text-primary font-semibold" : "text-foreground font-semibold hover:text-muted-foreground"}`}>
                  {tab.title}
                </span>
              </div>
              {activeTab === tab.id && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tabs.map(tab => (
          <div key={tab.id} className={`transition-all duration-300 ${activeTab === tab.id ? "block" : "hidden"}`}>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              {/* Header section */}
              <div className="bg-foreground rounded-3xl mx-[-24px] mt-[-24px] p-6 sm:p-8 md:p-12 text-primary-foreground mb-8 md:mb-12">
                <div className="flex items-center gap-4 mb-4 md:mb-8">
                  <span className="text-2xl md:text-3xl font-bold text-white">{tab.id}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{tab.title}</h3>
                </div>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed max-w-[80%]">{tab.content}</p>
              </div>

              {/* Tab 03 - Complex layout with modules */}
              {tab.id === "03" && tab.modules ? (
                <div className="flex flex-col gap-8 md:gap-16">
                  {/* Modules grid - responsive layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {tab.modules.map((module, index) => (
                      <div key={index} className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                          <img src={module.icon} alt={module.title} className="w-8 md:w-10 h-8 md:h-10" />
                          <h4 className="text-base md:text-lg font-semibold">{module.title}</h4>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl h-full">
                          <div className="flex items-center gap-2 px-4 pt-6 md:pt-8 mb-4 md:mb-8">
                            <img src="/assets/icons/feature.svg" alt="feature" className="w-5 h-5" />
                            <span className="text-sm font-bold">Core function</span>
                          </div>

                          <ul className="flex flex-col gap-4 md:gap-6 px-4 pb-6 md:pb-10">
                            {module.features.map((feature, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-gray-400 mt-1">•</span>
                                <span className="line-clamp-3">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Why choose section - responsive layout */}
                  <div className="flex flex-col lg:flex-row lg:justify-between mt-8 md:mt-16">
                    {/* Left content */}
                    <div className="w-full lg:w-[45%] px-4 md:pl-12 mb-8 lg:mb-0">
                      <h3 className="text-2xl md:text-[28px] font-bold mb-4 md:mb-6 text-foreground">Why choose IFA SaaS?</h3>
                      <p className="text-muted-foreground mb-6 md:mb-8 leading-relaxed max-w-[360px]">
                        IFA SaaS makes overseas study tour management smarter and more convenient, creating an immersive and worry-free international learning
                        experience for every student!
                      </p>
                      <button className="font-['Helvetica-Bold'] px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2">
                        Explore Programs
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </button>
                    </div>

                    {/* Right content - cards with responsive layout */}
                    <div className="w-full lg:w-[50%] px-4 lg:px-0">
                      {/* Container for all cards */}
                      <div className="grid grid-cols-1 gap-6">
                        {/* Mobile and tablet layout (<lg screens) */}
                        <div className="lg:hidden space-y-6">
                          {/* First card - mobile/tablet */}
                          <div className="bg-muted rounded-2xl py-8 px-6 w-full">
                            <h4 className="text-lg font-semibold mb-4">Intelligent & Data driven</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              Combine AI translation, personalized recommendation, and intelligent itinerary management to provide a seamless study tour
                              experience.
                            </p>
                          </div>

                          {/* Second card - mobile/tablet */}
                          <div className="bg-muted rounded-2xl py-8 px-6 w-full">
                            <h4 className="text-lg font-semibold mb-4">High gold content certification</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              At the end of the tour, students will receive an official letter of recommendation and a certificate of completion to facilitate
                              their future study and career development.
                            </p>
                          </div>

                          {/* Third card - mobile/tablet */}
                          <div className="bg-muted rounded-2xl py-8 px-6 w-full">
                            <h4 className="text-lg font-semibold mb-4">One-stop management platform</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              All-round linkage between students, parents, teachers and enterprises simplifies information flow and reduces communication costs.
                            </p>
                          </div>
                        </div>

                        {/* Desktop layout (≥lg screens) */}
                        <div className="hidden lg:block relative">
                          {/* First card - desktop */}
                          <div className="bg-muted rounded-2xl py-8 md:py-14 px-6 md:px-12 w-[480px] lg:ml-[-10%]">
                            <h4 className="text-lg font-semibold mb-4 md:mb-8">Intelligent & Data driven</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              Combine AI translation, personalized recommendation, and intelligent itinerary management to provide a seamless study tour
                              experience.
                            </p>
                          </div>

                          {/* Second card - desktop */}
                          <div className="bg-muted rounded-2xl py-8 md:py-14 px-6 md:px-12 w-[480px] lg:ml-[10%] mt-6">
                            <h4 className="text-lg font-semibold mb-4 md:mb-6">High gold content certification</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              At the end of the tour, students will receive an official letter of recommendation and a certificate of completion to facilitate
                              their future study and career development.
                            </p>
                          </div>

                          {/* Third card - desktop */}
                          <div className="bg-muted rounded-2xl py-14 px-12 w-[480px] ml-[-72%] -mt-40">
                            <h4 className="text-lg font-semibold mb-6">One-stop management platform</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              All-round linkage between students, parents, teachers and enterprises simplifies information flow and reduces communication costs.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg flex items-center gap-2 mb-6 md:mb-10 font-semibold text-foreground">
                    <img src="/assets/icons/feature.svg" alt="feature" className="w-5 h-5" />
                    Feature
                  </h4>

                  {/* Feature cards - responsive grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {tab.features?.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 text-center min-h-[180px] flex items-center justify-center"
                      >
                        <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-secondary-light">
        <div className="w-full  min-h-screen bg-background">
          <div className="px-[5.6%] pt-20">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-14 mb-16">
              {/* Left side with title - responsive text size */}
              <div className="w-full lg:w-[55%]">
                <h1 className="font-['big-john'] text-primary-foreground60">
                  <div className="block text-foreground text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.5rem] leading-[1.4] tracking-normal">
                    INNOVATE, EXPLORE,
                    <br />
                    GROWEMPOWERING FUTURE
                    <br />
                    GLOBAL INNOVATORS
                  </div>
                </h1>
              </div>

              {/* Right content - responsive visibility and layout */}
              <div className="w-full lg:w-[45%] pt-4 lg:pt-8 lg:pl-20">
                <p className="text-primary-foreground30 text-sm sm:text-base mb-6 lg:mb-8">
                  Unlock international learning experiences through AI-driven education, global study tours, and mentorship.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground text-sm sm:text-base font-bold rounded-full hover:bg-primary-dark transition-colors flex items-center justify-center sm:justify-start gap-2">
                    Join a Program
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                        <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                  <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border border-[#1A1A1A] text-sm sm:text-base font-bold rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center sm:justify-start gap-2">
                    Explore Events
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                        <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Image and cards section with overlap */}
            <div className="font-['Helvetica'] relative">
              {/* Image container */}
              <div className="relative w-full">
                <img
                  src="/assets/images/bgForImageAndCardsSection.webp"
                  srcSet="/assets/images/bgForImageAndCardsSection@2x.webp 2x"
                  alt="Background"
                  className="w-full h-[40rem] object-cover rounded-2xl"
                />

                {/* Floating labels - hidden on screens smaller than lg (1024px) */}
                <div className="hidden lg:block">
                  {/* First label */}
                  <div
                    className="absolute left-[4.5%] top-[16.4%] px-10 py-3 bg-white/20 backdrop-blur-[2px] overflow-hidden"
                    style={{
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.2)",
                      position: "relative"
                    }}
                  >
                    <div
                      style={{
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "999px",
                        padding: "1px",
                        background: "linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0))",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        pointerEvents: "none"
                      }}
                    />
                    <span className="relative z-10 text-base font-medium text-white whitespace-normal">
                      Letter of recommendation
                      <br />
                      of famous universities
                    </span>
                  </div>

                  {/* Second label */}
                  <div
                    className="absolute left-[44%] top-[9%] px-10 py-3 bg-white/20 backdrop-blur-[2px] overflow-hidden"
                    style={{
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.2)",
                      position: "relative"
                    }}
                  >
                    <div
                      style={{
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "999px",
                        padding: "1px",
                        background: "linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0))",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        pointerEvents: "none"
                      }}
                    />
                    <span className="relative z-10 text-base font-medium text-white whitespace-normal">
                      AI Science and
                      <br />
                      technology experience
                    </span>
                  </div>

                  {/* Third label */}
                  <div
                    className="absolute left-[5%] top-[44%] px-10 py-3 bg-white/20 backdrop-blur-[2px] overflow-hidden"
                    style={{
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.2)",
                      position: "relative"
                    }}
                  >
                    <div
                      style={{
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "999px",
                        padding: "1px",
                        background: "linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0))",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        pointerEvents: "none"
                      }}
                    />
                    <span className="relative z-10 text-base font-medium text-white">Study tour projects</span>
                  </div>

                  {/* Fourth label */}
                  <div
                    className="absolute left-[81%] top-[25%] px-10 py-3 bg-white/20 backdrop-blur-[2px] overflow-hidden"
                    style={{
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.2)",
                      position: "relative"
                    }}
                  >
                    <div
                      style={{
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "999px",
                        padding: "1px",
                        background: "linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0))",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        pointerEvents: "none"
                      }}
                    />
                    <span className="relative z-10 text-base font-medium text-white whitespace-normal">
                      Practical training of
                      <br />
                      famous enterprises
                    </span>
                  </div>

                  {/* Fifth label */}
                  <div
                    className="absolute left-[70%] top-[50%] px-10 py-3 bg-white/20 backdrop-blur-[2px] overflow-hidden"
                    style={{
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.2)",
                      position: "relative"
                    }}
                  >
                    <div
                      style={{
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "999px",
                        padding: "1px",
                        background: "linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0))",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        pointerEvents: "none"
                      }}
                    />
                    <span className="relative z-10 text-base font-medium text-white">Overseas career planning</span>
                  </div>
                </div>
              </div>

              {/* Three cards below the image */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-[-80px] relative z-10 px-4 md:px-0">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-lg font-['Helvetica-Bold'] font-semibold text-center mb-4 min-h-[56px]">Future science and technology education</h3>
                  <p className="text-sm text-gray-600 text-center">Combine AI, cloud computing, and data science</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-lg font-['Helvetica-Bold'] font-semibold text-center mb-4 min-h-[56px]">
                    International Study Tours & Cultural Exploration
                  </h3>
                  <p className="text-sm text-gray-600 text-center">World famous schools study tour, enterprise visit</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-lg font-['Helvetica-Bold'] font-semibold text-center mb-4 min-h-[56px]">Career Planning & Community</h3>
                  <p className="text-sm text-gray-600 text-center">Industry mentor, exclusive growth community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Expand Your Horizons with IFA */}
          <div className="px-[5.6%] pt-16 sm:pt-24 lg:pt-36 xl:pt-48 pb-16 sm:pb-20 lg:pb-24 xl:pb-32">
            <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-center mb-8 sm:mb-10 lg:mb-16">Expand Your Horizons with IFA</h2>

            {/* Expand Your Horizons with IFA cards */}
            {(() => {
              const cardData = [
                {
                  title: "Future technology driven",
                  icon: technologyIcon,
                  image: futureTechnology,
                  content: [
                    "Learning AI, chain blocks, cloud computing, big data such as cutting-edge technology",
                    "Visit global innovation centers such as Silicon Valley and MIT"
                  ]
                },
                {
                  title: "International Study Tours & Cultural Experiences",
                  icon: educationIcon,
                  image: internationalStudy,
                  content: ["Immersive language learning, cultural adaptation", "Famous enterprises visit (AWS, Google, Microsoft)"]
                },
                {
                  title: "Industry Mentor & practical training",
                  icon: mentorIcon,
                  image: industryMentor,
                  content: ["Global mentorship", "Real case teaching + AI-assisted learning"]
                },
                {
                  title: "Exclusive Community & Network Expansion",
                  icon: communityIcon,
                  image: exclusiveCommunity,
                  content: ["Meet excellent students from different countries", "Participate in entrepreneurial projects in the field of AI & Web3.0"]
                },
                {
                  title: "AI Science & Technology Competition",
                  icon: competitionIcon,
                  image: aiCompetition,
                  content: [
                    "Participate in the competition of artificial intelligence works and challenge the limits of innovation",
                    "The winners receive internships or letters of recommendation from well-known technology companies",
                    "Global certified AI competition certificate to help future studies & job hunting"
                  ]
                }
              ];

              return (
                <>
                  {/* Mobile view (< 768px) - vertical cards */}
                  <div className="flex flex-col gap-4 md:hidden">
                    {cardData.map((card, index) => (
                      <div
                        key={index}
                        onClick={() => setActiveCard(activeCard === index ? null : index)}
                        className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                          activeCard === index ? "h-[320px]" : "h-[80px]"
                        }`}
                        style={{
                          backgroundImage: activeCard === index ? `url(${card.image})` : "none",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundColor: activeCard === index ? "" : "#F8F9FB"
                        }}
                      >
                        {/* inactive state */}
                        <div className={`absolute inset-0 flex items-center ${activeCard === index ? "opacity-0 invisible" : "opacity-100"}`}>
                          <div className="flex items-center w-full px-4">
                            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                              <img src={card.icon} alt={card.title} className="w-6 h-6" />
                            </div>
                            <h3 className="text-[#1A1A1A] text-sm font-semibold ml-3 font-['Helvetica-Bold'] leading-tight line-clamp-2">{card.title}</h3>
                          </div>
                        </div>

                        {/* active state */}
                        <div className={`absolute inset-0 flex flex-col ${activeCard === index ? "opacity-100" : "opacity-0 invisible"}`}>
                          {/* add blur*/}
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

                          <div className="relative z-10 flex flex-col h-full p-4">
                            {/* active state title section */}
                            <div className="font-['Helvetica'] pt-2">
                              <div className="flex items-start gap-2">
                                {/* icon wrapper */}
                                <div className="flex-shrink-0 relative" style={{ width: "32px", height: "32px" }}>
                                  <div className="absolute inset-0 rounded-full bg-white" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <img src={card.icon} alt={card.title} className="w-5 h-5" />
                                  </div>
                                </div>

                                <h3 className="text-white text-base font-semibold font-['Helvetica-Bold'] pt-1 max-w-[calc(100%-40px)] break-words line-clamp-2">
                                  {card.title}
                                </h3>
                              </div>
                            </div>

                            {/* content list section */}
                            <div className="flex-1 mt-4 overflow-y-auto">
                              <div className="flex flex-col gap-4 w-full">
                                {card.content.map((item, i) => (
                                  <div key={i} className="flex items-start gap-2">
                                    <img src="/assets/icons/plus.svg" alt="plus" className="w-3 h-3 flex-shrink-0 mt-[0.2rem]" />
                                    <span className="text-white/90 text-xs leading-tight flex-1">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Medium to Large screens (≥ 768px) - horizontal cards */}
                  <div className="hidden md:flex justify-center gap-6 h-[450px] mb-12 overflow-x-auto md:overflow-x-visible">
                    {cardData.map((card, index) => (
                      <div
                        key={index}
                        onClick={() => setActiveCard(activeCard === index ? null : index)}
                        className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
                          activeCard === index ? "flex-[2.5] transition-[flex]" : "w-[190px] xl:w-[230px] flex-shrink-0 bg-[#F8F9FB]"
                        }`}
                        style={{
                          backgroundImage: activeCard === index ? `url(${card.image})` : "none",
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                      >
                        {/* inactive state */}
                        <div className={`absolute inset-0 flex flex-col ${activeCard === index ? "opacity-0 invisible" : "opacity-100"}`}>
                          {/* icon container */}
                          <div className="h-[260px] xl:h-[300px] flex items-center justify-center">
                            <div className="w-20 xl:w-24 h-20 xl:h-24 flex items-center justify-center">
                              <img src={card.icon} alt={card.title} className="w-12 xl:w-14 h-12 xl:h-14" />
                            </div>
                          </div>

                          {/* title section - with responsive visibility */}
                          <div className="px-4 xl:px-6 pb-8">
                            {/* Text with line clamp */}
                            <h3 className="text-[#1A1A1A] text-xs xl:text-sm font-semibold text-center font-['Helvetica-Bold'] leading-tight whitespace-normal break-words line-clamp-4">
                              {card.title}
                            </h3>
                          </div>
                        </div>

                        {/* active state */}
                        <div className={`absolute inset-0 flex flex-col ${activeCard === index ? "opacity-100" : "opacity-0 invisible"}`}>
                          {/* add blur*/}
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

                          <div className="relative z-10 flex flex-col h-full">
                            {/* active state title section */}
                            <div className="font-['Helvetica'] pt-10 xl:pt-14 pl-8 xl:pl-10 pr-8 xl:pr-10">
                              <div className="flex items-start gap-3">
                                {/* icon wrapper */}
                                <div className="flex-shrink-0 relative" style={{ width: "48px", height: "48px" }}>
                                  <div className="absolute inset-0 rounded-full bg-white" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <img src={card.icon} alt={card.title} className="w-7 xl:w-8 h-7 xl:h-8" />
                                  </div>
                                </div>

                                <h3 className="text-white text-lg xl:text-xl font-semibold font-['Helvetica-Bold'] pt-1.5 max-w-[calc(100%-60px)] break-words line-clamp-2">
                                  {card.title}
                                </h3>
                              </div>
                            </div>

                            {/* content list section */}
                            <div className="flex-1 pl-8 pr-6 flex items-center -mt-2 xl:-mt-4">
                              <div className="flex flex-col gap-4 w-full">
                                {/* Show only first 2 items on smaller screens */}
                                {card.content.map((item, i) => (
                                  <div key={i} className={`flex items-start gap-3 ${i >= 2 && card.content.length > 2 ? "hidden xl:flex" : ""}`}>
                                    <img src="/assets/icons/plus.svg" alt="plus" className="w-3.5 h-3.5 flex-shrink-0 mt-[0.1rem]" />
                                    <span className="text-white/90 text-sm font-['Helvetica'] leading-5 flex-1 line-clamp-2">{item}</span>
                                  </div>
                                ))}
                                {/* Show "...and more" if content is truncated */}
                                {card.content.length > 2 && <span className="text-white/70 text-xs italic ml-6 xl:hidden">...and more</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}

            {/* Start Your Journey Button */}
            <div className="flex justify-center mt-8 sm:mt-12 lg:mt-16">
              <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground text-sm sm:text-base font-bold rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2">
                Start Your Journey
                <div className="w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Core Programs Section */}
          <CorePrograms />

          {/* Trusted by Global Leaders in Education & Tech */}
          <div className="px-[5.6%] py-16 md:py-24 lg:py-32 bg-white">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 lg:mb-16">Trusted by Global Leaders in Education & Tech</h2>

            <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
              {/* Partners grid - all rows combined into a responsive grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10 lg:gap-20 justify-items-center">
                {/* First row */}
                <img src="/assets/images/aws.jpg" alt="AWS" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                <img src="/assets/images/google.jpg" alt="Google" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                <img src="/assets/images/microsoft.jpg" alt="Microsoft" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                <img src="/assets/images/tesla.jpg" alt="Tesla" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                <img src="/assets/images/openai.jpg" alt="OpenAI" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />

                {/* Second row */}
                <img src="/assets/images/jobpin.png" alt="JobPin" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                <img src="/assets/images/jrAcademy.png" alt="JR Academy" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                <img src="/assets/images/mit.jpg" alt="MIT" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                <img src="/assets/images/stanford.jpg" alt="Stanford" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                <img src="/assets/images/harvard.png" alt="Harvard" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />

                {/* Third row */}
                <img src="/assets/images/usyd.png" alt="University of Sydney" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                <img src="/assets/images/uq.png" alt="University of Queensland" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                <img src="/assets/images/rmit.jpg" alt="RMIT" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                <img src="/assets/images/y.jpg" alt="Y Combinator" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                <img src="/assets/images/awsStartup.jpg" alt="AWS Startups" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
              </div>
            </div>

            {/* Become a Partner Button */}
            <div className="flex justify-center mt-8 md:mt-12 lg:mt-16">
              <button className="px-5 py-2.5 md:px-6 md:py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2">
                Become a Partner
                <div className="w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Membership Section */}
          <div className="px-[5.6%] py-16">
            <h2 className="text-3xl font-bold text-center mb-16">Unlock Your Potential with IFA Membership</h2>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-4 gap-6 mb-16">
              {/* General AI Professional Development */}
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                    <img
                      src="/assets/images/generalAiProfessionalDevelopment.jpg"
                      alt="General AI Professional Development"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">General AI Professional Development</h3>
                </div>
                <button className="font-['Helvetica'] flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-semibold group">
                  Read More
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/10">
                    <img src="/assets/icons/arrow.svg" alt="arrow" className="w-2 h-2 group-hover:brightness-0 group-hover:invert" />
                  </div>
                </button>
              </div>

              {/* Quantum Computing Seminar */}
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                    <img src="/assets/images/quantumComputingSeminar.jpg" alt="Quantum Computing Seminar" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Quantum Computing Seminar</h3>
                </div>
                <button className="font-['Helvetica'] flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-semibold group">
                  Read More
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/10">
                    <img src="/assets/icons/arrow.svg" alt="arrow" className="w-2 h-2 group-hover:brightness-0 group-hover:invert" />
                  </div>
                </button>
              </div>

              {/* AI in AWS */}
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                    <img src="/assets/images/allInAws.jpg" alt="AI in AWS" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">AI in AWS</h3>
                </div>
                <button className="font-['Helvetica'] flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-semibold group">
                  Read More
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/10">
                    <img src="/assets/icons/arrow.svg" alt="arrow" className="w-2 h-2 group-hover:brightness-0 group-hover:invert" />
                  </div>
                </button>
              </div>

              {/* Past Events for Shanghai */}
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                    <img src="/assets/images/pastEventsForShanghai.jpg" alt="Past Events for Shanghai" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Past Events for Shanghai</h3>
                </div>
                <button className="font-['Helvetica'] flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-semibold group">
                  Read More
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/10">
                    <img src="/assets/icons/arrow.svg" alt="arrow" className="w-2 h-2 group-hover:brightness-0 group-hover:invert" />
                  </div>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-6">
              <button className="font-['Helvetica'] px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2">
                Register Now
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
              <button className="font-['Helvetica'] px-6 py-3 border border-[#1A1A1A] text-[#1A1A1A] font-bold rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center sm:justify-start gap-2">
                See More Events
                <div className="w-6 h-6 bg-[#F2F4F7] rounded-full flex items-center justify-center">
                  <img src="/assets/icons/arrow.svg" alt="arrow" className="w-2 h-2" />
                </div>
              </button>
            </div>
          </div>

          {/* Membership Tiers */}
          <div className="px-[5.6%] py-32">
            <h2 className="text-3xl font-bold text-center mb-24">IFA Exclusive Events & Global Experiences</h2>

            <div className="grid grid-cols-3 gap-8 mb-16">
              {/* Basic Tier */}
              <div className="font-['Helvetica'] relative bg-muted rounded-2xl p-12 flex flex-col items-center">
                <img src="/assets/icons/basic.svg" alt="Basic" className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2 p-2">Basic</h3>
                <p className="text-gray-600 text-center mb-12 text-sm">Some content is accessible</p>

                {/* semi-circle */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white rounded-t-full"></div>

                {/* circle button */}
                <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#F2F4F7] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#046FFB]/10 shadow-md">
                  <img src="/assets/icons/arrow.svg" alt="arrow" className="w-3 h-3" />
                </div>
              </div>

              {/* Premium Tier */}
              <div className="relative bg-muted rounded-2xl p-12 flex flex-col items-center">
                <img src="/assets/icons/premium.svg" alt="Premium" className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2 p-2">Premium</h3>
                <p className="text-gray-600 text-center mb-12 text-sm">Discounts on exclusive courses and study Tours</p>

                {/* semi-circle */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white rounded-t-full"></div>

                {/* circle button */}
                <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#F2F4F7] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#046FFB]/10 shadow-md">
                  <img src="/assets/icons/arrow.svg" alt="arrow" className="w-3 h-3" />
                </div>
              </div>

              {/* VIP Tier */}
              <div className="relative bg-muted rounded-2xl p-12 flex flex-col items-center">
                <img src="/assets/icons/vip.svg" alt="IFA VIP" className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2 p-2">IFA VIP</h3>
                <p className="text-gray-600 text-center mb-12 text-sm">Tutor 1V1 + AI interview guide</p>

                {/* semi-circle */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white rounded-t-full"></div>

                {/* circle button */}
                <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#F2F4F7] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#046FFB]/10 shadow-md">
                  <img src="/assets/icons/arrow.svg" alt="arrow" className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Upgrade Button */}
            <div className="flex justify-center mt-24 mb-12">
              <button className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2">
                Upgrade Now
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Community Section */}
          <div className="px-[5.6%]">
            <div className="relative">
              {/* main image*/}
              <img src="/assets/images/communitySection.jpg" alt="IFA Community" className="w-full rounded-3xl" />

              {/* Desktop layout - only visible on xl and larger screens */}
              <div className="absolute left-[40%] top-[3.6%] max-w-[80%] hidden xl:block">
                <h2 className="text-3xl font-bold text-foreground whitespace-nowrap">Join the IFA community and expand the possibilities</h2>
              </div>

              <div className="absolute left-[64.1%] top-[17.6%] max-w-[40%] hidden xl:block">
                <p className="text-gray-600 text-sm mb-8">
                  Whether you are a future engineer, technology entrepreneur, or an explorer with a passion for innovation, IFA welcomes you to join us! Here,
                  you can meet like-minded partners, get mentors, master cutting-edge technology, and start a new journey of professional growth!
                </p>
                <button className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2">
                  Join the Community
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Medium layout - only visible on lg to xl screens */}
              <div className="absolute right-[5%] top-[5%] w-[40%] hidden lg:block xl:hidden">
                <h2 className="text-2xl font-bold text-foreground text-right">Join the IFA community and expand the possibilities</h2>
              </div>

              {/* Mobile layout - only visible on smaller than lg screens */}
              <div className="absolute right-[5%] top-[5%] w-[40%] lg:hidden text-right">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-foreground">
                  Join the IFA
                  <br />
                  community and
                  <br />
                  expand the
                  <br />
                  possibilities
                </h2>
              </div>

              {/* bottom tag list */}
              <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-4 sm:left-8 md:left-12 flex flex-col gap-2 sm:gap-3 md:gap-4 hidden md:flex">
                <div
                  className="px-4 sm:px-6 md:px-10 py-2 sm:py-2.5 md:py-3 backdrop-blur-[4px] overflow-hidden"
                  style={{
                    borderRadius: "32px",
                    background: "rgba(255, 255, 255, 0.06)",
                    position: "relative"
                  }}
                >
                  <div
                    style={{
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      borderRadius: "32px",
                      padding: "1px",
                      background: "linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0))",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      pointerEvents: "none"
                    }}
                  />
                  <span className="relative z-10 text-xs sm:text-sm md:text-base font-medium text-white line-clamp-1">
                    AI automatically pushes the latest events & information
                  </span>
                </div>

                <div
                  className="px-4 sm:px-6 md:px-10 py-2 sm:py-2.5 md:py-3 backdrop-blur-[4px] overflow-hidden"
                  style={{
                    borderRadius: "32px",
                    background: "rgba(255, 255, 255, 0.06)",
                    position: "relative"
                  }}
                >
                  <div
                    style={{
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      borderRadius: "32px",
                      padding: "1px",
                      background: "linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0))",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      pointerEvents: "none"
                    }}
                  />
                  <span className="relative z-10 text-xs sm:text-sm md:text-base font-medium text-white line-clamp-1">IFA Connect (Forums & Resources)</span>
                </div>

                <div
                  className="px-4 sm:px-6 md:px-10 py-2 sm:py-2.5 md:py-3 backdrop-blur-[4px] overflow-hidden"
                  style={{
                    borderRadius: "32px",
                    background: "rgba(255, 255, 255, 0.06)",
                    position: "relative"
                  }}
                >
                  <div
                    style={{
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      borderRadius: "32px",
                      padding: "1px",
                      background: "linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0))",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      pointerEvents: "none"
                    }}
                  />
                  <span className="relative z-10 text-xs sm:text-sm md:text-base font-medium text-white line-clamp-1">
                    Industry mentor guidance & student exchange group
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="px-[5.6%] mt-32 py-32">
            <div className="bg-muted rounded-3xl p-16 flex justify-between items-center">
              {/* Left Content */}
              <div className="max-w-[520px]">
                <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Support IFA to help cultivate future scientific and technological talents</h2>
                <div className="flex flex-col gap-2 text-gray-600">
                  <p>Every donation you make is a strength for the future!</p>
                  <p>Support us to benefit more students!</p>
                </div>
              </div>

              {/* Right Content */}
              <div className="max-w-[600px] pl-8">
                <p className="text-gray-600 text-sm mb-8">
                  Your support will directly impact the growth of young scientific and technological talents around the world, helping them to access quality
                  educational resources, innovation opportunities and international perspectives. Let us work together to promote science and technology
                  education and ignite the innovation dreams of the next generation!
                </p>
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2">
                  Donate now to change the future
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form Section with Footer */}
          <div className="relative">
            {/* Contact Form Section */}
            <div className="px-[5.6%] mt-32 py-12 flex items-start">
              <div className="w-[45%]">
                <h2 className="text-3xl font-bold py-24 pl-12 text-foreground">Happy to answer any questions you might have</h2>
              </div>

              <div className="w-[48%] ml-8 bg-background rounded-3xl p-12 relative z-10" style={{ boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.1)" }}>
                <form className="flex flex-col gap-8">
                  {/* Name fields row */}
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <label htmlFor="firstName" className="block text-foreground mb-2">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                        placeholder="First name"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="lastName" className="block text-foreground mb-2">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                      placeholder="Email Adress"
                    />
                  </div>

                  {/* Question field */}
                  <div>
                    <label htmlFor="question" className="block text-foreground mb-2">
                      Your Question
                    </label>
                    <textarea
                      id="question"
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary resize-none"
                      placeholder="Enter your text here"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="self-start px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2"
                  >
                    Send
                    <div className="w-6 h-6 bg-primary-foreground rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                        <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                </form>
              </div>
            </div>

            {/* Footer Section */}
            <div className="bg-[#25292C] mt-[-280px] pt-[320px] pb-16 px-[5.6%]">
              <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4">
                {/* Logo and Brand */}
                <div className="mb-8 md:mb-0">
                  <div className="flex items-center">
                    <img src="/assets/images/logo2.png" alt="INNOVATE FUTURE" className="w-10 h-10" />
                    <div className="flex flex-col ml-3">
                      <span className="font-bold text-base text-white">INNOVATE FUTURE</span>
                      <span className="text-white text-xs font-bold">ASSOCIATION</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="mb-8 md:mb-0">
                  <h3 className="text-white font-semibold mb-6">Your name</h3>
                  <ul className="flex flex-col gap-4">
                    {["Home", "Events", "Partners", "Membership", "About Us", "Contact Us"].map(item => (
                      <li key={item}>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Partner Links */}
                <div className="mb-8 md:mb-0">
                  <h3 className="text-white font-semibold mb-6">Partner Links</h3>
                  <ul className="flex flex-col gap-4">
                    {["Sunflower AI", "Bookwell AI", "Beequant.AI", "Jobpin AI"].map(item => (
                      <li key={item}>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Newsletter Subscription - adjusted width and styling */}
                <div className="max-w-full md:max-w-[480px]">
                  <h3 className="text-white font-semibold mb-6">Subscribe Newsletter</h3>
                  <p className="text-gray-400 mb-6">Subscribe to our newsletter to get updates about our services and offers.</p>
                  <div className="flex flex-col sm:flex-row bg-white rounded-lg p-1">
                    <input
                      type="email"
                      placeholder="input your email"
                      className="flex-1 px-6 py-2 bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none"
                    />
                    <button className="mt-2 sm:mt-0 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">Subscribe</button>
                  </div>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="mt-16 pt-8 border-t border-gray-800 text-center">
                <p className="text-gray-400 text-sm">© 2024 Innovative Future Association. All rights reserved.</p>
                <p className="text-gray-400 text-sm mt-2">Illustrations provided by Freepik.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
