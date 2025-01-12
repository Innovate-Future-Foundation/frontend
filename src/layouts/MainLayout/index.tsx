import { ReactNode } from "react";

import Header from "@/components/Header";
interface Props {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => (
  <div className="h-screen">
    <Header />
    <div className="mt-14 ">{children}</div>
  </div>
);
export default MainLayout;
