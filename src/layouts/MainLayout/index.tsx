import { ReactNode } from "react";

import Header from "@/components/Header";

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-col h-screen">
    <Header />
    <div className="py-12">{children}</div>
  </div>
);
export default MainLayout;
