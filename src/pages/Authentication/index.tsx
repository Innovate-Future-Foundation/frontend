import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const AuthenticationPage = () => {
  const { pathname } = useLocation();
  const param = pathname.split("/").at(-1);
  console.log("location", location);

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      <motion.div
        key="blue-section"
        initial={{ x: "-100%" }}
        animate={{ x: param === "register" ? "190%" : "0" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.1] }}
        className="hidden lg:flex fixed w-[35%] h-full flex-col bg-primary p-12 pt-16 text-white z-10"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="mb-24">
          <h1 className="text-2xl font-bold">Company Name</h1>
        </motion.div>

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
          </motion.p>
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
