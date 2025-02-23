import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import technologyIcon from "/assets/icons/Future science and technology education.svg";
import educationIcon from "/assets/icons/International Study Tours & Cultural Exploration.svg";
import mentorIcon from "/assets/icons/Industry mentor, exclusive growth community.svg";
import communityIcon from "/assets/icons/Exclusive Community & Network Expansion.svg";
import competitionIcon from "/assets/icons/AI Science & Technology Competition.svg";
import futureTechnology from "/assets/images/Future technology driven.jpg";
import internationalStudy from "/assets/images/InternationalStudyTours.jpg";
import industryMentor from "/assets/images/Industry Mentor & practical training.jpg";
import exclusiveCommunity from "/assets/images/Exclusive Community & Network Expansion.jpg";
import aiCompetition from "/assets/images/AI science and technology competition.jpg";

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
  features?: string[]; // 可选，因为不是所有tab都有features
  modules?: Module[]; // 可选，因为只有IFA SaaS有modules
  whyChooseIFA?: WhyChooseIFA; // 添加这个可选属性
}

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = React.useState<number | null>(null);

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
            icon: "/assets/icons/Student Portal.svg",
            title: "Student Portal",
            features: ["AI real-time translation", "Social learning journal", "Itinerary View & Task alerts", "Awards and certifications"]
          },
          {
            icon: "/assets/icons/Teacher Portal.svg",
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
            icon: "/assets/icons/Admin Portal.svg",
            title: "Admin Portal",
            features: ["Enterprise account management", "Study tour project management", "Student & Teacher management", "Data Analysis & Feedback"]
          },
          {
            icon: "/assets/icons/Parent Portal.svg",
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
      <div className="px-[5.6%] pb-40">
        <h2 className="text-3xl font-bold text-center mb-16">Our Core Programs – Learn, Innovate, Lead</h2>

        <div className="flex justify-center gap-56 mb-8">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="relative pb-4 group">
              <div className="flex items-center gap-2">
                {activeTab !== tab.id && <span className="text-gray-400 font-semibold">{tab.id}</span>}
                <span className={`${activeTab === tab.id ? "text-[#046FFB] font-semibold" : "text-[#1A1A1A] font-semibold hover:text-gray-600"}`}>
                  {tab.title}
                </span>
              </div>
              {activeTab === tab.id && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#046FFB] rounded-full" />}
            </button>
          ))}
        </div>

        {tabs.map(tab => (
          <div key={tab.id} className={`transition-all duration-300 ${activeTab === tab.id ? "block" : "hidden"}`}>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="bg-[#1A1A1A] rounded-3xl mx-[-24px] mt-[-24px] p-12 text-white mb-12">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-bold">{tab.id}</span>
                  <h3 className="text-2xl font-bold">{tab.title}</h3>
                </div>
                <p className="text-gray-300">{tab.content}</p>
              </div>

              {tab.id === "03" && tab.modules ? (
                <div className="flex flex-col gap-16">
                  <div className="grid grid-cols-4 gap-4">
                    {tab.modules.map((module, index) => (
                      <div key={index} className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                          <img src={module.icon} alt={module.title} className="w-10 h-10" />
                          <h4 className="text-lg font-semibold">{module.title}</h4>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl h-full">
                          <div className="flex items-center gap-2 px-4 pt-8 mb-8">
                            <img src="/assets/icons/feature.svg" alt="feature" className="w-5 h-5" />
                            <span className="text-sm font-medium">Core function</span>
                          </div>

                          <ul className="flex flex-col gap-6 px-4 pb-10">
                            {module.features.map((feature, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                <span className="text-gray-400">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-16">
                    <div className="w-[45%] pl-12">
                      <h3 className="text-[28px] font-bold mb-6 text-[#1A1A1A]">Why choose IFA SaaS?</h3>
                      <p className="text-gray-600 mb-8 leading-relaxed max-w-[360px]">
                        IFA SaaS makes overseas study tour management smarter and more convenient, creating an immersive and worry-free international learning
                        experience for every student!
                      </p>
                      <button className="px-6 py-3 bg-[#046FFB] text-white font-bold rounded-full hover:bg-[#0355CC] transition-colors flex items-center gap-2">
                        Explore Programs
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="#046FFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </button>
                    </div>

                    <div className="w-[50%] -mt-8">
                      <div className="grid grid-cols-1 gap-6">
                        <div className="bg-[#F8F9FB] rounded-2xl py-14 px-12 w-[480px] ml-[-10%]">
                          <h4 className="text-lg font-semibold mb-8">Intelligent & Data driven</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Combine AI translation, personalized recommendation, and intelligent itinerary management to provide a seamless study tour
                            experience.
                          </p>
                        </div>

                        <div className="bg-[#F8F9FB] rounded-2xl py-14 px-12 w-[480px] ml-[10%]">
                          <h4 className="text-lg font-semibold mb-6">High gold content certification</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            At the end of the tour, students will receive an official letter of recommendation and a certificate of completion to facilitate
                            their future study and career development.
                          </p>
                        </div>

                        <div className="bg-[#F8F9FB] rounded-2xl py-14 px-12 w-[480px] ml-[-72%] -mt-40">
                          <h4 className="text-lg font-semibold mb-6">One-stop management platform</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            All-round linkage between students, parents, teachers and enterprises simplifies information flow and reduces communication costs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="flex items-center gap-2 mb-10 font-semibold text-[#1A1A1A]">
                    <img src="/assets/icons/feature.svg" alt="feature" className="w-5 h-5" />
                    Feature
                  </h4>

                  <div className="grid grid-cols-3 gap-6">
                    {tab.features?.map((feature, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center text-sm text-gray-700">
                        {feature}
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
    <div className="w-full min-h-screen bg-[#E6F0FF]">
      <div className="w-full max-w-[1440px] min-h-screen mx-auto bg-white pb-40">
        <header className="flex items-center justify-between h-20 px-[5.6%]">
          <div className="flex items-center">
            <img src="https://placehold.co/40x40/0066FF/FFFFFF/png?text=IF" alt="logo" className="w-10 h-10 rounded-full" />
            <div className="flex flex-col font-['Helvetica'] ml-3">
              <span className="font-bold text-base text-[#046ffb]">INNOVATE FUTURE</span>
              <span className="text-[#046ffb] text-xs font-bold">ASSOCIATION</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 translate-x-40">
            {["Home", "Events", "Partners", "Membership", "About Us", "Contact Us"].map(item => (
              <div key={item} className="relative group">
                <div className="text-base font-['Helvetica'] font-bold text-[#1A1A1A] cursor-pointer hover:text-[#0066FF] transition-colors">{item}</div>
                <div className="absolute -bottom-2 left-1/2 w-4 h-1 bg-[#0066FF] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center -translate-x-1/2" />
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/auth")}
            className="px-4 py-2 rounded-full border border-[#E5E5E5] text-sm font-medium text-[#1A1A1A] hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-colors"
          >
            Sign In
          </button>
        </header>

        <div className="px-[5.6%] pt-20">
          <div className="flex justify-between items-start gap-14 mb-16">
            <div className="w-[55%]">
              <h1 className="font-['BigJohn'] text-[#25292C]">
                <div className="block text-[2.5rem] leading-[1.4] tracking-normal">
                  INNOVATE, EXPLORE,
                  <br />
                  GROWEMPOWERING FUTURE
                  <br />
                  GLOBAL INNOVATORS
                </div>
              </h1>
            </div>

            {/* Right content */}
            <div className="w-[45%] pt-8 pl-20">
              <p className="font-['Helvetica'] text-[#676B6F] text-base mb-8">
                Unlock international learning experiences through AI-driven education, global study tours, and mentorship.
              </p>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-[#046FFB] text-white font-bold rounded-full hover:bg-[#0355CC] transition-colors flex items-center gap-2">
                  Join a Program
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="#046FFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
                <button className="px-6 py-3 border border-[#1A1A1A] font-bold rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2">
                  Explore Events
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Image and cards section with overlap */}
          <div className="relative">
            {/* Image container */}
            <div className="relative w-full mb-16">
              <img src="/assets/images/BG1.jpg" alt="Background" className="w-full h-[40rem] object-cover rounded-2xl" />

              {/* Floating labels */}
              <div className="absolute left-[4.5%] top-[16.4%] bg-white/20 backdrop-blur-[2px] px-10 py-3 rounded-[32px]">
                <span className="text-base font-medium text-white whitespace-normal">
                  Letter of recommendation
                  <br />
                  of famous universities
                </span>
              </div>

              <div className="absolute left-[44%] top-[9%] bg-white/20 backdrop-blur-[2px] px-10 py-3 rounded-[32px]">
                <span className="text-base font-medium text-white">
                  AI Science and
                  <br />
                  technology experience
                </span>
              </div>

              <div className="absolute left-[5%] top-[44%] bg-white/20 backdrop-blur-[2px] px-10 py-3 rounded-[32px]">
                <span className="text-base font-medium text-white">Study tour projects</span>
              </div>

              <div className="absolute left-[81%] top-[25%] bg-white/20 backdrop-blur-[2px] px-10 py-3 rounded-[32px]">
                <span className="text-base font-medium text-white">
                  Practical training of
                  <br />
                  famous enterprises
                </span>
              </div>

              <div className="absolute left-[70%] top-[50%] bg-white/20 backdrop-blur-[2px] px-6 py-3 rounded-[32px]">
                <span className="text-base font-medium text-white">Overseas career planning</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expand Your Horizons with IFA */}
        <div className="px-[5.6%] pt-48 pb-32">
          <h2 className="text-3xl font-bold text-center mb-16">Expand Your Horizons with IFA</h2>

          <div className="flex justify-center gap-4 h-[360px] mb-12">
            {[
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
            ].map((card, index) => (
              <div
                key={index}
                onClick={() => setActiveCard(index === activeCard ? null : index)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer ${
                  index === activeCard ? "flex-[2.2] transition-[flex] duration-700 ease-in-out" : "w-[200px] flex-shrink-0 bg-[#F8F9FB]"
                }`}
                style={{
                  backgroundImage: index === activeCard ? `url(${card.image})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                {/* inactive state */}
                <div className={`absolute inset-0 flex flex-col ${index === activeCard ? "opacity-0 invisible" : "opacity-100"}`}>
                  {/* icon container */}
                  <div className="h-[220px] flex items-center justify-center">
                    <div className="w-32 h-32 flex items-center justify-center">
                      <img src={card.icon} alt={card.title} className="w-16 h-16" />
                    </div>
                  </div>

                  {/* title section */}
                  <div className="px-8">
                    <h3 className="text-[#1A1A1A] text-lg font-semibold text-center font-['Helvetica'] leading-tight whitespace-normal break-words">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* active state */}
                <div className={`absolute inset-0 flex flex-col ${index === activeCard ? "opacity-100" : "opacity-0 invisible"}`}>
                  {/* add blur*/}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* active state title section */}
                    <div className="pt-14 pl-10 pr-10">
                      <div className="flex items-start gap-3">
                        {/* icon wrapper */}
                        <div className="flex-shrink-0 relative" style={{ width: "48px", height: "48px" }}>
                          <div className="absolute inset-0 rounded-full bg-white" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img src={card.icon} alt={card.title} className="w-8 h-8" />
                          </div>
                        </div>

                        <h3 className="text-white text-xl font-semibold font-['Helvetica'] pt-2 max-w-[calc(100%-80px)] break-words">{card.title}</h3>
                      </div>
                    </div>

                    {/* content list section */}
                    <div className="flex-1 pl-8 pr-6 flex items-center -mt-4">
                      <div className="flex flex-col gap-4 w-full">
                        {card.content.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <img src="/assets/icons/plus.svg" alt="plus" className="w-3.5 h-3.5 flex-shrink-0 mt-[0.1rem]" />
                            <span className="text-white/90 text-sm font-['Helvetica'] leading-5 flex-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Start Your Journey Button */}
          <div className="flex justify-center mt-16 mb-40">
            <button className="px-6 py-3 bg-[#046FFB] text-white font-bold rounded-full hover:bg-[#0355CC] transition-colors flex items-center gap-2">
              Start Your Journey
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L9 3M9 3H4M9 3V8" stroke="#046FFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Core Programs Section */}
        <CorePrograms />

        {/* Trusted by Global Leaders in Education & Tech */}
        <div className="px-[5.6%] py-32 bg-white">
          <h2 className="text-3xl font-bold text-center mb-16">Trusted by Global Leaders in Education & Tech</h2>

          <div className="flex flex-col gap-16">
            {/* first row */}
            <div className="flex justify-center items-center gap-20">
              <img src="/assets/images/aws.jpg" alt="AWS" className="h-16 object-contain" />
              <img src="/assets/images/google.jpg" alt="Google" className="h-16 object-contain" />
              <img src="/assets/images/Microsoft.jpg" alt="Microsoft" className="h-16 object-contain" />
              <img src="/assets/images/Tesla.jpg" alt="Tesla" className="h-16 object-contain" />
              <img src="/assets/images/openai.jpg" alt="OpenAI" className="h-16 object-contain" />
            </div>

            {/* second row */}
            <div className="flex justify-center items-center gap-20">
              <img src="/assets/images/jobpin.png" alt="JobPin" className="h-16 object-contain" />
              <img src="/assets/images/JrAcademy.png" alt="JR Academy" className="h-16 object-contain" />
              <img src="/assets/images/MIT.jpg" alt="MIT" className="h-16 object-contain" />
              <img src="/assets/images/Stanford.jpg" alt="Stanford" className="h-16 object-contain" />
              <img src="/assets/images/Harvard.png" alt="Harvard" className="h-16 object-contain" />
            </div>

            {/* third row */}
            <div className="flex justify-center items-center gap-20">
              <img src="/assets/images/USyd.png" alt="University of Sydney" className="h-16 object-contain" />
              <img src="/assets/images/UQ.png" alt="University of Queensland" className="h-16 object-contain" />
              <img src="/assets/images/RMIT.jpg" alt="RMIT" className="h-16 object-contain" />
              <img src="/assets/images/Y.jpg" alt="Y Combinator" className="h-16 object-contain" />
              <img src="/assets/images/awsStartup.jpg" alt="AWS Startups" className="h-16 object-contain" />
            </div>
          </div>

          {/* Become a Partner Button */}
          <div className="flex justify-center mt-16">
            <button className="px-6 py-3 bg-[#046FFB] text-white font-bold rounded-full hover:bg-[#0355CC] transition-colors flex items-center gap-2">
              Become a Partner
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L9 3M9 3H4M9 3V8" stroke="#046FFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Membership Section */}
        <div className="px-[5.6%] py-32">
          <h2 className="text-3xl font-bold text-center mb-16">Unlock Your Potential with IFA Membership</h2>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-4 gap-6 mb-16">
            {/* General AI Professional Development */}
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                  <img src="/assets/images/1.jpg" alt="General AI Professional Development" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold mb-3">General AI Professional Development</h3>
              </div>
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#046FFB] transition-colors font-semibold group">
                Read More
                <div className="w-6 h-6 bg-[#F2F4F7] rounded-full flex items-center justify-center group-hover:bg-[#046FFB]/10">
                  <img src="/assets/icons/arrow.svg" alt="arrow" className="w-2 h-2 group-hover:brightness-0 group-hover:invert" />
                </div>
              </button>
            </div>

            {/* Quantum Computing Seminar */}
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                  <img src="/assets/images/2.jpg" alt="Quantum Computing Seminar" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Quantum Computing Seminar</h3>
              </div>
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#046FFB] transition-colors font-semibold group">
                Read More
                <div className="w-6 h-6 bg-[#F2F4F7] rounded-full flex items-center justify-center group-hover:bg-[#046FFB]/10">
                  <img src="/assets/icons/arrow.svg" alt="arrow" className="w-2 h-2 group-hover:brightness-0 group-hover:invert" />
                </div>
              </button>
            </div>

            {/* AI in AWS */}
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                  <img src="/assets/images/3.jpg" alt="AI in AWS" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold mb-3">AI in AWS</h3>
              </div>
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#046FFB] transition-colors font-semibold group">
                Read More
                <div className="w-6 h-6 bg-[#F2F4F7] rounded-full flex items-center justify-center group-hover:bg-[#046FFB]/10">
                  <img src="/assets/icons/arrow.svg" alt="arrow" className="w-2 h-2 group-hover:brightness-0 group-hover:invert" />
                </div>
              </button>
            </div>

            {/* Past Events for Shanghai */}
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                  <img src="/assets/images/4.jpg" alt="Past Events for Shanghai" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Past Events for Shanghai</h3>
              </div>
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#046FFB] transition-colors font-semibold group">
                Read More
                <div className="w-6 h-6 bg-[#F2F4F7] rounded-full flex items-center justify-center group-hover:bg-[#046FFB]/10">
                  <img src="/assets/icons/arrow.svg" alt="arrow" className="w-2 h-2 group-hover:brightness-0 group-hover:invert" />
                </div>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-6">
            <button className="px-6 py-3 bg-[#046FFB] text-white font-bold rounded-full hover:bg-[#0355CC] transition-colors flex items-center gap-2">
              Register Now
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L9 3M9 3H4M9 3V8" stroke="#046FFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
            <button className="px-6 py-3 border border-[#1A1A1A] text-[#1A1A1A] font-bold rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2">
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
            <div className="relative bg-[#F8F9FB] rounded-2xl p-12 flex flex-col items-center">
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
            <div className="relative bg-[#F8F9FB] rounded-2xl p-12 flex flex-col items-center">
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
            <div className="relative bg-[#F8F9FB] rounded-2xl p-12 flex flex-col items-center">
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
          <div className="flex justify-center mt-24 mb-24">
            <button className="px-6 py-3 bg-[#046FFB] text-white font-bold rounded-full hover:bg-[#0355CC] transition-colors flex items-center gap-2">
              Upgrade Now
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L9 3M9 3H4M9 3V8" stroke="#046FFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Community Section */}
        <div className="px-[5.6%]">
          <div className="relative bg-[#F8F9FB] rounded-3xl overflow-hidden">
            {/* image container */}
            <div className="relative w-full h-[600px]">
              <img src="/assets/images/test.jpg" alt="IFA Community" className="w-full h-full object-cover" />
            </div>

            {/* top right content */}
            <div className="absolute top-12 right-12 max-w-[580px]">
              <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6">Join the IFA community and expand the possibilities</h2>
              <p className="text-gray-600 text-lg mb-8">
                Whether you are a future engineer, technology entrepreneur, or an explorer with a passion for innovation, IFA welcomes you to join us! Here, you
                can meet like-minded partners, get mentors, master cutting-edge technology, and start a new journey of professional growth!
              </p>
              <button className="px-6 py-3 bg-[#046FFB] text-white font-bold rounded-full hover:bg-[#0355CC] transition-colors flex items-center gap-2">
                Join the Community
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="#046FFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>

            {/* bottom left tag list */}
            <div className="absolute bottom-12 left-12 flex flex-col gap-4">
              <div className="bg-white/20 backdrop-blur-[2px] px-6 py-3 rounded-full w-fit">
                <span className="text-white font-medium">AI automatically pushes the latest events & information</span>
              </div>
              <div className="bg-white/20 backdrop-blur-[2px] px-6 py-3 rounded-full w-fit">
                <span className="text-white font-medium">IFA Connect (Forums & Resources)</span>
              </div>
              <div className="bg-white/20 backdrop-blur-[2px] px-6 py-3 rounded-full w-fit">
                <span className="text-white font-medium">Industry mentor guidance & student exchange group</span>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="px-[5.6%] mt-32 py-32">
          <div className="bg-[#F8F9FB] rounded-3xl p-16 flex justify-between items-center">
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
                educational resources, innovation opportunities and international perspectives. Let us work together to promote science and technology education
                and ignite the innovation dreams of the next generation!
              </p>
              <button className="px-6 py-3 bg-[#046FFB] text-white text-sm font-bold rounded-full hover:bg-[#0355CC] transition-colors flex items-center gap-2">
                Donate now to change the future
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="#046FFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
