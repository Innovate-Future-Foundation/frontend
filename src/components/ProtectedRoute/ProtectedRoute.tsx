import { useAuthStore } from "@/store";
import { Navigate } from "react-router-dom";
// import { RoleType } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  // allowedRoles?: RoleType[];
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    console.log("isAuthenticated", isAuthenticated);
    return <Navigate to="/" replace />;
  }
  // if (role && !allowedRoles?.includes(role)) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
