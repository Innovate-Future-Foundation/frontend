import { ReactNode } from "react";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

const MainLayout: React.FC<{ children: ReactNode; needFooter?: boolean }> = ({ children, needFooter = true }) => (
  <div className="flex flex-col h-screen">
    <Header />
    <div className="py-12">{children}</div>
    {needFooter && <Footer />}
  </div>
);
export default MainLayout;
