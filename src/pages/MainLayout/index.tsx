import NavBar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);
export default MainLayout;
