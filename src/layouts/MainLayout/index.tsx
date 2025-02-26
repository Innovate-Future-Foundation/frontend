import { ReactNode } from "react";

import Header from "@/components/Header";
import { useLocation } from "react-router-dom";
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col h-screen">
      <Header fromHome={!pathname.includes("dashboard")} />
      <div className="py-12">{children}</div>
    </div>
  );
};
export default MainLayout;
