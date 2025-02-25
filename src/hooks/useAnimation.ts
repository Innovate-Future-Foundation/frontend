import { useLocation } from "react-router-dom";
import { Target } from "framer-motion";

export const animationConfig: Record<string, { initial: Target; animate: Target; exit?: Target; transition: object }> = {
  register: {
    initial: { y: 200, opacity: 0 },
    animate: { opacity: 1, y: 0 },
    // exit: { opacity: 0 },
    transition: { duration: 0.6, ease: [0, 0.71, 0.2, 1.01] }
  },
  auth: {
    initial: { x: 200, opacity: 0 },
    animate: { opacity: 1, x: 0 },
    // exit: { opacity: 0 },
    transition: { duration: 0.6, ease: [0, 0.71, 0.2, 1.01] }
  },
  "forgot-Password": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    // exit: { opacity: 0 },
    transition: { duration: 0.6, ease: [0, 0.71, 0.2, 1.01] }
  }
};

const useAnimation = () => {
  const location = useLocation();
  const currentPage = location.pathname.split("/").at(-1) || "auth";
  console.log("currentPage", currentPage);

  const currentAnimation = animationConfig[currentPage] || animationConfig.auth;

  return { currentPage, currentAnimation, key: location.pathname };
};

export default useAnimation;
