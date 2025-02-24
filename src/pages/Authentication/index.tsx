import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const AuthenticationPage = () => {
  const { pathname } = useLocation();
  const param = pathname.split("/").at(-1);
  console.log("location", location);

  return (
    <div className="flex h-screen overflow-hidden py-10 px-20">
      <motion.div
        key="blue-section"
        initial={{ x: "-100%" }}
        animate={{ x: param === "register" ? "190%" : "0" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.1] }}
        className="fixed hidden lg:flex rounded-IF32px w-[calc(50vw-5rem-2rem)] h-[calc(100vh-5rem)] flex-col text-white"
        style={{ maskImage: `url('/assets/images/mask.png')`, maskRepeat: `no-repeat`, maskSize: `100% 100%` }}
      >
        <img src="/assets/images/sample.png" alt="sample" className="min-w-[500px]" />
        {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="mb-24">
          <h1 className="text-2xl font-bold">Company Name</h1>
        </motion.div> */}
        {/* <div className="absolute top-0 right-0">
          <SvgRightTopMask width={"50%"} height={"50%"} />
        </div>
        <div className="absolute bottom-0 left-0">
          <SvgLeftBottomMask width={"50%"} height={"50%"} />
        </div> */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {/* <motion.h2
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut"
                }
              }
            }}
            className="mb-8 text-5xl font-bold leading-[0.5]"
          >
            Let's setup your
          </motion.h2>

          <motion.h2
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut"
                }
              }
            }}
            className="mb-8 text-5xl font-bold leading-[0.5]"
          >
            Operating
          </motion.h2>

          <motion.h2
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut"
                }
              }
            }}
            className="mb-8 text-5xl font-bold leading-[0.5]"
          >
            Agreement
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }} className="text-base leading-relaxed">
            All-in-one solution to fix your business in the state. Form a new company from scratch or onboard your existing US company
          </motion.p> */}
        </motion.div>
      </motion.div>
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
