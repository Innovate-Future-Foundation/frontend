import { ReactNode } from "react";

import Header from "@/components/Header";
interface Props {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => (
  <div className="flex flex-col h-screen">
    <Header />
    <div className="py-12">{children}</div>
  </div>
);
export default MainLayout;
