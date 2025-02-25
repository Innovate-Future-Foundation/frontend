import useAnimation from "@/hooks/useAnimation";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router-dom";

const AuthenticationPage = () => {
  const { key, currentPage, currentAnimation } = useAnimation();

  return (
    <div className="flex h-screen overflow-hidden py-10 px-20">
      <motion.div
        key="blue-section"
        initial={{ x: "-100%" }}
        animate={{ x: currentPage === "register" ? "110%" : "0" }}
        transition={{ duration: 0.6, ease: [0, 0.71, 0.2, 1.01] }}
        className="fixed hidden lg:flex rounded-IF32px w-[calc(50vw-5rem-2rem)] h-[calc(100vh-5rem)] min-h-[640px] flex-col"
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
        <img src="/assets/images/ifa@3x.webp" alt="ifa@3x.webp" className="w-full h-full object-cover" />
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
