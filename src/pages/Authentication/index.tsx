import useAnimation from "@/hooks/useAnimation";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import BlurBadge from "./BlurBadge";

const badgeList = [
  "Study tour projects",
  "Letter of recommendation of famous universities",
  "Practical training for famous enterprises",
  "Overseas career planning",
  "AI Science and technology experience"
];

const AuthenticationPage = () => {
  const { key, currentPage, currentAnimation } = useAnimation();

  return (
    <div className="flex h-screen overflow-hidden py-10 px-20">
      <motion.div
        key="blue-section"
        initial={{ x: "-100%" }}
        animate={{ x: currentPage === "register" ? "110%" : "0" }}
        transition={{ duration: 0.6, ease: [0, 0.71, 0.2, 1.01] }}
        className="bg-gray-900 fixed hidden lg:flex rounded-IF32px w-[calc(50vw-5rem-2rem)] h-[calc(100vh-5rem)] min-h-[640px] flex-col justify-end"
        style={{
          maskImage: `url(${currentPage === "register" ? "/assets/images/maskRegister.png" : "/assets/images/mask.png"})`,
          maskRepeat: `no-repeat`,
          maskSize: `100% 100%`,
          maskPosition: "center",
          WebkitMaskImage: `url(${currentPage === "register" ? "/assets/images/maskRegister.png" : "/assets/images/mask.png"})`,
          WebkitMaskRepeat: `no-repeat`,
          WebkitMaskSize: `100% 100%`,
          WebkitMaskPosition: "center"
        }}
      >
        <div className="flex flex-col gap-10 items-start w-full px-[3rem] pb-[6rem] text-primary-foreground z-10 font-bold text-3xl">
          <div className="motion-preset-focus motion-duration-2000">
            <h1>Innovate, Explore, GrowEmpowering</h1>
            <h1>Future Global Innovators</h1>
          </div>
          <div className=" w-full flex flex-wrap gap-2 text-primary-foreground z-10 font-normal text-sm">
            {badgeList.map((badge, index) => (
              <BlurBadge key={index}>{badge}</BlurBadge>
            ))}
          </div>
        </div>
        <img
          src="/assets/images/ifa_auth@1x.webp"
          srcSet="/assets/images/ifa_auth@2x.webp 2x"
          alt="ifa_auth.webp"
          className="w-full h-full object-cover absolute z-0 gradient-mask-b-[transparent,rgba(0,0,0,1.0)_0px,rgba(0,0,0,0.5)_95%]"
        />
      </motion.div>
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={currentAnimation.initial}
            animate={currentAnimation.animate}
            exit={currentAnimation.exit}
            transition={currentAnimation.transition}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthenticationPage;
